import { useState, useEffect } from 'react';
import { getProductById } from '../services/api';
import { Product } from '../types';

interface UseProductDetailReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export const useProductDetail = (id: number | string): UseProductDetailReturn => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductById(Number(id));
      setProduct(data);
    } catch (err) {
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error, retry: fetchProduct };
};
