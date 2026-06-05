import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { useFilters } from '../../context/FilterContext';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import BrandFilter from './BrandFilter';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  brands: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose, brands }) => {
  const { dispatch } = useFilters();
  const [filterSearch, setFilterSearch] = useState('');

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="overlay-enter fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Drawer */}
      <aside className="drawer-enter fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e7eb]">
          <h2 className="text-lg font-bold text-[#111827]">Filters</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 px-6 py-6 flex flex-col gap-8">
          {/* Search */}
          <div className="relative h-9">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Search..."
              className="w-full h-full pl-10 pr-3 rounded-lg border border-[#e5e7eb] text-sm text-[#111827] placeholder-gray-500 outline-none focus:border-[#2d6bcf] focus:ring-1 focus:ring-[#2d6bcf] transition-colors"
            />
          </div>

          <CategoryFilter filterSearch={filterSearch} />
          <PriceFilter />
          <BrandFilter brands={brands} filterSearch={filterSearch} />

          <button
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
            className="w-full h-10 border border-[#e5e7eb] text-[#374151] text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
