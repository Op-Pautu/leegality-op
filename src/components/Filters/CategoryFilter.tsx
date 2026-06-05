import { useCategories } from '../../hooks/useCategories';
import { useFilters } from '../../context/FilterContext';

const CategoryFilter: React.FC = () => {
  const { categories, loading, error } = useCategories();
  const { state, dispatch } = useFilters();

  const toggleCategory = (cat: string) => {
    // We support single category selection via the API
    const current = state.selectedCategory;
    dispatch({ type: 'SET_CATEGORY', payload: current === cat ? null : cat });
  };

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  const categoryList = categories.map((cat: string) =>
    typeof cat === 'string' ? cat : (cat as any).slug || (cat as any).name || String(cat)
  );

  return (
    <section>
      <h3 className="text-sm font-semibold text-[#111827] mb-4">Categories</h3>
      {loading ? (
        <p className="text-sm text-[#6b7280]">Loading...</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {categoryList.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={state.selectedCategory === cat}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 rounded border-gray-300 accent-[#2d6bcf] cursor-pointer"
                />
                <span className="text-sm text-[#6b7280] group-hover:text-[#111827] transition-colors capitalize">
                  {cat}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CategoryFilter;
