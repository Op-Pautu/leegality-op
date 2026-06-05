import React, { createContext, useReducer, type ReactNode } from 'react';
import { type FilterState, type FilterAction, type Product } from '../types';

const initialState: FilterState = {
  selectedCategory: null,
  priceRange: { min: 0, max: Infinity },
  selectedBrands: new Set(),
  currentPage: 1,
  searchQuery: '',
};

const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload, currentPage: 1, searchQuery: '' };
    case 'SET_PRICE':
      return { ...state, priceRange: action.payload, currentPage: 1 };
    case 'TOGGLE_BRAND': {
      const newBrands = new Set(state.selectedBrands);
      if (newBrands.has(action.payload)) {
        newBrands.delete(action.payload);
      } else {
        newBrands.add(action.payload);
      }
      return { ...state, selectedBrands: newBrands, currentPage: 1 };
    }
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload, currentPage: 1, selectedCategory: null };
    case 'RESET_FILTERS':
      return initialState;
    default:
      return state;
  }
};

interface FilterContextType {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
  applyClientFilters: (products: Product[]) => Product[];
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const applyClientFilters = (products: Product[]): Product[] => {
    return products.filter((product) => {
      const priceMatch =
        product.price >= state.priceRange.min &&
        product.price <= state.priceRange.max;

      const brandMatch =
        state.selectedBrands.size === 0 || state.selectedBrands.has(product.brand);

      return priceMatch && brandMatch;
    });
  };

  return (
    <FilterContext.Provider value={{ state, dispatch, applyClientFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = React.useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider');
  }
  return context;
};
