import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  ShoppingCartIcon, 
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-3">
              <img
                src="https://i.ibb.co/tTXNZ4ML/Simple-M-Letter-Logo-1.jpg"
                alt="M3 Outfit Logo"
                className="h-12 w-12 object-contain rounded-full ring-2 ring-primary/20"
              />
              <span className="text-2xl font-bold text-primary tracking-wider">M3 OUTFIT</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-dark hover:text-primary font-medium flex items-center space-x-1">
              <HomeIcon className="h-5 w-5" />
              <span>HOME</span>
            </Link>
            <Link to="/products" className="text-dark hover:text-primary font-medium flex items-center space-x-1">
              <ShoppingBagIcon className="h-5 w-5" />
              <span>PRODUCTS</span>
            </Link>
            <Link to="/cart" className="text-dark hover:text-primary font-medium flex items-center space-x-1">
              <ShoppingCartIcon className="h-5 w-5" />
              <span>CART</span>
            </Link>
            <Link to="/login" className="btn btn-primary font-medium flex items-center space-x-1">
              <UserIcon className="h-5 w-5" />
              <span>LOGIN</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-dark hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-dark hover:text-primary font-medium flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <HomeIcon className="h-5 w-5" />
              <span>HOME</span>
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-dark hover:text-primary font-medium flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBagIcon className="h-5 w-5" />
              <span>PRODUCTS</span>
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md text-dark hover:text-primary font-medium flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span>CART</span>
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-dark hover:text-primary font-medium flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserIcon className="h-5 w-5" />
              <span>LOGIN</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 