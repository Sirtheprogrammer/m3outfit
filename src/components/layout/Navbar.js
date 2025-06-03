import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import Profile from '../Profile';
import { 
  ShoppingCartIcon, 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!user) return;
      
      try {
        const cartRef = doc(db, 'carts', user.uid);
        const itemsRef = collection(cartRef, 'items');
        const itemsSnapshot = await getDocs(itemsRef);
        setCartCount(itemsSnapshot.size);
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartCount();
  }, [user]);

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Products', href: '/products', icon: ShoppingBagIcon },
    { name: 'Categories', href: '/categories', icon: ShoppingBagIcon },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://i.ibb.co/tTXNZ4ML/Simple-M-Letter-Logo-1.jpg"
                alt="M3 Outfit Logo"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-2xl font-bold text-primary">M3 Outfit</span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex md:ml-10 md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary"
                >
                  <item.icon className="h-5 w-5 mr-1" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Desktop */}
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="hidden md:flex items-center px-3 py-2 text-sm font-medium text-primary hover:text-primary-dark"
                    >
                      <Cog6ToothIcon className="h-5 w-5 mr-1" />
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to="/wishlist"
                    className="text-gray-600 hover:text-primary p-2"
                  >
                    <HeartIcon className="h-6 w-6" />
                  </Link>
                  <Link
                    to="/cart"
                    className="relative text-gray-600 hover:text-primary p-2"
                  >
                    <ShoppingCartIcon className="h-6 w-6" />
                    {cartCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <Profile />
                </>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {/* Search Bar - Mobile */}
            <div className="px-4 py-2">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Mobile Navigation Links */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            ))}

            {/* Mobile Admin Link */}
            {user?.isAdmin && (
              <Link
                to="/admin"
                className="flex items-center px-4 py-2 text-base font-medium text-primary hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                Admin Panel
              </Link>
            )}

            {/* Mobile User Actions */}
            {!user && (
              <div className="px-4 py-2">
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 