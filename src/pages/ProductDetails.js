import React from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingBagIcon, HeartIcon, StarIcon } from '@heroicons/react/20/solid';
import { CurrencyDollarIcon, TruckIcon } from '@heroicons/react/24/outline';

const ProductDetails = () => {
  const { id } = useParams();

  // Placeholder product data - replace with actual fetch later
  const product = {
    name: 'Sample Product',
    category: 'T-Shirts',
    price: 29.99,
    description: 'This is a high-quality sample product description. It provides details about the material, fit, and style.',
    image: 'https://via.placeholder.com/400x600', // Placeholder image
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviews: 120,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-dark mb-2">{product.name}</h1>
          <p className="text-sm text-gray-600 mb-4">{product.category}</p>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-gray-600 text-sm ml-2">({product.reviews} reviews)</span>
          </div>

          <p className="text-2xl font-semibold text-primary mb-6 flex items-center">
            <CurrencyDollarIcon className="h-6 w-6 mr-1" />
            {product.price.toFixed(2)}
          </p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <label className="block text-dark text-sm font-semibold mb-2">Size:</label>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
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

          {/* Shipping Info */}
          <div className="mt-8 flex items-center text-gray-600 text-sm">
            <TruckIcon className="h-5 w-5 mr-2" />
            <span>Free shipping on orders over $50</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 