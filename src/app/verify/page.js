"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");

  const [state, setState] = useState({
    loading: true,
    valid: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    if (!uuid) {
      setState({
        loading: false,
        valid: false,
        data: null,
        error: "No certificate UUID provided.",
      });
      return;
    }

    async function verify() {
      try {
        const res = await fetch(`/api/verify?uuid=${uuid}`);
        const json = await res.json();

        if (!json.ok) {
          setState({
            loading: false,
            valid: false,
            data: null,
            error: json.error || "Invalid certificate.",
          });
        } else {
          setState({
            loading: false,
            valid: true,
            data: json.certificate,
            error: null,
          });
        }
      } catch (err) {
        setState({
          loading: false,
          valid: false,
          data: null,
          error: "Verification request failed.",
        });
      }
    }

    verify();
  }, [uuid]);

  const { loading, valid, data, error } = state;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-white shadow p-6 rounded-lg mt-10">
        <h1 className="text-3xl font-bold mb-4">Certificate Verification</h1>

        {loading && <p className="text-gray-600">Verifying certificate…</p>}

        {!loading && error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            <p className="font-semibold">Invalid Certificate</p>
            <p>{error}</p>
            <p className="mt-4 text-sm text-gray-600">
              Please check the certificate ID or contact support.
            </p>
          </div>
        )}

        {!loading && valid && (
          <div className="space-y-4">
            <div className="bg-green-100 text-green-800 p-4 rounded-md">
              <p className="font-semibold text-lg">Certificate Verified</p>
              <p>This certificate is valid and issued by our LMS system.</p>
            </div>

            <div className="border p-4 rounded-md">
              <p className="text-sm text-gray-600">Certificate ID</p>
              <p className="font-mono text-lg">{data.certificate_uuid}</p>

              <div className="mt-4">
                <p className="text-sm text-gray-600">Issued To</p>
                <p className="font-medium">{data.profiles?.full_name}</p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600">Course</p>
                <Link
                  href={`/course/${data.courses?.slug}`}
                  className="text-blue-600 underline"
                >
                  {data.courses?.title}
                </Link>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600">Issued On</p>
                <p className="font-medium">
                  {new Date(data.issued_at).toLocaleDateString()}
                </p>
              </div>

              {data.certificate_url && (
                <div className="mt-6">
                  <a
                    href={data.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Download Certificate
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
