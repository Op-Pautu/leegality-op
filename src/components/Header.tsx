import { useState, useEffect } from 'react';
import { Menu, Search, ShoppingCart, Clock, User } from 'lucide-react';
import { useFilters } from '../context/FilterContext';
import { useDebounce } from '../hooks/useDebounce';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { state, dispatch } = useFilters();
  const [inputValue, setInputValue] = useState(state.searchQuery);
  const debouncedSearch = useDebounce(inputValue, 400);
  const navigate = useNavigate();
  const location = useLocation();
  const onDetailPage = location.pathname.startsWith('/product/');

  useEffect(() => {
    if (debouncedSearch === state.searchQuery) return;
    dispatch({ type: 'SET_SEARCH', payload: debouncedSearch });

    if (onDetailPage && debouncedSearch) navigate('/');
  }, [debouncedSearch]);

  return (
    <header className="bg-[#1a2332] h-[72px] flex items-center px-6 sticky top-0 z-40 justify-between">
      <button
        onClick={onMenuClick}
        className="text-white p-2 rounded hover:bg-white/10 transition-colors shrink-0"
        aria-label="Open filters"
      >
        <Menu size={24} strokeWidth={2} />
      </button>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search products..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-white text-[#111827] text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#2d6bcf]/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button className="text-white p-2 rounded hover:bg-white/10 transition-colors relative shrink-0" aria-label="Cart">
          <ShoppingCart size={22} strokeWidth={2} />
          <span className="absolute top-0 right-0 w-5 h-5 bg-[#2d6bcf] rounded-full text-[10px] font-semibold text-white flex items-center justify-center">3</span>
        </button>
        <button className="text-white p-2 rounded hover:bg-white/10 transition-colors shrink-0" aria-label="History">
          <Clock size={22} strokeWidth={2} />
        </button>
        <button className="text-white p-2 rounded hover:bg-white/10 transition-colors shrink-0" aria-label="Account">
          <User size={22} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
};

export default Header;
