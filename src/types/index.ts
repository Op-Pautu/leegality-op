export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  stock: number;
  discountPercentage?: number;
}

export interface Category {
  name: string;
  slug: string;
}

export interface FilterState {
  selectedCategory: string | null;
  priceRange: {
    min: number;
    max: number;
  };
  selectedBrands: Set<string>;
  currentPage: number;
  searchQuery: string;
}

export type FilterAction =
  | { type: 'SET_CATEGORY'; payload: string | null }
  | { type: 'SET_PRICE'; payload: { min: number; max: number } }
  | { type: 'TOGGLE_BRAND'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'RESET_FILTERS' };

export interface ApiResponse<T> {
  products?: T[];
  total?: number;
  skip?: number;
  limit?: number;
}
