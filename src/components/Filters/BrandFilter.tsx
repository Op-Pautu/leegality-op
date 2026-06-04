import { useFilters } from '../../context/FilterContext';

interface BrandFilterProps {
  brands: string[];
}

const BrandFilter: React.FC<BrandFilterProps> = ({ brands }) => {
  const { state, dispatch } = useFilters();

  const handleBrandToggle = (brand: string) => {
    dispatch({ type: 'TOGGLE_BRAND', payload: brand });
  };

  if (brands.length === 0) {
    return (
      <div className="text-gray-500 text-sm">
        No brands available
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Brand
      </label>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {brands.map((brand) => (
          <label key={brand} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={state.selectedBrands.has(brand)}
              onChange={() => handleBrandToggle(brand)}
              className="rounded border-gray-300 cursor-pointer"
            />
            <span className="text-sm text-gray-700">{brand}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
