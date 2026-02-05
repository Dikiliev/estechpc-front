export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  specs: { [key: string]: string };
  featured?: boolean;
  rating: number;
  compatibility?: {
    socket?: string;
    memoryType?: string;
    formFactor?: string;
    wattage?: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export type ViewState = 
  | 'HOME' 
  | 'CATALOG' 
  | 'PRODUCT_DETAIL' 
  | 'CHECKOUT' 
  | 'CONFIGURATOR' 
  | 'SUPPORT' 
  | 'LEGAL_PRIVACY' 
  | 'LEGAL_TERMS'
  | 'WISHLIST';

export interface FilterState {
  category: string | null;
  minPrice: number;
  maxPrice: number;
  sortBy: 'price-asc' | 'price-desc' | 'popular';
}

export interface Category {
  id: string;
  name: string;
  subcategories?: { id: string; name: string }[];
}

export interface BuildStep {
  id: string;
  name: string;
  category: string;
  description: string;
}