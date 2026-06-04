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
    <div className="flex justify-center items-center gap-2 mt-8 py-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
            className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => {
            dispatch({ type: 'SET_PAGE', payload: page });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-2 rounded border transition ${currentPage === page
            ? 'bg-blue-600 text-white border-blue-600'
            : 'border-gray-300 hover:bg-gray-100'
            }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => {
              dispatch({ type: 'SET_PAGE', payload: totalPages });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
