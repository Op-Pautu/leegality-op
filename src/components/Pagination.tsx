import { useFilters } from '../context/FilterContext';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const { dispatch } = useFilters();

  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch({ type: 'SET_PAGE', payload: currentPage - 1 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch({ type: 'SET_PAGE', payload: currentPage + 1 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const pageNumbers = [];
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-12 py-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition text-gray-700 font-medium"
      >
        ← Previous
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => {
              dispatch({ type: 'SET_PAGE', payload: 1 });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-gray-700 font-medium"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => {
            dispatch({ type: 'SET_PAGE', payload: page });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-4 py-2 rounded-lg border transition font-medium ${currentPage === page
              ? 'bg-orange-400 text-white border-orange-400'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-gray-400">...</span>}
          <button
            onClick={() => {
              dispatch({ type: 'SET_PAGE', payload: totalPages });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-gray-700 font-medium"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition text-gray-700 font-medium"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
