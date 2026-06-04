import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useFilters } from '../context/FilterContext';

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

  const stars = Math.round(product.rating || 0);

  return (
    <div
      onClick={handleClick}
      className="bg-white h-full rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden flex flex-col border border-gray-200 hover:border-orange-400"
    >
      {/* Image Container */}
      <div className="bg-white h-56 flex items-center justify-center overflow-hidden border-b border-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-4/5 h-4/5 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/240x240?text=Image';
          }}
        />
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10 leading-5">
          {product.title}
        </h3>

        {/* Price and Rating */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(0)}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${i < stars ? 'text-orange-400' : 'text-gray-300'
                  }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.rating?.toFixed(1)})</span>
        </div>

        {/* Brand/Category */}
        {product.brand && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-1">
            Brand: {product.brand}
          </p>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="mt-auto w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-full transition-colors text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
