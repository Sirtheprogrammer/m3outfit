import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import {
  ShoppingBagIcon,
  TagIcon,
  GiftIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const iconMap = {
  Jerseys: ShoppingBagIcon,
  Trousers: TagIcon,
  'T-Shirts': ShoppingBagIcon,
  Sandals: GiftIcon,
  Shoes: GiftIcon,
  Others: SparklesIcon,
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        console.log('Fetching products...', selectedCategory);
        let q = collection(db, 'products');

        if (selectedCategory) {
          q = query(q, where('category', '==', selectedCategory));
        }

        q = query(q, orderBy('createdAt', 'desc'));

        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Products fetched:', productsList);
        setProducts(productsList);
        setError('');
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        toast.error('Failed to load products. Please try again later.');
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoriesList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const formatPriceInTZS = (price) => {
    return `TZS ${parseFloat(price).toFixed(2)}`;
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (loadingProducts || loadingCategories) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Style
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover the latest trends and express yourself with M3 Outfit
            </p>
            <Link
              to="/products"
              className="btn bg-white text-primary hover:bg-opacity-90 px-8 py-3 text-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Shop by Category</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`flex items-center px-6 py-2 rounded-full shadow-sm transition-colors duration-200 flex-shrink-0
                ${selectedCategory === null ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}
              `}
            >
              <ShoppingBagIcon className="h-5 w-5 mr-2" />
              <span>All Products</span>
            </button>

            {categories.map((category) => {
              const IconComponent = iconMap[category.name] || ShoppingBagIcon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex items-center px-6 py-2 rounded-full shadow-sm transition-colors duration-200 flex-shrink-0
                    ${selectedCategory === category.id ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}
                  `}
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6 text-center">{selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.name + ' Products' : 'Latest Products'}</h2>
          {products.length === 0 ? (
            <div className="text-center text-gray-600">
              No products available for this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                    <p className="text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{formatPriceInTZS(product.price)}</span>
                      <button className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary-dark transition-colors duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home; 