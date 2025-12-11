import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "@/lib/supabase";
import { createServerSupabase } from "@/lib/supabaseServer";
export const revalidate = 10; // tune caching as needed

function formatDate(ts) {
  try {
    return new Date(ts).toLocaleDateString();
  } catch {
    return ts;
  }
}

/**
 * Helper: create a signed URL for a certificate file in the `certificates` bucket.
 * - If certificateUrl looks like a full http(s) URL -> return it as-is.
 * - Else, treat certificateUrl as a storage path and createSignedUrl via supabaseAdmin.
 */
async function resolveCertificateDownloadUrl(certificateUrl) {
  if (!certificateUrl) return null;

  // If it's already a fully-qualified URL, return as-is
  if (/^https?:\/\//i.test(certificateUrl)) {
    return certificateUrl;
  }

  // Otherwise assume it's a path inside the certificates bucket.
  // Example: "certificates/userid_courseid_12345.pdf" or "userid_courseid_12345.pdf"
  // If path includes a leading "certificates/" strip it so createSignedUrl path is correct.
  const bucketName = "certificates";
  let path = certificateUrl;
  if (path.startsWith(`${bucketName}/`)) path = path.slice(bucketName.length + 1);

  try {
    const expiresInSeconds = 60 * 5; // 5 minutes (short-lived download link)
    const { data, error } = await supabaseAdmin.storage
      .from(bucketName)
      .createSignedUrl(path, expiresInSeconds);

    if (error || !data?.signedURL) {
      console.error("createSignedUrl error:", error);
      // fallback: try to construct a public URL pattern (may or may not work based on policies)
      return certificateUrl;
    }
    return data.signedURL;
  } catch (err) {
    console.error("resolveCertificateDownloadUrl error:", err);
    return certificateUrl;
  }
}

export default async function CertificatesPage() {
  // 1) Get server-side session & user
  const supabase = createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return notFound();

  const userId = session.user.id;

  // 2) Fetch user's certificates + join course metadata (if present)
  // Assuming user_certificates has course_id that references courses.id
  const { data: certificates = [], error } = await supabaseAdmin
    .from("user_certificates")
    .select("id, course_id, certificate_url, certificate_uuid, issued_at, courses(id, title, slug)")
    .eq("user_id", userId)
    .order("issued_at", { ascending: false });

  if (error) {
    console.error("fetch user_certificates error:", error);
  }

  // 3) Resolve download URLs (all async) — pre-resolve before render
  const certificatesWithDownload = await Promise.all(
    (certificates || []).map(async (row) => {
      const downloadUrl = await resolveCertificateDownloadUrl(row.certificate_url);
      return {
        ...row,
        downloadUrl,
      };
    })
  );

  // 4) Render UI
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Certificates</h1>
            <p className="text-sm text-gray-500">Your course completion certificates and download links.</p>
          </div>
          <div>
            <Link
              href="/course"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
            >
              Browse Courses
            </Link>
          </div>
        </header>

        <section>
          {certificatesWithDownload.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-700 mb-3">You don’t have any certificates yet.</p>
              <p className="text-gray-500">Complete a course to earn a certificate.</p>
              <div className="mt-6">
                <Link href="/course" className="px-5 py-2 bg-blue-600 text-white rounded-md">
                  Browse Courses
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {certificatesWithDownload.map((c) => (
                <div key={c.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold truncate">
                        {c.courses?.title ?? "Untitled Course"}
                      </h3>
                      <span className="text-xs text-gray-500">• Issued {formatDate(c.issued_at)}</span>
                    </div>

                    <div className="mt-1 text-sm text-gray-600 truncate">
                      Verification ID: <span className="font-mono text-xs">{c.certificate_uuid}</span>
                    </div>

                    {c.courses?.slug ? (
                      <div className="mt-2">
                        <Link href={`/course/${c.courses.slug}`} className="text-sm text-blue-600 underline">
                          View Course
                        </Link>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-3">
                    {c.downloadUrl ? (
                      // target _blank to download in new tab; 'rel' for security
                      <a
                        href={c.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                      >
                        Download
                      </a>
                    ) : (
                      <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm" disabled>
                        Unavailable
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
