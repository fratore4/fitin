'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Open_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';

const openSans = Open_Sans({ subsets: ['latin'], weight: ['700', '400'] });

export default function Home() {
  const router = useRouter();

  // Mappa delle categorie con i relativi percorsi delle immagini
  const categorie = [
    { nome: 'Divani', immagine: 'https://cnwxrhkmudkvhzppmquu.supabase.co/storage/v1/object/public/images.for.the.website//category-divani.jpg' },
    { nome: 'Tavoli', immagine: 'https://cnwxrhkmudkvhzppmquu.supabase.co/storage/v1/object/public/images.for.the.website//category-tavoli.jpg' },
    { nome: 'Armadi', immagine: 'https://cnwxrhkmudkvhzppmquu.supabase.co/storage/v1/object/public/images.for.the.website//category-armadi.jpg' },
    { nome: 'Letti', immagine: 'https://cnwxrhkmudkvhzppmquu.supabase.co/storage/v1/object/public/images.for.the.website//category-letti.jpg' },
    { nome: 'Scrivanie', immagine: 'https://cnwxrhkmudkvhzppmquu.supabase.co/storage/v1/object/public/images.for.the.website//category-scrivanie.jpg' },
    { nome: 'Cassettiere', immagine: 'https://cnwxrhkmudkvhzppmquu.supabase.co/storage/v1/object/public/images.for.the.website//category-cassettiere.jpg' },
    { nome: 'Librerie', immagine: 'https://cnwxrhkmudkvhzppmquu.supabase.co/storage/v1/object/public/images.for.the.website//Screenshot%202025-05-05%20alle%2017.08.11.png' }, // Immagine non disponibile
    { nome: 'Sedie', immagine: 'https://cnwxrhkmudkvhzppmquu.supabase.co/storage/v1/object/public/images.for.the.website//Screenshot%202025-04-26%20alle%2015.37.35.png' },    // Immagine non disponibile
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Sezione hero con immagine di sfondo */}
      <section 
        className="w-full text-center py-20 mb-16 relative rounded-lg overflow-hidden"
        style={{
          backgroundImage: "url(https://cnwxrhkmudkvhzppmquu.supabase.co/storage/v1/object/public/images.for.the.website//homesito.jpeg)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '350px'
        }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-20"></div>
        <div className="relative z-10">
          <h1 className={`text-4xl font-bold mb-4 ${openSans.className}`} style={{color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.35)'}}>I mobili a misura di casa tua</h1>
          <p className={`text-xl max-w-2xl mx-auto ${openSans.className}`} style={{color: '#f5f3ef', textShadow: '0 1px 6px rgba(0,0,0,0.25)'}}>
            Trova l'arredamento ideale per te fra le proposte di migliaia di artigani
          </p>
        </div>
      </section>

      <section className="w-full max-w-4xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="elegant-card p-8" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(6px)'}}>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Trova il tuo arredo</h2>
            <p className="mb-6 text-darkgray">inserisci le misure desiderate e trova i mobili che vi si adattano perfettamante.</p>
            <Link href="/ricerca" className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-accent transition-colors">
              Inizia la ricerca
            </Link>
          </div>
          <div className="elegant-card p-8" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(6px)'}}>
            <h2 className="text-2xl font-semibold mb-4 text-primary">IL MIO MOODBOARD</h2>
            <p className="mb-6 text-darkgray">Rivedi i tuoi pezzi d'arredamento preferiti e ridai vita ai tuoi spazi.</p>
            <Link href="/preferiti" className="inline-block bg-secondary text-darkgray px-6 py-3 rounded-md hover:bg-sand transition-colors">
              Vai ai preferiti
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-semibold mb-8 text-center text-primary">Categorie Popolari</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categorie.map((categoria) => (
            <div
              key={categoria.nome}
              className="elegant-card text-center cursor-pointer overflow-hidden relative group"
              onClick={() => router.push(`/ricerca?categoria=${encodeURIComponent(categoria.nome)}`)}
            >
              {categoria.immagine ? (
                <div className="relative w-full h-32 md:h-40">
                  <Image 
                    src={categoria.immagine} 
                    alt={`Categoria ${categoria.nome}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <span className="text-white text-lg md:text-xl font-semibold drop-shadow-lg">{categoria.nome}</span>
                  </div>
                </div>
              ) : (
                <div className="h-32 md:h-40 bg-lightgray flex items-center justify-center">
                  <span className="text-darkgray">Immagine non disponibile</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sezione Richiedi una consulenza */}
      <section className="w-full max-w-4xl mb-16">
        <div className="elegant-card overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Contenuto testuale */}
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Richiedi una consulenza</h2>
              <p className="mb-6 text-darkgray">
                Non sei sicuro di quale mobile sia adatto al tuo spazio? I nostri esperti di design possono aiutarti a trovare la soluzione perfetta per le tue esigenze.
              </p>
              <ul className="mb-6 text-darkgray space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Consulenza personalizzata con esperti del settore</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Suggerimenti su misura per il tuo budget</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Soluzioni creative per spazi difficili</span>
                </li>
              </ul>
              <Link href="/consulenza" className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-accent transition-colors self-start">
                Richiedi ora
              </Link>
            </div>
            
            {/* Immagine */}
            <div className="relative p-8 flex items-center justify-center">
              <div className="relative w-full max-w-xs mx-auto h-[240px]">
                <Image 
                  src="https://cnwxrhkmudkvhzppmquu.supabase.co/storage/v1/object/public/images.for.the.website//consulenza.jpeg" 
                  alt="Consulenza personalizzata"
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 