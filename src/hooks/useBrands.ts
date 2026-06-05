import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

/**
 * Fetches the complete brand list for a given category.
 * Uses limit=0 which returns total count + empty products array,
 * then fetches all with the actual total to get every brand name.
 * Re-fetches only when category changes, not on pagination.
 */
export const useBrands = (category: string | null): string[] => {
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      try {
        // First get the total count cheaply
        const meta = await getProducts(1, 0, category || undefined);
        const total = meta.total || 0;
        if (total === 0 || cancelled) return;

        // Then fetch all products just for brand extraction
        const data = await getProducts(total, 0, category || undefined);
        if (cancelled) return;

        const extracted = Array.from(
          new Set((data.products || []).map((p) => p.brand).filter(Boolean))
        ).sort();

        setBrands(extracted);
      } catch {
        // silently keep existing brands on error
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, [category]);

  return brands;
};
