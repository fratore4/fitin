"use client";
import React from 'react';
import { UserProvider, useUser } from '../context/UserContext';
import { Inter, Playfair_Display } from 'next/font/google';
import '../app/globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700'] });
const inter = Inter({ subsets: ['latin'] });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  return (
    <UserProvider>
      <header className="navbar-elegant">
        <div className="container mx-auto px-4 py-4 flex items-center relative">
          <div className="absolute left-0 right-0 flex justify-center items-center pointer-events-none" style={{zIndex:2}}>
            <h1 className={`text-5xl font-bold text-primary ${playfair.className} select-none`} style={{letterSpacing: '2px'}}>
              FitIn
            </h1>
          </div>
          <div className="flex-1 flex justify-end items-center space-x-4" style={{zIndex:3}}>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="/" className="text-darkgray hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/preferiti" className="text-darkgray hover:text-primary transition-colors">
                    Preferiti
                  </a>
                </li>
                <li>
                  <a href="/ricerca" className="button-elegant flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Ricerca
                  </a>
                </li>
                {user ? (
                  <li>
                    <button onClick={async () => { await import('../lib/supabase').then(m => m.supabase.auth.signOut()); }} className="text-darkgray hover:text-primary transition-colors">Logout</button>
                  </li>
                ) : (
                  <>
                    <li>
                      <a href="/login" className="text-darkgray hover:text-primary transition-colors">Login</a>
                    </li>
                    <li>
                      <a href="/signup" className="text-darkgray hover:text-primary transition-colors">Registrati</a>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="footer-elegant mt-auto">
        <div className="container mx-auto px-4">
          <p className="text-center">
            © 2025 FitIn - Tutti i diritti riservati
          </p>
        </div>
      </footer>
    </UserProvider>
  );
} 