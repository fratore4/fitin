import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

export type FurnitureWithDetails = Database['public']['Tables']['furniture']['Row'] & {
  store: Database['public']['Tables']['stores']['Row'];
  category: Database['public']['Tables']['furniture_categories']['Row'];
  materials: Database['public']['Tables']['materials']['Row'][];
  colors: Database['public']['Tables']['colors']['Row'][];
};

export const useFurniture = () => {
  const [furniture, setFurniture] = useState<FurnitureWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const { data: furnitureData, error: furnitureError } = await supabase
          .from('furniture')
          .select(`
            *,
            store:stores(*),
            category:furniture_categories(*),
            materials:furniture_materials(materials(*)),
            colors:furniture_colors(colors(*))
          `);

        if (furnitureError) throw furnitureError;

        const formattedData = furnitureData.map(item => ({
          ...item,
          store: item.store,
          category: item.category,
          materials: item.materials.map(m => m.materials),
          colors: item.colors.map(c => c.colors)
        }));

        setFurniture(formattedData as FurnitureWithDetails[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Si è verificato un errore');
      } finally {
        setLoading(false);
      }
    };

    // Iniziale caricamento dei dati
    fetchFurniture();

    // Sottoscrizione ai cambiamenti in tempo reale
    const subscription = supabase
      .channel('furniture_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'furniture'
        },
        async (payload) => {
          // Ricarica i dati quando ci sono cambiamenti
          await fetchFurniture();
        }
      )
      .subscribe();

    // Pulizia della sottoscrizione
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { furniture, loading, error };
}; 