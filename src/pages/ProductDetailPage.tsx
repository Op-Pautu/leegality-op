import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProductDetail } from '../hooks/useProductDetail';
import StarRating from '../components/StarRating';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error, retry } = useProductDetail(id!);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const previewImage = activeImage ?? (product?.images?.[0] ?? product?.thumbnail);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-16">
        <LoadingSpinner />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-16">
        <ErrorMessage message={error || 'Product not found'} onRetry={retry} />
        <button onClick={() => navigate(-1)} className="mt-4 text-[#2d6bcf] text-sm hover:underline">
          ← Back
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-[#111827] border border-[#e5e7eb] bg-white rounded-lg px-4 py-2 mb-6 hover:bg-[#f3f4f6] transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Detail card */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 sm:p-10 flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="flex flex-col gap-3 md:w-80 shrink-0">
          <div className="flex items-center justify-center bg-[#f9fafb] rounded-xl p-6 min-h-72">
            <img
              src={previewImage}
              alt={product.title}
              className="max-h-64 max-w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=Image';
              }}
            />
          </div>

          {/* Thumbnail strip */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {product.images.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-colors ${previewImage === img
                    ? 'border-[#2d6bcf]'
                    : 'border-[#e5e7eb] hover:border-gray-400'
                    }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/56'; }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 flex-1">
          <h1 className="text-2xl font-bold text-[#111827]">{product.title}</h1>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-[#111827]">${product.price.toFixed(2)}</span>
            <StarRating rating={product.rating} size={18} />
          </div>

          <div className="flex flex-col gap-1 text-sm">
            {product.brand && (
              <p>
                <span className="font-semibold text-[#111827]">Brand: </span>
                <span className="text-[#6b7280]">{product.brand}</span>
              </p>
            )}
            <p>
              <span className="font-semibold text-[#111827]">Category: </span>
              <span className="text-[#6b7280] capitalize">{product.category}</span>
            </p>
            {product.stock !== undefined && (
              <p>
                <span className="font-semibold text-[#111827]">Stock: </span>
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </p>
            )}
          </div>

          <hr className="border-[#e5e7eb]" />

          <div>
            <h2 className="text-lg font-bold text-[#111827] mb-2">Description</h2>
            <p className="text-sm text-[#6b7280] leading-relaxed">{product.description}</p>
          </div>

          <hr className="border-[#e5e7eb]" />

          {product.reviews && product.reviews.length > 0 && (
            <>
              <div>
                <h2 className="text-lg font-bold text-[#111827] mb-4">Reviews</h2>
                <div className="flex flex-col gap-5">
                  {product.reviews.map((review, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-semibold text-[#111827]">{review.reviewerName}</span>
                        <StarRating rating={review.rating} size={13} />
                      </div>
                      <p className="text-sm text-[#6b7280] leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="border-[#e5e7eb]" />
            </>
          )}

          <button
            disabled={product.stock === 0}
            className="w-full h-11 bg-[#2d6bcf] hover:bg-[#2560b8] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm mt-auto"
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
