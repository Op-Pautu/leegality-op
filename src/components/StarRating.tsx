import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count?: number | null;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, count, size = 14 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<Star key={i} size={size} className="text-[#f5a623] fill-[#f5a623]" />);
    } else if (i === fullStars + 1 && hasHalf) {
      stars.push(
        <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
          <Star size={size} className="text-[#d1d5db] fill-[#d1d5db]" />
          <span className="absolute inset-0 overflow-hidden" style={{ width: '55%' }}>
            <Star size={size} className="text-[#f5a623] fill-[#f5a623]" />
          </span>
        </span>
      );
    } else {
      stars.push(<Star key={i} size={size} className="text-[#d1d5db] fill-[#d1d5db]" />);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">{stars}</div>
      {count !== null && count !== undefined && (
        <span className="text-xs text-[#6b7280]">({rating.toFixed(1)})</span>
      )}
    </div>
  );
};

export default StarRating;
