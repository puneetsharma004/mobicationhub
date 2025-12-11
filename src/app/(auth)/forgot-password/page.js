"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ForgotPasswordPage() {
  const supabase = createClientComponentClient();
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    const form = new FormData(e.target);
    const email = form.get("email");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setMsg("A reset link has been sent to your email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <form
        onSubmit={handleReset}
        className="bg-white p-6 rounded-lg shadow max-w-sm w-full space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Reset Password</h1>

        {msg && <p className="text-green-600 text-sm">{msg}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full p-2 border rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
