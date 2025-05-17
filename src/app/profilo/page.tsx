"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../lib/supabase";

export default function ProfiloPage() {
  const { user } = useUser();
  const [profilo, setProfilo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfilo = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("user_profiles")
        .select("full_name, eta, citta")
        .eq("id", user.id)
        .single();
      if (!error) setProfilo(data);
      setLoading(false);
    };
    fetchProfilo();
  }, [user]);

  if (!user) {
    return <div className="max-w-md mx-auto mt-16 p-8 elegant-card text-center">Devi essere loggato per vedere il tuo profilo.</div>;
  }

  if (loading) {
    return <div className="max-w-md mx-auto mt-16 p-8 elegant-card text-center">Caricamento...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 elegant-card">
      <h1 className="text-2xl font-bold mb-6 text-primary">Il tuo profilo</h1>
      <div className="mb-2"><b>Nome e Cognome:</b> {profilo?.full_name}</div>
      <div className="mb-2"><b>Email:</b> {user.email}</div>
      <div className="mb-2"><b>Età:</b> {profilo?.eta}</div>
      <div className="mb-2"><b>Città:</b> {profilo?.citta}</div>
    </div>
  );
} 