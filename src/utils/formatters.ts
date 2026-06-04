export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const formatRating = (rating: number): string => {
  const roundedRating = Math.round(rating * 10) / 10;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  let stars = '★'.repeat(fullStars);
  if (hasHalfStar) stars += '½';
  stars += '☆'.repeat(5 - Math.ceil(roundedRating));

  return `${roundedRating.toFixed(1)} ${stars}`;
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
