'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useFurniture } from '../../hooks/useFurniture';
import { FURNITURE_TYPES } from '../../hooks/useStaticValues';
import { useSearchParams } from 'next/navigation';

// Componente principale
export default function RicercaPage() {
  // Stati
  const [tipo, setTipo] = useState('');
  const [larghezza, setLarghezza] = useState('200');
  const [altezza, setAltezza] = useState('250');
  const [profondita, setProfondita] = useState('100');
  const [prezzoMax, setPrezzoMax] = useState('1000');
  const [stile, setStile] = useState('');
  const [immagineAmbiente, setImmagineAmbiente] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [negozi, setNegozi] = useState({
    ikea: false,
    semeraro: false,
    conforama: false,
    fabbricheMobili: true,
    astaDelMobile: true,
    milanoBedding: true,
    baxter: true
  });
  const [risultati, setRisultati] = useState<any[]>([]);
  const [haCercato, setHaCercato] = useState(false);
  const [elementiSelezionati, setElementiSelezionati] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Ottieni i dati da Supabase
  const { furniture, loading, error } = useFurniture();

  // Stili disponibili
  const stiliDisponibili = [
    { nome: 'Moderno', descrizione: 'Design attuale, linee pulite e materiali innovativi' }, 
    { nome: 'Classico', descrizione: 'Eleganza senza tempo, dettagli tradizionali' }, 
    { nome: 'Rustico', descrizione: 'Materiali naturali, aspetto genuino e accogliente' },
    { nome: 'Contemporaneo', descrizione: 'Tendenze attuali, colori neutri, linee essenziali' },
    { nome: 'Minimal', descrizione: 'Essenziale, forme semplici, funzionalità pura' },
    { nome: 'Economico', descrizione: 'Soluzioni convenienti senza rinunciare alla qualità' },
    { nome: 'Per Famiglie', descrizione: 'Pratico, resistente e funzionale' },
    { nome: 'Ecofriendly', descrizione: 'Materiali sostenibili e processi eco-friendly' }
  ];

  // Raccogliere tutti i tipi di mobili unici
  const tipiMobili = FURNITURE_TYPES;

  const searchParams = useSearchParams();

  // Aggiorna lo stato 'tipo' ogni volta che cambia il parametro 'categoria' nell'URL
  useEffect(() => {
    const categoriaParam = searchParams.get('categoria');
    if (categoriaParam && categoriaParam !== tipo) {
      setTipo(categoriaParam);
    }
  }, [searchParams, tipo]);

  // Avvia la ricerca automatica ogni volta che cambia 'tipo' (e i dati sono caricati)
  useEffect(() => {
    if (tipo && furniture && furniture.length > 0) {
      let risultatiFiltrati = [...furniture];
      risultatiFiltrati = risultatiFiltrati.filter(item => !["Square", "Sand", "Afrodite"].includes(item.name));
      risultatiFiltrati = risultatiFiltrati.filter(item => item.category.name.toLowerCase() === tipo.toLowerCase());
      if (larghezza) {
        risultatiFiltrati = risultatiFiltrati.filter(item => (item.width ?? 0) <= parseInt(larghezza));
      }
      if (altezza) {
        risultatiFiltrati = risultatiFiltrati.filter(item => (item.height ?? 0) <= parseInt(altezza));
      }
      if (profondita) {
        risultatiFiltrati = risultatiFiltrati.filter(item => (item.depth ?? 0) <= parseInt(profondita));
      }
      if (prezzoMax) {
        risultatiFiltrati = risultatiFiltrati.filter(item => item.price <= parseInt(prezzoMax));
      }
      // Filtraggio per stile
      if (stile) {
        risultatiFiltrati = risultatiFiltrati.filter(item => {
          const stileItem = determinaStileMobile(item);
          return stileItem === stile;
        });
      }
      risultatiFiltrati = risultatiFiltrati.filter(item => {
        if (!item.store) return false;
        if (item.store.name === 'IKEA' && negozi.ikea) return true;
        if (item.store.name === 'Semeraro' && negozi.semeraro) return true;
        if (item.store.name === 'Conforama' && negozi.conforama) return true;
        if (item.store.name === 'Fabbriche Mobili' && negozi.fabbricheMobili) return true;
        if (item.store.name === 'Asta del Mobile' && negozi.astaDelMobile) return true;
        if (item.store.name === 'Milano Bedding' && negozi.milanoBedding) return true;
        if (item.store.name === 'Baxter' && negozi.baxter) return true;
        return false;
      });
      setRisultati(risultatiFiltrati);
      setHaCercato(true);
      setElementiSelezionati([]);
    }
  }, [tipo, furniture, larghezza, altezza, profondita, prezzoMax, negozi, stile]);

  // Gestione caricamento immagine
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verifica che sia un file jpg
      if (!file.type.includes('jpeg') && !file.type.includes('jpg')) {
        alert('Per favore, carica solo immagini in formato JPG.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImmagineAmbiente(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Funzione per determinare lo stile di un mobile
  const determinaStileMobile = (item: any) => {
    // Utilizza lo stile salvato nel database
    return item.style || '';
  };

  // Gestione ricerca
  const handleRicerca = () => {
    if (!furniture) return;

    // Filtra i mobili da Supabase
    let risultatiFiltrati = [...furniture];
    // Escludi letti Square, Sand e Afrodite
    risultatiFiltrati = risultatiFiltrati.filter(item => !["Square", "Sand", "Afrodite"].includes(item.name));
    
    // Filtri per tipo
    if (tipo) {
      risultatiFiltrati = risultatiFiltrati.filter(item => item.category.name.toLowerCase() === tipo.toLowerCase());
    }
    
    // Filtri per dimensioni (se specificate)
    if (larghezza) {
      risultatiFiltrati = risultatiFiltrati.filter(item => (item.width ?? 0) <= parseInt(larghezza));
    }
    if (altezza) {
      risultatiFiltrati = risultatiFiltrati.filter(item => (item.height ?? 0) <= parseInt(altezza));
    }
    if (profondita) {
      risultatiFiltrati = risultatiFiltrati.filter(item => (item.depth ?? 0) <= parseInt(profondita));
    }
    
    // Filtro per prezzo
    if (prezzoMax) {
      risultatiFiltrati = risultatiFiltrati.filter(item => item.price <= parseInt(prezzoMax));
    }
    
    // Filtro per stile
    if (stile) {
      risultatiFiltrati = risultatiFiltrati.filter(item => {
        const stileItem = determinaStileMobile(item);
        return stileItem === stile;
      });
    }
    
    // Filtro per negozi
    risultatiFiltrati = risultatiFiltrati.filter(item => {
      if (!item.store) return false;
      if (item.store.name === 'IKEA' && negozi.ikea) return true;
      if (item.store.name === 'Semeraro' && negozi.semeraro) return true;
      if (item.store.name === 'Conforama' && negozi.conforama) return true;
      if (item.store.name === 'Fabbriche Mobili' && negozi.fabbricheMobili) return true;
      if (item.store.name === 'Asta del Mobile' && negozi.astaDelMobile) return true;
      if (item.store.name === 'Milano Bedding' && negozi.milanoBedding) return true;
      if (item.store.name === 'Baxter' && negozi.baxter) return true;
      return false;
    });
    
    setRisultati(risultatiFiltrati);
    setHaCercato(true);
    setElementiSelezionati([]);
  };

  // Gestione selezione per confronto
  const toggleElemento = (id: string) => {
    if (elementiSelezionati.includes(id)) {
      setElementiSelezionati(elementiSelezionati.filter(item => item !== id));
    } else {
      if (elementiSelezionati.length < 3) {
        setElementiSelezionati([...elementiSelezionati, id]);
      }
    }
  };

  // Ottenere elementi selezionati per il confronto
  const getElementiSelezionati = () => {
    return risultati.filter(item => elementiSelezionati.includes(item.id));
  };

  const elementiDaComparare = getElementiSelezionati();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">I mobili che si adattano alle tue misure</h1>
      
      {/* Form di ricerca */}
      <div className="elegant-card p-8 mb-10 bg-white">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Trova il mobile perfetto per il tuo spazio</h2>
          <p className="text-darkgray max-w-2xl">
          I mobili che si adattano alle tue misure
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Colonna sinistra - Funzionalità visiva */}
          <div className="flex flex-col">
            {/* Upload immagine ambiente */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3 text-primary">Carica una foto del tuo ambiente</h3>
              <p className="text-sm text-darkgray mb-4">
                Carica una foto del tuo spazio per trovare mobili adatti alle tue esigenze
              </p>
              
              <div className="border-2 border-dashed border-sand rounded-lg p-4 text-center bg-cream">
                <div className="flex flex-col items-center justify-center">
                  {immagineAmbiente ? (
                    <div className="relative w-full h-48 mb-3">
                      <Image 
                        src={immagineAmbiente} 
                        alt="Ambiente caricato" 
                        fill 
                        className="object-contain rounded-md" 
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sand mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-darkgray">Trascina qui un'immagine o clicca per caricare</p>
                      <p className="text-xs text-darkgray mt-1">Solo formato JPG</p>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept=".jpg,.jpeg"
                    className="hidden"
                  />
                  
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 px-4 py-2 bg-secondary text-darkgray text-sm rounded-md hover:bg-sand transition-colors"
                  >
                    {immagineAmbiente ? 'Cambia foto' : 'Carica ambiente'}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Selettore di stile */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3 text-primary">Stile preferito</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {stiliDisponibili.map(stileName => {
                  // Mappatura del nome stile al file immagine corrispondente
                  const getImageUrl = (nome: string) => {
                    const baseUrl = "https://cnwxrhkmudkvhzppmquu.supabase.co/storage/v1/object/public/images.for.the.website/";
                    switch(nome) {
                      case 'Moderno': return `${baseUrl}moderno1.jpeg`;
                      case 'Classico': return `${baseUrl}classico.jpeg`;
                      case 'Rustico': return `${baseUrl}rustico.jpeg`;
                      case 'Contemporaneo': return `${baseUrl}contemporaneo.jpeg`;
                      case 'Minimal': return `${baseUrl}minimal.jpeg`;
                      case 'Economico': return `${baseUrl}economico.jpeg`;
                      case 'Per Famiglie': return `${baseUrl}famiglia.png`;
                      case 'Ecofriendly': return `${baseUrl}ecofriendly.jpeg`;
                      default: return '';
                    }
                  };
                  
                  return (
                    <button
                      key={stileName.nome}
                      type="button"
                      onClick={() => setStile(stileName.nome === stile ? '' : stileName.nome)}
                      className={`p-0 rounded-md text-sm font-medium transition-all overflow-hidden relative h-32 ${
                        stileName.nome === stile
                          ? 'ring-4 ring-primary shadow-md transform scale-105'
                          : 'hover:shadow-md'
                      }`}
                    >
                      <div className="absolute inset-0">
                        <Image
                          src={getImageUrl(stileName.nome)}
                          alt={stileName.nome}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-3">
                        <span className="font-semibold mb-1 text-white">{stileName.nome}</span>
                        <span className="text-xs text-white text-center">{stileName.descrizione}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Colonna destra - Filtri funzionali */}
          <div className="flex flex-col">
            {/* Selettore categoria */}
            <div className="mb-6">
              <label className="block text-darkgray mb-2" htmlFor="tipo">
                <span className="font-medium text-primary">Cosa stai cercando?</span>
              </label>
              <select
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full p-3 border border-sand rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                <option value="">Tutti i tipi di mobili</option>
                {tipiMobili.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            
            {/* Dimensioni con cursori */}
            <div className="mb-6">
              <h3 className="font-medium text-primary mb-3">Dimensioni massime (cm)</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm text-darkgray" htmlFor="larghezza">Larghezza:</label>
                    <span className="text-sm font-medium">{larghezza} cm</span>
                  </div>
                  <input
                    id="larghezza"
                    type="range"
                    min="30"
                    max="800"
                    value={larghezza}
                    onChange={(e) => setLarghezza(e.target.value)}
                    className="w-full h-2 bg-cream rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm text-darkgray" htmlFor="altezza">Altezza:</label>
                    <span className="text-sm font-medium">{altezza} cm</span>
                  </div>
                  <input
                    id="altezza"
                    type="range"
                    min="30"
                    max="800"
                    value={altezza}
                    onChange={(e) => setAltezza(e.target.value)}
                    className="w-full h-2 bg-cream rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm text-darkgray" htmlFor="profondita">Profondità:</label>
                    <span className="text-sm font-medium">{profondita} cm</span>
                  </div>
                  <input
                    id="profondita"
                    type="range"
                    min="20"
                    max="800"
                    value={profondita}
                    onChange={(e) => setProfondita(e.target.value)}
                    className="w-full h-2 bg-cream rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            </div>
            
            {/* Selezione negozi */}
            <div className="mb-6">
              <p className="font-medium text-primary mb-2">Confronta prezzi da:</p>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center bg-cream p-2 rounded-md hover:bg-sand transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={negozi.fabbricheMobili}
                    onChange={() => setNegozi({...negozi, fabbricheMobili: !negozi.fabbricheMobili})}
                    className="mr-2 h-5 w-5 accent-primary"
                  />
                  <span className="text-darkgray">Fabbriche Mobili</span>
                </label>
                <label className="flex items-center bg-cream p-2 rounded-md hover:bg-sand transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={negozi.astaDelMobile}
                    onChange={() => setNegozi({...negozi, astaDelMobile: !negozi.astaDelMobile})}
                    className="mr-2 h-5 w-5 accent-primary"
                  />
                  <span className="text-darkgray">Asta del Mobile</span>
                </label>
                <label className="flex items-center bg-cream p-2 rounded-md hover:bg-sand transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={negozi.milanoBedding}
                    onChange={() => setNegozi({...negozi, milanoBedding: !negozi.milanoBedding})}
                    className="mr-2 h-5 w-5 accent-primary"
                  />
                  <span className="text-darkgray">Milano Bedding</span>
                </label>
                <label className="flex items-center bg-cream p-2 rounded-md hover:bg-sand transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={negozi.baxter}
                    onChange={() => setNegozi({...negozi, baxter: !negozi.baxter})}
                    className="mr-2 h-5 w-5 accent-primary"
                  />
                  <span className="text-darkgray">Baxter</span>
                </label>
              </div>
            </div>
            
            {/* Filtri avanzati (tra cui prezzo) */}
            <div className="mb-8">
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center text-primary font-medium mb-3"
              >
                <span>Filtri avanzati</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 h-5 w-5 transition-transform ${showAdvancedFilters ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showAdvancedFilters && (
                <div className="p-4 bg-cream rounded-md">
                  {/* Range prezzo (meno evidente) */}
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <label className="text-sm text-darkgray" htmlFor="prezzo">Prezzo massimo (€):</label>
                      <span className="text-sm font-medium">{prezzoMax} €</span>
                    </div>
                    <input
                      id="prezzo"
                      type="range"
                      min="50"
                      max="10000"
                      step="50"
                      value={prezzoMax}
                      onChange={(e) => setPrezzoMax(e.target.value)}
                      className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-auto">
              <button 
                onClick={handleRicerca}
                className="button-elegant w-full text-lg font-medium flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Trova e Confronta
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Risultati di ricerca */}
      {haCercato && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            {risultati.length} risultati trovati
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {risultati.map((item) => (
              <div 
                key={item.id} 
                className={`elegant-card p-4 ${
                  elementiSelezionati.includes(item.id) ? 'ring-2 ring-primary' : ''
                }`}
              >
                {/* Immagine */}
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={item.image_url || item.immagine || '/images/placeholder.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                
                {/* Contenuto */}
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
                  <p className="text-sm text-darkgray">Negozio: {item.store.name}</p>
                  
                  {/* Badge stile */}
                  {determinaStileMobile(item) && (
                    <div className="mt-1">
                      <span className="inline-block px-3 py-1 bg-secondary text-primary text-xs rounded-full font-semibold shadow-sm">
                        Stile: {determinaStileMobile(item)}
                      </span>
                    </div>
                  )}
                  
                  {/* Disponibilità */}
                  <p className={`text-sm ${
                    item.availability_status === 'Disponibile' 
                      ? 'text-green-600' 
                      : 'text-orange-600'
                  }`}>
                    {item.availability_status}
                  </p>
                  {/* Bottone per letti con più misure */}
                  {["Fiji", "Cocos", "Casablanca", "Paris"].includes(item.name) && (
                    <div className="mt-1">
                      <span className="inline-block px-3 py-1 bg-primary text-white text-xs rounded-full font-semibold shadow-sm">Diverse misure disponibili</span>
                    </div>
                  )}
                  
                  {/* Materiali e Colori */}
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
                          <span 
                            key={colore.id}
                            className="px-2 py-1 bg-sand rounded-md text-xs"
                          >
                            {colore.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Pulsanti azioni */}
                  <div className="flex justify-between items-center mt-4">
                    <a
                      href={item.product_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Vedi dettagli
                    </a>
                    
                    <button
                      onClick={() => toggleElemento(item.id)}
                      className={`button-elegant px-3 py-1 text-sm ${
                        elementiSelezionati.includes(item.id)
                          ? 'bg-primary text-white' : 'bg-sand text-darkgray'
                      }`}
                    >
                      {elementiSelezionati.includes(item.id) ? 'Selezionato' : 'Seleziona'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Sezione di confronto */}
      {elementiSelezionati.length >= 2 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Confronto prodotti</h2>
          
          <div className="elegant-card overflow-hidden">
            <div className="grid grid-cols-4 divide-x divide-sand">
              {/* Prima colonna con proprietà */}
              <div className="p-4 bg-cream">
                <div className="h-48"></div>
                <div className="py-4 font-medium text-darkgray">Nome</div>
                <div className="py-4 font-medium text-darkgray">Negozio</div>
                <div className="py-4 font-medium text-darkgray">Prezzo</div>
                <div className="py-4 font-medium text-darkgray">Tipo</div>
                <div className="py-4 font-medium text-darkgray">Larghezza</div>
                <div className="py-4 font-medium text-darkgray">Altezza</div>
                <div className="py-4 font-medium text-darkgray">Profondità</div>
                <div className="py-4 font-medium text-darkgray">Disponibilità</div>
                <div className="py-4 font-medium text-darkgray">Valutazione</div>
                <div className="py-4 font-medium text-darkgray">Materiali</div>
                <div className="py-4 font-medium text-darkgray">Colori disponibili</div>
              </div>
              
              {/* Colonne con prodotti */}
              {elementiDaComparare.map(item => (
                <div key={item.id} className="p-4">
                  <div className="relative h-48 w-full bg-lightgray mb-4">
                    <Image
                      src={item.immagine}
                      alt={item.nome}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="py-4 text-darkgray">{item.nome}</div>
                  <div className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                      item.negozio === 'Fabbriche Mobili' ? 'bg-blue-500' :
                      item.negozio === 'Asta del Mobile' ? 'bg-green-500' :
                      item.negozio === 'Milano Bedding' ? 'bg-purple-500' :
                      item.negozio === 'Baxter' ? 'bg-red-500' : 'bg-orange-500'
                    }`}>
                      {item.negozio}
                    </span>
                  </div>
                  <div className="py-4 font-semibold text-primary">{item.prezzo.toFixed(2)} €</div>
                  <div className="py-4 text-darkgray">{item.tipo}</div>
                  <div className="py-4 text-darkgray">{item.dimensioni.larghezza} cm</div>
                  <div className="py-4 text-darkgray">{item.dimensioni.altezza} cm</div>
                  <div className="py-4 text-darkgray">{item.dimensioni.profondita} cm</div>
                  <div className="py-4 text-darkgray">{item.disponibilita}</div>
                  <div className="py-4 text-darkgray">
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 ${i < Math.floor(item.valutazione) ? 'text-yellow-500' : 'text-gray-300'}`}
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm">{item.valutazione}</span>
                    </div>
                  </div>
                  <div className="py-4 text-darkgray">
                    {item.materiali ? item.materiali.join(', ') : '-'}
                  </div>
                  <div className="py-4">
                    {item.colori ? item.colori.map((colore: string) => (
                      <span key={colore} className="inline-block mr-1 mb-1 px-2 py-1 bg-secondary text-darkgray text-xs rounded-full">
                        {colore}
                      </span>
                    )) : '-'}
                  </div>
                  <div className="py-4">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="button-elegant text-sm inline-block"
                    >
                      Visita negozio
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 