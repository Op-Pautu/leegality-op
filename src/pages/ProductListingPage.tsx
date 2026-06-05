import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFilters } from '../context/FilterContext';
import { useProducts } from '../hooks/useProducts';
import { useBrands } from '../hooks/useBrands';
import FilterSidebar from '../components/Filters/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

interface ProductListingPageProps {
  sidebarOpen: boolean;
  onSidebarClose: () => void;
}

const ProductListingPage: React.FC<ProductListingPageProps> = ({ sidebarOpen, onSidebarClose }) => {
  const location = useLocation();
  const { state, dispatch, applyClientFilters } = useFilters();

  useEffect(() => {
    if (location.state?.filters) {
      const { selectedCategory, priceRange, selectedBrands, currentPage } = location.state.filters;
      if (selectedCategory) dispatch({ type: 'SET_CATEGORY', payload: selectedCategory });
      if (priceRange) dispatch({ type: 'SET_PRICE', payload: priceRange });
      selectedBrands?.forEach((brand: string) => dispatch({ type: 'TOGGLE_BRAND', payload: brand }));
      if (currentPage) dispatch({ type: 'SET_PAGE', payload: currentPage });
    }
  }, []);

  const skip = (state.currentPage - 1) * 12;
  const { products, loading, error, totalPages } = useProducts(state.selectedCategory, skip, state.searchQuery);
  const allBrands = useBrands(state.selectedCategory);
  const filteredProducts = applyClientFilters(products);

  return (
    <>
      <FilterSidebar isOpen={sidebarOpen} onClose={onSidebarClose} brands={allBrands} />

      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-24">
            <LoadingSpinner />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-[#6b7280]">
            <p className="text-lg mb-4">No products found</p>
            <button
              onClick={() => dispatch({ type: 'RESET_FILTERS' })}
              className="h-10 px-6 bg-[#2d6bcf] hover:bg-[#2560b8] text-white text-sm font-semibold rounded-lg transition-colors"
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
      </main>
    </>
  );
};

export default ProductListingPage;
