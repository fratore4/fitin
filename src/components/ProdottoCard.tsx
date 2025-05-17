import React from 'react';

interface Dimensioni {
  larghezza: number;
  altezza: number;
  profondita: number;
}

interface ProdottoProps {
  id: number;
  nome: string;
  descrizione: string;
  immagine: string;
  dimensioni: Dimensioni;
  prezzo: number;
  tipo: string;
  caratteristiche: string[];
}

export default function ProdottoCard({ 
  nome, 
  descrizione, 
  immagine, 
  dimensioni, 
  prezzo, 
  caratteristiche,
  tipo 
}: ProdottoProps) {
  // Mappa dei colori in base al tipo di prodotto
  const coloriProdotti: Record<string, string> = {
    divano: '#3b5998',    // Blu primario
    tavolo: '#436b43',    // Verde secondario
    sedia: '#8b4513',     // Marrone
    armadio: '#6a5acd',   // Viola chiaro
    letto: '#4682b4',     // Blu acciaio
    libreria: '#8b0000',  // Rosso scuro
    scrivania: '#2f4f4f', // Grigio ardesia
    cassettiera: '#556b2f' // Verde oliva
  };

  // Colore di default se il tipo non è presente nella mappa
  const colore = coloriProdotti[tipo] || '#cccccc';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid md:grid-cols-5 gap-0">
        {/* Colore al posto dell'immagine grande (occupa 3/5 dello spazio) */}
        <div className="md:col-span-3 relative h-80 md:h-96">
          <div 
            className="w-full h-full" 
            style={{ backgroundColor: colore }}
          ></div>
        </div>
        
        {/* Dettagli prodotto (occupa 2/5 dello spazio) */}
        <div className="md:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-3">{nome}</h3>
            <p className="text-gray-700 mb-4">{descrizione}</p>
            
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Caratteristiche uniche:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {caratteristiche.map((caratteristica, index) => (
                  <li key={index} className="text-gray-700">{caratteristica}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Dimensioni:</h4>
              <p className="text-gray-700">
                L: {dimensioni.larghezza} cm × A: {dimensioni.altezza} cm × P: {dimensioni.profondita} cm
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <span className="text-xl font-bold">€{prezzo.toLocaleString()}</span>
            <div className="space-x-2">
              <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                Dettagli
              </button>
              <button className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white transition-colors">
                Salva
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 