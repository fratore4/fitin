// Valori statici per i negozi
export const STORES = ['Fabbriche Mobili', 'Asta del Mobile', 'Milano Bedding', 'Baxter'] as const;

// Valori statici per i tipi di mobili
export const FURNITURE_TYPES = [
  'Cassettiera',
  'Libreria',
  'Letto',
  'Divano',
  'Tavolo',
  'Armadio',
  'Scrivania',
  'Parete Attrezzata'
] as const;

// Valori statici per le dimensioni
export const DIMENSIONS = {
  MIN_WIDTH: 0,
  MAX_WIDTH: 300,
  MIN_HEIGHT: 0,
  MAX_HEIGHT: 300,
  MIN_DEPTH: 0,
  MAX_DEPTH: 200
};

// Valori statici per i prezzi
export const PRICES = {
  MIN: 0,
  MAX: 1000
};

// Valori statici per le valutazioni
export const RATINGS = {
  MIN: 0,
  MAX: 5
};

// Hook personalizzato per i valori statici
export const useStaticValues = () => {
  return {
    stores: STORES,
    furnitureTypes: FURNITURE_TYPES,
    dimensions: DIMENSIONS,
    prices: PRICES,
    ratings: RATINGS
  };
};

export default useStaticValues; 