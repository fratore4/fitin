'use client';

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Image from 'next/image';

export default function ConsulenzaPage() {
  const [form, setForm] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    tipo_ambiente: 'Soggiorno',
    messaggio: '',
    budget: '',
    orario_preferito: 'Qualsiasi orario',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Qui puoi implementare la logica per inviare i dati a Supabase o altro sistema
      // Per ora simuliamo un invio con successo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setForm({
        nome: '',
        cognome: '',
        email: '',
        telefono: '',
        tipo_ambiente: 'Soggiorno',
        messaggio: '',
        budget: '',
        orario_preferito: 'Qualsiasi orario',
      });
    } catch (err) {
      console.error(err);
      setError('Si è verificato un errore durante l\'invio della richiesta. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <h1 className="text-3xl font-bold mb-8 text-primary">Richiedi una consulenza personalizzata</h1>
      
      <div className="elegant-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Informazioni sulla consulenza */}
          <div className="p-8 bg-cream">
            <h2 className="text-2xl font-semibold mb-6 text-primary">Parla con i nostri esperti</h2>
            
            <p className="mb-6 text-darkgray">
              Sappiamo quanto può essere difficile trovare il mobile perfetto per il tuo spazio. 
              I nostri esperti di design sono pronti ad aiutarti con consigli personalizzati 
              in base alle tue esigenze specifiche.
            </p>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3 text-primary">Come funziona:</h3>
              <ol className="list-decimal list-inside space-y-2 text-darkgray">
                <li>Compila il modulo con i tuoi dati e le informazioni sul progetto</li>
                <li>Un nostro consulente ti contatterà entro 48 ore</li>
                <li>Ricevi consigli personalizzati sui mobili adatti al tuo spazio</li>
                <li>Trova le soluzioni perfette con il nostro supporto</li>
              </ol>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3 text-primary">Perché sceglierci:</h3>
              <ul className="space-y-2 text-darkgray">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Esperti qualificati nel design d'interni</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Consigli imparziali sui migliori prodotti</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Soluzioni su misura per ogni budget</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Servizio completamente gratuito</span>
                </li>
              </ul>
            </div>
            
            <div className="relative w-full h-40 rounded-md overflow-hidden">
              <Image 
                src="https://cnwxrhkmudkvhzppmquu.supabase.co/storage/v1/object/public/images.for.the.website//consulenza.jpeg" 
                alt="I nostri consulenti"
                fill
                className="object-contain rounded-xl"
              />
            </div>
          </div>
          
          {/* Form di richiesta */}
          <div className="p-8">
            {success ? (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2 text-primary">Richiesta inviata con successo!</h3>
                <p className="text-darkgray mb-6">
                  Grazie per averci contattato. Un nostro consulente ti risponderà entro 48 ore lavorative.
                </p>
                <button 
                  onClick={() => setSuccess(false)} 
                  className="button-elegant"
                >
                  Invia un'altra richiesta
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-primary">Compila il modulo</h2>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-darkgray mb-1">Nome*</label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-sand rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="cognome" className="block text-sm font-medium text-darkgray mb-1">Cognome*</label>
                      <input
                        type="text"
                        id="cognome"
                        name="cognome"
                        value={form.cognome}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-sand rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-darkgray mb-1">Email*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-sand rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-darkgray mb-1">Telefono</label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        className="w-full p-2 border border-sand rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="tipo_ambiente" className="block text-sm font-medium text-darkgray mb-1">Tipo di ambiente</label>
                      <select
                        id="tipo_ambiente"
                        name="tipo_ambiente"
                        value={form.tipo_ambiente}
                        onChange={handleChange}
                        className="w-full p-2 border border-sand rounded-md"
                      >
                        <option value="Soggiorno">Soggiorno</option>
                        <option value="Camera da letto">Camera da letto</option>
                        <option value="Cucina">Cucina</option>
                        <option value="Bagno">Bagno</option>
                        <option value="Studio">Studio/Ufficio</option>
                        <option value="Altro">Altro</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-darkgray mb-1">Budget indicativo (€)</label>
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        placeholder="Es. 500-1000"
                        className="w-full p-2 border border-sand rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="orario_preferito" className="block text-sm font-medium text-darkgray mb-1">Orario preferito per essere contattato</label>
                    <select
                      id="orario_preferito"
                      name="orario_preferito"
                      value={form.orario_preferito}
                      onChange={handleChange}
                      className="w-full p-2 border border-sand rounded-md"
                    >
                      <option value="Qualsiasi orario">Qualsiasi orario</option>
                      <option value="Mattina (9:00-12:00)">Mattina (9:00-12:00)</option>
                      <option value="Pranzo (12:00-14:00)">Pranzo (12:00-14:00)</option>
                      <option value="Pomeriggio (14:00-18:00)">Pomeriggio (14:00-18:00)</option>
                      <option value="Sera (18:00-20:00)">Sera (18:00-20:00)</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="messaggio" className="block text-sm font-medium text-darkgray mb-1">
                      Descrivi le tue esigenze*
                    </label>
                    <textarea
                      id="messaggio"
                      name="messaggio"
                      value={form.messaggio}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Descrivici il tuo progetto, le dimensioni dello spazio e cosa stai cercando..."
                      className="w-full p-2 border border-sand rounded-md"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 mr-2"
                      />
                      <span className="text-sm text-darkgray">
                        Acconsento al trattamento dei dati personali ai sensi del GDPR 2016/679 per ricevere una consulenza personalizzata*
                      </span>
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="button-elegant w-full"
                  >
                    {loading ? 'Invio in corso...' : 'Richiedi consulenza'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 