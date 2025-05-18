// Questo file serve solo come contenitore per il componente client
import SearchPage from './SearchClientComponent';

// Forza la modalità dinamica per evitare problemi di pre-rendering
export const dynamic = 'force-dynamic';

export default function RicercaPage() {
  return <SearchPage />;
}