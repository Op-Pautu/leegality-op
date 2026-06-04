import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFilters } from '../context/FilterContext';
import { useProducts } from '../hooks/useProducts';
import FilterSidebar from '../components/Filters/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';

const ProductListingPage: React.FC = () => {
  const location = useLocation();
  const { state, dispatch, applyClientFilters } = useFilters();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Restore filter state from navigation
  useEffect(() => {
    if (location.state?.filters) {
      const { selectedCategory, priceRange, selectedBrands, currentPage } = location.state.filters;
      if (selectedCategory) {
        dispatch({ type: 'SET_CATEGORY', payload: selectedCategory });
      }
      if (priceRange) {
        dispatch({ type: 'SET_PRICE', payload: priceRange });
      }
      selectedBrands?.forEach((brand: string) => {
        dispatch({ type: 'TOGGLE_BRAND', payload: brand });
      });
      if (currentPage) {
        dispatch({ type: 'SET_PAGE', payload: currentPage });
      }
    }
  }, []);

  const skip = (state.currentPage - 1) * 12;
  const { products, allBrands, loading, error, totalPages } = useProducts(
    state.selectedCategory,
    skip
  );

  const filteredProducts = applyClientFilters(products);

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile filter toggle */}
      <div className="md:hidden sticky top-16 bg-white border-b border-gray-200 px-4 py-3 z-30">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 text-gray-700 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </button>
      </div>

      <div className="flex gap-0">
        {/* Sidebar */}
        <div
          className={`fixed md:static inset-0 z-40 md:z-auto bg-white md:bg-white border-r border-gray-200 w-64 overflow-y-auto pt-16 md:pt-0 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
        >
          <div className="p-6">
            <FilterSidebar brands={allBrands} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="p-6">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-300 text-red-800 px-6 py-4 rounded">
                <p className="font-semibold">Error loading products</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-orange-400"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-gray-50 rounded p-12 text-center">
                <p className="text-gray-600 mb-6 text-lg">No products found</p>
                <button
                  onClick={() => dispatch({ type: 'RESET_FILTERS' })}
                  className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <ProductGrid products={filteredProducts} />
                <Pagination currentPage={state.currentPage} totalPages={totalPages} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductListingPage;
