import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-slate-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          🛒 E-Commerce
        </Link>

        <div className="hidden md:flex flex-1 mx-8">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 rounded text-gray-900"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2">🛒</button>
          <button className="p-2">👤</button>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
