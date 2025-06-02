import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Profile from '../Profile';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              M3 Outfit
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/cart"
                  className="relative p-2 text-gray-600 hover:text-primary"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">
                    0
                  </span>
                </Link>
                <Profile />
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 