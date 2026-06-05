import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFilters } from '../context/FilterContext';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const { dispatch } = useFilters();

  if (totalPages <= 1) return null;

  const changePage = (page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  return (
    <div className="flex items-center justify-center gap-1.5 py-8">
      <button
        onClick={() => changePage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 h-9 rounded-lg text-sm font-medium text-[#374151] hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => changePage(1)} className="w-9 h-9 rounded-lg text-sm font-semibold text-[#374151] hover:bg-gray-100 transition-colors">1</button>
          {startPage > 2 && <span className="px-1 text-gray-400 text-sm">...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${page === currentPage
              ? 'bg-[#2d6bcf] text-white shadow-sm'
              : 'text-[#374151] hover:bg-gray-100'
            }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-1 text-gray-400 text-sm">...</span>}
          <button onClick={() => changePage(totalPages)} className="w-9 h-9 rounded-lg text-sm font-semibold text-[#374151] hover:bg-gray-100 transition-colors">{totalPages}</button>
        </>
      )}

      <button
        onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 h-9 rounded-lg text-sm font-medium text-[#374151] hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
