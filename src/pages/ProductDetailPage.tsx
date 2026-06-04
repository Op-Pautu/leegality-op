import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductDetail';
import { formatPrice, formatRating } from '../utils/formatters';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error, retry } = useProductDetail(id!);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ErrorMessage message={error || 'Product not found'} onRetry={retry} />
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Back to Listing
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-6"
        >
          ← Back to Listing
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="max-w-md">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-auto object-contain rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=Image+Unavailable';
                }}
              />
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {product.images.slice(0, 4).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80';
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg text-gray-600">
                  {formatRating(product.rating)}
                </span>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Brand</h3>
                  <p className="text-gray-600">{product.brand}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Category</h3>
                  <p className="text-gray-600 capitalize">{product.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Stock</h3>
                  <p className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <button
                disabled={product.stock === 0}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
