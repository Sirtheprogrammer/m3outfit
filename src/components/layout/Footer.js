import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://i.ibb.co/tTXNZ4ML/Simple-M-Letter-Logo-1.jpg"
                alt="M3 Outfit Logo"
                className="h-10 w-10 object-contain"
              />
              <h3 className="text-2xl font-bold text-primary tracking-wider">M3 OUTFIT</h3>
            </div>
            <p className="text-gray-300">
              Find Your Fit. Rule the Trend.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-primary">
                  PRODUCTS
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-primary">
                  CART
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">CUSTOMER SERVICE</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary">
                  CONTACT US
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-primary">
                  SHIPPING INFO
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-primary">
                  RETURNS
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">STAY UPDATED</h4>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="input bg-gray-700 text-white placeholder-gray-400"
              />
              <button type="submit" className="btn btn-primary w-full">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} M3 OUTFIT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 