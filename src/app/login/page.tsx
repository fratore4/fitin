"use client";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 elegant-card">
      <h1 className="text-2xl font-bold mb-6 text-primary">Accedi al tuo account</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="button-elegant mt-2"
          disabled={loading}
        >
          {loading ? "Accesso in corso..." : "Accedi"}
        </button>
      </form>
      <p className="mt-4 text-sm">
        Non hai un account? <a href="/signup" className="text-primary underline">Registrati</a>
      </p>
    </div>
  );
} 