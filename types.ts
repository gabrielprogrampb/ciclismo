
export enum BikeCategory {
  MOUNTAIN = 'Montaña',
  ROAD = 'Carretera',
  URBAN = 'Urbana',
  ELECTRIC = 'Eléctrica',
}

export enum BikeCondition {
  NEW = 'Nueva',
  EXCELLENT = 'Excelente',
  GOOD = 'Buena',
  FAIR = 'Regular',
  FOR_PARTS = 'Para piezas',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface Bike {
  id: string;
  title: string;
  description: string;
  category: BikeCategory;
  brand: string;
  model: string;
  frameSize: string;
  condition: BikeCondition;
  price: number;
  location: string;
  images: string[];
  sellerId: string;
  postedDate: string;
}

export interface Route {
  id: string;
  name: string;
  distance: number; // in km
  location: string;
  shortDescription: string;
  fullDescription: string;
  elevation: number; // in meters
  mapEmbedUrl: string;
  pointsOfInterest: string[];
  image: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  publishDate: string;
  content: string;
  featuredImage: string;
}
