import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import { Product } from '../types';
import { PRODUCTS_PER_PAGE } from '../utils/constants';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalProducts: number;
  totalPages: number;
  retry: () => void;
}

export const useProducts = (
  category: string | null = null,
  skip: number = 0,
  search: string = ''
): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts(PRODUCTS_PER_PAGE, skip, category || undefined, search || undefined);
      setProducts(data.products || []);
      setTotalProducts(data.total || 0);
    } catch {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, skip, search]);

  return {
    products,
    loading,
    error,
    totalProducts,
    totalPages: Math.ceil(totalProducts / PRODUCTS_PER_PAGE),
    retry: fetchProducts,
  };
};
