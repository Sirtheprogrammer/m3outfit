import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../firebase/index';
import { ShoppingBagIcon, HeartIcon } from '@heroicons/react/24/outline';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {product.imageUrl && (
          <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-md" />
        )}
        <div>
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-6">${product.price}</p>
          <div className="flex space-x-4">
            <button className="flex-1 bg-primary text-white py-3 px-4 rounded-md hover:bg-secondary transition-colors duration-200 flex items-center justify-center space-x-2">
              <ShoppingBagIcon className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
            <button className="flex-1 bg-white text-dark border border-gray-300 py-3 px-4 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2">
              <HeartIcon className="h-5 w-5" />
              <span>Add to Wishlist</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 