"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ResetPasswordPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);

    const form = new FormData(e.target);
    const password = form.get("password");

    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    setMsg("Password updated successfully!");
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-lg shadow max-w-sm w-full space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Create New Password</h1>

        {msg && <p className="text-green-600 text-sm">{msg}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          type="password"
          name="password"
          required
          placeholder="New Password"
          className="w-full p-2 border rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
