import { useCategories } from '../../hooks/useCategories';
import { useFilters } from '../../context/FilterContext';

const CategoryFilter: React.FC = () => {
  const { categories, loading, error } = useCategories();
  const { state, dispatch } = useFilters();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'all' ? null : e.target.value;
    dispatch({ type: 'SET_CATEGORY', payload: value });
  };

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded text-red-700 text-sm">
        {error}
      </div>
    );
  }

  // Ensure categories are strings, handle both string and object responses
  const categoryList = categories.map((cat: string) =>
    typeof cat === 'string' ? cat : (cat as any).slug || (cat as any).name || String(cat)
  );

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Category
      </label>
      <select
        value={state.selectedCategory || 'all'}
        onChange={handleCategoryChange}
        disabled={loading}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      >
        <option value="all">All Categories</option>
        {categoryList.map((cat) => (
          <option key={cat} value={cat}>
            {typeof cat === 'string' ? cat.charAt(0).toUpperCase() + cat.slice(1) : cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
