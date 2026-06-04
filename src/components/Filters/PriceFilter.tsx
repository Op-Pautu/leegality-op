import { useState } from 'react';
import { useFilters } from '../../context/FilterContext';

const PriceFilter: React.FC = () => {
  const { state, dispatch } = useFilters();
  const [minInput, setMinInput] = useState(state.priceRange.min.toString());
  const [maxInput, setMaxInput] = useState(
    state.priceRange.max === Infinity ? '' : state.priceRange.max.toString()
  );
  const [error, setError] = useState<string | null>(null);

  const handlePriceChange = () => {
    setError(null);

    const min = minInput === '' ? 0 : parseFloat(minInput);
    const max = maxInput === '' ? Infinity : parseFloat(maxInput);

    if (isNaN(min) || isNaN(max)) {
      setError('Please enter valid numbers');
      return;
    }

    if (min > max) {
      setError('Min price cannot be greater than max');
      return;
    }

    dispatch({ type: 'SET_PRICE', payload: { min, max } });
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Price Range
      </label>
      <div className="space-y-2">
        <input
          type="number"
          placeholder="Min Price"
          value={minInput}
          onChange={(e) => setMinInput(e.target.value)}
          onBlur={handlePriceChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value)}
          onBlur={handlePriceChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default PriceFilter;
