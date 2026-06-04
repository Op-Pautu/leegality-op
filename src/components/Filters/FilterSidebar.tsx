import { useFilters } from '../../context/FilterContext';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import BrandFilter from './BrandFilter';

interface FilterSidebarProps {
  brands: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ brands }) => {
  const { dispatch } = useFilters();

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Filters</h2>

      <CategoryFilter />
      <PriceFilter />
      <BrandFilter brands={brands} />

      <button
        onClick={() => dispatch({ type: 'RESET_FILTERS' })}
        className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition text-sm font-medium"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
