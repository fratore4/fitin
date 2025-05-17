export interface Furniture {
  id: string;
  name: string;
  category: string;
  price: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  imageUrl: string;
  source: string;
}

export const mockFurniture: Furniture[] = [
  {
    id: '1',
    name: 'Divano Moderno 3 Posti',
    category: 'Divani',
    price: 599,
    dimensions: {
      width: 220,
      height: 85,
      depth: 95,
    },
    imageUrl: '/images/divano.jpg',
    source: 'MobiliShop',
  },
  {
    id: '2',
    name: 'Tavolo da Pranzo in Legno',
    category: 'Tavoli',
    price: 349,
    dimensions: {
      width: 160,
      height: 75,
      depth: 90,
    },
    imageUrl: '/images/tavolo.jpg',
    source: 'ArredoCase',
  },
  {
    id: '3',
    name: 'Libreria a 5 Ripiani',
    category: 'Librerie',
    price: 189,
    dimensions: {
      width: 80,
      height: 180,
      depth: 30,
    },
    imageUrl: '/images/libreria.jpg',
    source: 'MegaMobili',
  },
  {
    id: '4',
    name: 'Letto Matrimoniale con Contenitore',
    category: 'Letti',
    price: 449,
    dimensions: {
      width: 170,
      height: 100,
      depth: 210,
    },
    imageUrl: '/images/letto.jpg',
    source: 'DolceSonno',
  },
  {
    id: '5',
    name: 'Scrivania Angolare',
    category: 'Scrivanie',
    price: 229,
    dimensions: {
      width: 140,
      height: 75,
      depth: 120,
    },
    imageUrl: '/images/scrivania.jpg',
    source: 'OfficeArredo',
  },
  {
    id: '6',
    name: 'Sedia da Ufficio Ergonomica',
    category: 'Sedie',
    price: 179,
    dimensions: {
      width: 60,
      height: 120,
      depth: 65,
    },
    imageUrl: '/images/sedia.jpg',
    source: 'ComfortWork',
  },
]; 