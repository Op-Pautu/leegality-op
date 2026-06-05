import { useFilters } from '../../context/FilterContext';

interface BrandFilterProps {
  brands: string[];
  filterSearch?: string;
}

const BrandFilter: React.FC<BrandFilterProps> = ({ brands, filterSearch = '' }) => {
  const { state, dispatch } = useFilters();

  const filtered = brands.filter((b) => b.toLowerCase().includes(filterSearch.toLowerCase()));

  if (filtered.length === 0) return null;

  return (
    <section>
      <h3 className="text-sm font-semibold text-[#111827] mb-4">Brands</h3>
      <ul className="flex flex-col gap-3">
        {filtered.map((brand) => (
          <li key={brand}>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={state.selectedBrands.has(brand)}
                onChange={() => dispatch({ type: 'TOGGLE_BRAND', payload: brand })}
                className="w-4 h-4 rounded border-gray-300 accent-[#2d6bcf] cursor-pointer"
              />
              <span className="text-sm text-[#6b7280] group-hover:text-[#111827] transition-colors">
                {brand}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BrandFilter;
