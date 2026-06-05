import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import { Product } from '../types';
import { PRODUCTS_PER_PAGE } from '../utils/constants';

interface UseProductsReturn {
  products: Product[];
  allBrands: string[];
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
  const [allBrands, setAllBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts(PRODUCTS_PER_PAGE, skip, category || undefined, search || undefined);

      const productList = data.products || [];
      setProducts(productList);
      setTotalProducts(data.total || 0);

      const brands = Array.from(
        new Set(productList.map((p) => p.brand).filter(Boolean))
      ).sort();
      setAllBrands(brands);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, skip, search]);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return {
    products,
    allBrands,
    loading,
    error,
    totalProducts,
    totalPages,
    retry: fetchProducts,
  };
};
