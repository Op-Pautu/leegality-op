import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useFilters } from '../context/FilterContext';
import { formatPrice, formatRating, truncateText } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { state } = useFilters();

  const handleClick = () => {
    navigate(`/product/${product.id}`, {
      state: { filters: state },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
    >
      <div className="relative bg-gray-200 h-40 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="size-10 object-contain p-2 hover:scale-105 transition"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Image+Unavailable';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          {truncateText(product.title, 50)}
        </h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-gray-500">
            {formatRating(product.rating)}
          </span>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
