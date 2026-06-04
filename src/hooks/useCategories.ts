import { useState, useEffect } from 'react';
import { getCategories } from '../services/api';

interface UseCategoriesReturn {
  categories: string[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      // Handle both array of strings and array of objects
      const catList = Array.isArray(data)
        ? data.map((cat) =>
          typeof cat === 'string' ? cat : cat.slug || cat.name || String(cat)
        )
        : [];
      setCategories(catList);
    } catch (err) {
      setError('Unable to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, retry: fetchCategories };
};
