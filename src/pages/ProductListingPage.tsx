import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFilters } from '../context/FilterContext';
import { useProducts } from '../hooks/useProducts';
import FilterSidebar from '../components/Filters/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';

const ProductListingPage: React.FC = () => {
  const location = useLocation();
  const { state, dispatch, applyClientFilters } = useFilters();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  const skip = (state.currentPage - 1) * 10;
  const { products, allBrands, loading, error, totalPages, retry } = useProducts(
    state.selectedCategory,
    skip
  );

  const filteredProducts = applyClientFilters(products);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          className="md:hidden mb-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          {mobileFiltersOpen ? '✕ Close Filters' : '☰ Filters'}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar - hidden on mobile by default */}
          <div
            className={`${mobileFiltersOpen ? 'block' : 'hidden md:block'
              } col-span-1`}
          >
            <FilterSidebar brands={allBrands} />
          </div>

          {/* Main content */}
          <div className="col-span-1 md:col-span-3">
            {error && <div className="mb-6">{/* ErrorMessage component goes here */}</div>}

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-4">No products match your filters</p>
                <button
                  onClick={() => dispatch({ type: 'RESET_FILTERS' })}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
    </div>
  );
};

export default ProductListingPage;
