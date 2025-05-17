import { STORES, FURNITURE_TYPES } from '../hooks/useStaticValues';

// Tipo per i risultati della ricerca
export type ItemMobile = {
  id: string;
  nome: string;
  tipo: typeof FURNITURE_TYPES[number];
  prezzo: number;
  dimensioni: {
    larghezza: number;
    altezza: number;
    profondita: number;
  };
  negozio: typeof STORES[number];
  immagine: string;
  url: string;
  disponibilita: string;
  valutazione: number;
  descrizione?: string;
  colori?: string[];
  materiali?: string[];
};

// Dati di esempio
export const mobili: ItemMobile[] = [
  // IKEA
  {
    id: 'ikea1',
    nome: 'MALM Cassettiera con 6 cassetti',
    tipo: 'Cassettiera',
    prezzo: 149.00,
    dimensioni: { larghezza: 80, altezza: 123, profondita: 48 },
    negozio: 'IKEA',
    immagine: 'https://www.ikea.com/it/it/images/products/malm-cassettiera-con-6-cassetti-bianco__0484884_pe621348_s5.jpg?f=xl',
    url: 'https://www.ikea.com/it/it/p/malm-cassettiera-con-6-cassetti-bianco-60403571/',
    disponibilita: 'Disponibile',
    valutazione: 4.5,
    descrizione: 'Cassettiera moderna con ampio spazio di archiviazione. In legno verniciato bianco.',
    colori: ['Bianco', 'Nero-marrone', 'Effetto rovere'],
    materiali: ['Truciolato', 'Fibra di legno', 'Lamina']
  },
  {
    id: 'ikea2',
    nome: 'BILLY Libreria',
    tipo: 'Libreria',
    prezzo: 59.95,
    dimensioni: { larghezza: 80, altezza: 202, profondita: 28 },
    negozio: 'IKEA',
    immagine: 'https://www.ikea.com/it/it/images/products/billy-libreria-bianco__0625599_pe692385_s5.jpg?f=xl',
    url: 'https://www.ikea.com/it/it/p/billy-libreria-bianco-00263850/',
    disponibilita: 'Disponibile',
    valutazione: 4.7,
    descrizione: 'Libreria versatile con ripiani regolabili per adattarsi alle tue esigenze.',
    colori: ['Bianco', 'Effetto rovere', 'Nero-marrone'],
    materiali: ['Truciolare', 'Carta', 'Plastica']
  },
  {
    id: 'ikea3',
    nome: 'HEMNES Letto',
    tipo: 'Letto',
    prezzo: 299.00,
    dimensioni: { larghezza: 160, altezza: 80, profondita: 200 },
    negozio: 'IKEA',
    immagine: 'https://www.ikea.com/it/it/images/products/hemnes-struttura-letto-mordente-bianco__0637516_pe698353_s5.jpg?f=xl',
    url: 'https://www.ikea.com/it/it/p/hemnes-struttura-letto-mordente-bianco-30381202/',
    disponibilita: 'Disponibile',
    valutazione: 4.6,
    descrizione: 'Letto in legno massello con testiera alta e finitura verniciata.',
    colori: ['Bianco', 'Nero-marrone'],
    materiali: ['Pino massiccio', 'Vernice acrilica']
  },
  {
    id: 'ikea4',
    nome: 'KIVIK Divano 3 posti',
    tipo: 'Divano',
    prezzo: 599.00,
    dimensioni: { larghezza: 228, altezza: 83, profondita: 95 },
    negozio: 'IKEA',
    immagine: 'https://www.ikea.com/it/it/images/products/kivik-divano-a-3-posti-hillared-antracite__0778452_pe759003_s5.jpg?f=xl',
    url: 'https://www.ikea.com/it/it/p/kivik-divano-a-3-posti-hillared-antracite-s19278069/',
    disponibilita: 'Disponibile',
    valutazione: 4.5,
    descrizione: 'Divano spazioso e confortevole con braccioli larghi che possono fungere da poggiatesta.',
    colori: ['Grigio scuro', 'Beige', 'Blu'],
    materiali: ['Poliestere', 'Legno', 'Metallo']
  },
  {
    id: 'ikea5',
    nome: 'MÖRBYLÅNGA Tavolo',
    tipo: 'Tavolo',
    prezzo: 499.00,
    dimensioni: { larghezza: 140, altezza: 75, profondita: 85 },
    negozio: 'IKEA',
    immagine: 'https://www.ikea.com/it/it/images/products/moerbylanga-tavolo-impiallacciatura-di-rovere-mordente-marrone__0737110_pe740888_s5.jpg?f=xl',
    url: 'https://www.ikea.com/it/it/p/moerbylanga-tavolo-impiallacciatura-di-rovere-mordente-marrone-20293766/',
    disponibilita: 'Su ordinazione',
    valutazione: 4.7,
    descrizione: 'Tavolo in rovere impiallacciato con gambe in acciaio verniciato a polvere.',
    colori: ['Rovere', 'Marrone'],
    materiali: ['Rovere impiallacciato', 'Acciaio']
  },
  
  // Semeraro
  {
    id: 'sem1',
    nome: 'Libreria Moderna 5 Ripiani',
    tipo: 'Libreria',
    prezzo: 129.99,
    dimensioni: { larghezza: 85, altezza: 200, profondita: 30 },
    negozio: 'Semeraro',
    immagine: 'https://semeraro.it/wp-content/uploads/2025/01/libreria_5_bianco_bianco_int.jpg',
    url: 'https://semeraro.it/prodotto/dominio-libreria-5-piani-bianco-bianco/',
    disponibilita: 'Su ordinazione',
    valutazione: 4.2,
    descrizione: 'Libreria dal design moderno con 5 ripiani spaziosi. Ideale per libri o oggetti decorativi.',
    colori: ['Bianco', 'Rovere chiaro'],
    materiali: ['Legno MDF', 'Melamina']
  },
  {
    id: 'sem2',
    nome: 'Divano 3 posti Relax',
    tipo: 'Divano',
    prezzo: 599.00,
    dimensioni: { larghezza: 220, altezza: 85, profondita: 95 },
    negozio: 'Semeraro',
    immagine: 'https://www.semeraro.it/dw/image/v2/BGRM_PRD/on/demandware.static/-/Sites-semeraro-master-catalog/default/dwdaee414c/hi-res/1150005123_DIVANO_DENVER.jpg?sw=800&sh=800',
    url: 'https://www.semeraro.it/divano-denver-1150005123.html',
    disponibilita: 'Disponibile',
    valutazione: 4.4,
    descrizione: 'Divano a 3 posti con meccanismo relax manuale su entrambe le sedute laterali.',
    colori: ['Grigio', 'Beige', 'Blu scuro'],
    materiali: ['Microfibra', 'Poliestere', 'Legno']
  },
  {
    id: 'sem3',
    nome: 'Armadio 4 ante battenti',
    tipo: 'Armadio',
    prezzo: 429.00,
    dimensioni: { larghezza: 180, altezza: 250, profondita: 58 },
    negozio: 'Semeraro',
    immagine: 'https://www.semeraro.it/dw/image/v2/BGRM_PRD/on/demandware.static/-/Sites-semeraro-master-catalog/default/dw09c7b6af/hi-res/1005003097_ARMADIO_ALTEA.jpg?sw=800&sh=800',
    url: 'https://www.semeraro.it/armadio-altea-1005003097.html',
    disponibilita: 'Disponibile',
    valutazione: 4.3,
    descrizione: 'Armadio capiente con 4 ante battenti e ampio spazio interno organizzato.',
    colori: ['Bianco', 'Noce'],
    materiali: ['Legno nobilitato', 'Alluminio']
  },
  {
    id: 'sem4',
    nome: 'Letto matrimoniale contenitore',
    tipo: 'Letto',
    prezzo: 299.90,
    dimensioni: { larghezza: 165, altezza: 95, profondita: 205 },
    negozio: 'Semeraro',
    immagine: 'https://www.semeraro.it/dw/image/v2/BGRM_PRD/on/demandware.static/-/Sites-semeraro-master-catalog/default/dw0a5f6ebe/hi-res/1055004183_LETTO_CONTENITORE_SOMMIER_KORA.jpg?sw=800&sh=800',
    url: 'https://www.semeraro.it/letto-contenitore-sommier-kora-1055004183.html',
    disponibilita: 'Su ordinazione',
    valutazione: 4.5,
    descrizione: 'Letto matrimoniale con contenitore e rete a doghe inclusa.',
    colori: ['Bianco', 'Grigio'],
    materiali: ['Ecopelle', 'Legno']
  },
  
  // Conforama
  {
    id: 'conf1',
    nome: 'Cassettiera Oslo 6 Cassetti',
    tipo: 'Cassettiera',
    prezzo: 179.90,
    dimensioni: { larghezza: 82, altezza: 125, profondita: 45 },
    negozio: 'Conforama',
    immagine: 'https://www.conforama.it/media/catalog/product/cache/af4999874f862eef504d4a9daa5a036a/c/a/cassettiera-4-cassetti-legno-bianco-lodi-bianco-1_3.jpg',
    url: 'https://www.conforama.it/camera-da-letto/cassettiere-e-comodini/cassettiera-4-cassetti-legno-bianco-lodi',
    disponibilita: 'Disponibile',
    valutazione: 4.3,
    descrizione: 'Cassettiera elegante con 6 cassetti spaziosi e guide metalliche.',
    colori: ['Bianco', 'Rovere naturale'],
    materiali: ['Legno nobilitato', 'Metallo']
  },
  {
    id: 'conf2',
    nome: 'Tavolo da pranzo estensibile',
    tipo: 'Tavolo',
    prezzo: 349.90,
    dimensioni: { larghezza: 160, altezza: 75, profondita: 90 },
    negozio: 'Conforama',
    immagine: 'https://www.conforama.it/media/catalog/product/cache/af4999874f862eef504d4a9daa5a036a/t/a/tavolo-allungabile-legno-mdf-piedi-metallo-rovere-spazzolato-lucca-rovere_1.jpg',
    url: 'https://www.conforama.it/soggiorno/tavoli/tavolo-allungabile-legno-mdf-piedi-metallo-rovere-spazzolato-lucca',
    disponibilita: 'Disponibile',
    valutazione: 4.1,
    descrizione: 'Tavolo da pranzo allungabile fino a 240 cm, ideale per occasioni speciali.',
    colori: ['Bianco opaco', 'Rovere'],
    materiali: ['Legno MDF', 'Metallo verniciato']
  },
  {
    id: 'conf3',
    nome: 'Armadio scorrevole 2 ante',
    tipo: 'Armadio',
    prezzo: 399.00,
    dimensioni: { larghezza: 180, altezza: 210, profondita: 65 },
    negozio: 'Conforama',
    immagine: 'https://www.conforama.it/media/catalog/product/cache/af4999874f862eef504d4a9daa5a036a/a/r/armadio-2-ante-scorrevoli-bianco-specchio-ambra-2_1.jpg',
    url: 'https://www.conforama.it/camera-da-letto/armadi/armadio-2-ante-scorrevoli-bianco-specchio-ambra',
    disponibilita: 'Su ordinazione',
    valutazione: 4.0,
    descrizione: 'Armadio con ante scorrevoli e specchio, dotato di ripiani e barra appendiabiti.',
    colori: ['Bianco', 'Grigio'],
    materiali: ['Legno truciolare', 'Specchio', 'Alluminio']
  },
  {
    id: 'conf4',
    nome: 'Divano angolare reversibile',
    tipo: 'Divano',
    prezzo: 699.00,
    dimensioni: { larghezza: 250, altezza: 85, profondita: 180 },
    negozio: 'Conforama',
    immagine: 'https://www.conforama.it/media/catalog/product/cache/af4999874f862eef504d4a9daa5a036a/d/i/divano-angolare-reversibile-tessuto-grigio-scuro-parigi-2_1.jpg',
    url: 'https://www.conforama.it/soggiorno/divani/divano-angolare-reversibile-tessuto-grigio-scuro-parigi',
    disponibilita: 'Disponibile',
    valutazione: 4.4,
    descrizione: 'Divano angolare con penisola reversibile e contenitore. Rivestimento in tessuto antimacchia.',
    colori: ['Grigio', 'Antracite', 'Blu'],
    materiali: ['Tessuto antimacchia', 'Legno', 'Poliuretano espanso']
  },
  {
    id: 'conf5',
    nome: 'Scrivania con cassetti',
    tipo: 'Scrivania',
    prezzo: 159.90,
    dimensioni: { larghezza: 120, altezza: 75, profondita: 60 },
    negozio: 'Conforama',
    immagine: 'https://www.conforama.it/media/catalog/product/cache/af4999874f862eef504d4a9daa5a036a/s/c/scrivania-2-cassetti-legno-bianco-frassino-brera-3_2.jpg',
    url: 'https://www.conforama.it/studio-e-ufficio/scrivanie-e-postazioni-studio/scrivania-2-cassetti-legno-bianco-frassino-brera',
    disponibilita: 'Disponibile',
    valutazione: 4.2,
    descrizione: 'Scrivania con 2 cassetti e ripiano estraibile per tastiera.',
    colori: ['Bianco', 'Rovere'],
    materiali: ['Legno MDF', 'Metallo']
  }
]; 