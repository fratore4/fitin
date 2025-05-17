"use client";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    eta: "",
    citta: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // 1. Crea utente su Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    });
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }
    // 2. Salva dati aggiuntivi su user_profiles
    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert({
          id: userId,
          full_name: form.nome + " " + form.cognome,
          eta: form.eta,
          citta: form.citta
        });
      if (profileError) {
        setError("Registrazione utente riuscita, ma errore nel salvataggio del profilo: " + profileError.message);
        setLoading(false);
        return;
      }
    }
    setLoading(false);
    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 elegant-card">
      <h1 className="text-2xl font-bold mb-6 text-primary">Crea un nuovo account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="cognome"
          placeholder="Cognome"
          value={form.cognome}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="eta"
          placeholder="Età"
          value={form.eta}
          onChange={handleChange}
          required
          min={0}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="citta"
          placeholder="Città di residenza"
          value={form.citta}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="button-elegant mt-2"
          disabled={loading}
        >
          {loading ? "Registrazione in corso..." : "Registrati"}
        </button>
      </form>
      <p className="mt-4 text-sm">
        Hai già un account? <a href="/login" className="text-primary underline">Accedi</a>
      </p>
    </div>
  );
} 