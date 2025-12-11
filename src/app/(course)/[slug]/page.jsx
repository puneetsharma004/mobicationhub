import { supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabase } from "@/lib/supabaseServer";

export default async function CoursePage({ params }) {
  // MUST await because cookies() is async in Next.js 16
  const supabase = await createServerSupabase();

  // 1. AUTH – fetch server user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user || null; // real authenticated user

  const { slug } = await params;

  // 2. Fetch course
  const { data: course } = await supabaseAdmin
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!course) return notFound();

  // 3. Fetch chapters
  const { data: chapters, error: chapErr } = await supabaseAdmin
    .from("chapters")
    .select("*")
    .eq("course_id", course.id)
    .order("position", { ascending: true });

  if (!chapters || chapErr) return notFound();

  // 4. Check enrollment
  let isEnrolled = false;
  let userId = null;

  if (user) {
    userId = user.id;

    const { data: enrolled } = await supabaseAdmin
      .from("user_enrollments")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", course.id)
      .maybeSingle();

    if (enrolled) isEnrolled = true;
  }

  const firstChapter = chapters[0];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>

        <p className="text-gray-600 mb-6">{course.description}</p>

        {/* Instructor */}
        {course.profiles && (
          <p className="text-gray-700 mb-4">
            <strong>Instructor:</strong> {course.profiles.full_name}
          </p>
        )}

        {/* Enroll / Continue */}
        <div className="my-6">
          {isEnrolled ? (
            <Link
              href={`/course/${slug}/learn/${firstChapter.id}`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg inline-flex"
            >
              Continue Learning →
            </Link>
          ) : user ? (
            // Logged in BUT not enrolled
            <form action={`/api/enroll`} method="POST">
              <input type="hidden" name="user_id" value={userId} />
              <input type="hidden" name="course_id" value={course.id} />
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg"
              >
                Enroll Now
              </button>
            </form>
          ) : (
            // User NOT logged in → redirect them to login
            <Link
              href="/auth/login"
              className="px-6 py-3 bg-green-600 text-white rounded-lg inline-flex"
            >
              Login to Enroll →
            </Link>
          )}
        </div>

        <hr className="my-6" />

        {/* Chapters */}
        <h2 className="text-2xl font-semibold mb-4">Course Content</h2>

        <div className="space-y-3">
          {chapters.map((ch) => (
            <div key={ch.id} className="border p-3 rounded-lg bg-gray-50">
              <p className="font-medium">
                {ch.position}. {ch.title}
              </p>

              {isEnrolled && (
                <Link
                  href={`/course/${slug}/learn/${ch.id}`}
                  className="text-blue-600 text-sm"
                >
                  Start Chapter →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
