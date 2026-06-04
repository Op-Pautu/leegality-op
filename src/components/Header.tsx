interface HeaderProps {
  onFilterClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onFilterClick }) => {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        {/* Menu Icon - opens filters on mobile */}
        <button
          onClick={onFilterClick}
          className="text-white hover:text-gray-300 transition p-1 md:hidden"
          title="Filters"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <div className="text-lg font-bold hidden sm:block">🛒 Store</div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button className="text-white hover:text-gray-300 transition p-1" title="Account">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button className="text-white hover:text-gray-300 transition p-1 relative" title="Cart">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">0</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
