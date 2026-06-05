import { useState } from 'react';
import { useFilters } from '../../context/FilterContext';

const PriceFilter: React.FC = () => {
  const { state, dispatch } = useFilters();
  const [minInput, setMinInput] = useState(state.priceRange.min > 0 ? state.priceRange.min.toString() : '');
  const [maxInput, setMaxInput] = useState(state.priceRange.max === Infinity ? '' : state.priceRange.max.toString());
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    setError(null);
    const min = minInput === '' ? 0 : parseFloat(minInput);
    const max = maxInput === '' ? Infinity : parseFloat(maxInput);

    if (isNaN(min) || isNaN(max)) {
      setError('Please enter valid numbers');
      return;
    }
    if (min > max) {
      setError('Min cannot exceed max');
      return;
    }
    dispatch({ type: 'SET_PRICE', payload: { min, max } });
  };

  return (
    <section>
      <h3 className="text-sm font-semibold text-[#111827] mb-4">Price Range</h3>
      <div className="flex gap-3 mb-4">
        <input
          type="number"
          placeholder="Min"
          value={minInput}
          onChange={(e) => setMinInput(e.target.value)}
          className="w-full h-9 px-3 rounded-lg border border-[#e5e7eb] text-sm text-[#111827] placeholder-gray-500 outline-none focus:border-[#2d6bcf] focus:ring-1 focus:ring-[#2d6bcf] transition-colors"
        />
        <input
          type="number"
          placeholder="Max"
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value)}
          className="w-full h-9 px-3 rounded-lg border border-[#e5e7eb] text-sm text-[#111827] placeholder-gray-500 outline-none focus:border-[#2d6bcf] focus:ring-1 focus:ring-[#2d6bcf] transition-colors"
        />
      </div>
      {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
      <button
        onClick={handleApply}
        className="w-full h-10 bg-[#2d6bcf] hover:bg-[#2560b8] text-white text-sm font-semibold rounded-lg transition-colors"
      >
        Apply
      </button>
    </section>
  );
};

export default PriceFilter;
