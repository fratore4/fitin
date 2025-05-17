"use client";
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../lib/supabase';
import { useUser } from '../../context/UserContext';

export default function PreferitiPage() {
  const { user } = useUser();
  const [preferiti, setPreferiti] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchPreferiti = async () => {
      setLoading(true);
      // Prendo tutti i mobili preferiti dell'utente loggato
      const { data, error } = await supabase
        .from('favorites')
        .select('furniture: furniture_id ( *, store:stores(*), category:furniture_categories(*), materials:furniture_materials(materials(*)), colors:furniture_colors(colors(*)) )')
        .eq('user_id', user.id);
      if (!error && data) {
        // Estraggo solo i mobili
        setPreferiti(data.map((fav: any) => fav.furniture));
      }
      setLoading(false);
    };
    fetchPreferiti();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto mt-16 p-8 elegant-card text-center">
        <h1 className="text-2xl font-bold mb-4 text-primary">I tuoi Preferiti</h1>
        <p className="mb-4">Per vedere i tuoi preferiti devi prima <Link href="/login" className="text-primary underline">accedere</Link> al tuo account.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">I tuoi Preferiti</h1>
      {loading ? (
        <p>Caricamento...</p>
      ) : preferiti.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
          <p className="text-gray-600 mb-4">Non hai ancora salvato nessun mobile nei preferiti.</p>
          <Link href="/ricerca" className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Inizia a cercare
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preferiti.map((item) => (
            <div key={item.id} className="elegant-card p-4">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={item.image_url || '/images/placeholder.jpg'}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-primary">{item.name}</h3>
                <div className="text-sm text-darkgray">
                  <p>Dimensioni:</p>
                  <ul className="list-disc list-inside">
                    <li>Larghezza: {item.width ?? 'N/D'} cm</li>
                    <li>Altezza: {item.height ?? 'N/D'} cm</li>
                    <li>Profondità: {item.depth ?? 'N/D'} cm</li>
                  </ul>
                </div>
                <p className="font-medium">€{item.price}</p>
                <p className="text-sm text-darkgray">Negozio: {item.store?.name}</p>
                <p className={`text-sm ${item.availability_status === 'Disponibile' ? 'text-green-600' : 'text-orange-600'}`}>{item.availability_status}</p>
                {item.materials && item.materials.length > 0 && (
                  <div className="text-sm">
                    <p className="font-medium">Materiali:</p>
                    <p>{item.materials.map((m: { name: string }) => m.name).join(', ')}</p>
                  </div>
                )}
                {item.colors && item.colors.length > 0 && (
                  <div className="text-sm">
                    <p className="font-medium">Colori:</p>
                    <div className="flex gap-1">
                      {item.colors.map((colore: { id: string; name: string }) => (
                        <span key={colore.id} className="px-2 py-1 bg-sand rounded-md text-xs">{colore.name}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center mt-4">
                  <a
                    href={item.product_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Vedi dettagli
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 