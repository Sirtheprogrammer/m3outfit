import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import {
  ShoppingBagIcon,
  TagIcon,
  GiftIcon,
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const itemsPerPage = isMobile ? 10 : 12; // 10 items for mobile, 12 for desktop

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        let q = collection(db, 'products');

        if (selectedCategory) {
          q = query(q, where('category', '==', selectedCategory));
        }

        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort products by creation date on the client side
        productsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setProducts(productsList);
        setCurrentPage(1); // Reset to first page when category changes
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
    return `TZS ${parseFloat(price).toLocaleString()}`;
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handlePageChange = (page) => {
    // First scroll to top immediately
    window.scrollTo(0, 0);
    
    // Then update the page
    setCurrentPage(page);
    
    // Finally, scroll to the products section with smooth behavior
    setTimeout(() => {
      const productsSection = document.querySelector('.products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Calculate pagination values
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

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

      <section className="py-16 products-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6 text-center">{selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.name + ' Products' : 'Latest Products'}</h2>
          {products.length === 0 ? (
            <div className="text-center text-gray-600">
              No products available for this category yet.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  {isMobile ? (
                    // Mobile pagination - Simple Next/Previous
                    <div className="flex items-center justify-between w-full max-w-xs">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center px-4 py-2 rounded-md ${
                          currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <ChevronLeftIcon className="h-5 w-5 mr-1" />
                        Previous
                      </button>
                      <span className="text-gray-600">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center px-4 py-2 rounded-md ${
                          currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        Next
                        <ChevronRightIcon className="h-5 w-5 ml-1" />
                      </button>
                    </div>
                  ) : (
                    // Desktop pagination - Full controls
                    <>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-md ${
                          currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <ChevronLeftIcon className="h-5 w-5" />
                      </button>
                      
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={`px-4 py-2 rounded-md ${
                            currentPage === index + 1
                              ? 'bg-primary text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-md ${
                          currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home; 