import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useFilters } from '../context/FilterContext';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { state } = useFilters();

  const handleClick = () => {
    navigate(`/product/${product.id}`, { state: { filters: state } });
  };

  return (
    <div
      className="bg-white rounded-xl border border-[#e5e7eb] p-4 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="flex items-center justify-center h-44 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=Image';
          }}
        />
      </div>

      {/* Name */}
      <h3 className="text-[15px] font-semibold text-[#111827] leading-snug line-clamp-2">
        {product.title}
      </h3>

      {/* Price + rating */}
      <div className="flex flex-col gap-1 mt-auto">
        <span className="text-[15px] font-bold text-[#111827]">
          ${product.price.toFixed(2)}
        </span>
        <StarRating rating={product.rating} />
      </div>
    </div>
  );
};

export default ProductCard;
