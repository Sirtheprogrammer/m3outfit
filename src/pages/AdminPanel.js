import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md h-screen fixed">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
          </div>
          <nav className="mt-4">
            <Link to="/admin" className="flex items-center px-4 py-3 text-dark hover:bg-primary hover:text-white transition-colors duration-200">
              <HomeIcon className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link to="/admin/products" className="flex items-center px-4 py-3 text-dark hover:bg-primary hover:text-white transition-colors duration-200">
              <ShoppingBagIcon className="h-5 w-5 mr-3" />
              Products
            </Link>
            <Link to="/admin/orders" className="flex items-center px-4 py-3 text-dark hover:bg-primary hover:text-white transition-colors duration-200">
              <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
              Orders
            </Link>
            <Link to="/admin/users" className="flex items-center px-4 py-3 text-dark hover:bg-primary hover:text-white transition-colors duration-200">
              <UsersIcon className="h-5 w-5 mr-3" />
              Users
            </Link>
            <Link to="/admin/settings" className="flex items-center px-4 py-3 text-dark hover:bg-primary hover:text-white transition-colors duration-200">
              <Cog6ToothIcon className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <h1 className="text-3xl font-bold text-dark mb-8 flex items-center space-x-2">
            <HomeIcon className="h-8 w-8 text-primary" />
            <span>Dashboard</span>
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CurrencyDollarIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Sales</p>
                  <p className="text-2xl font-bold text-dark">$0.00</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <ShoppingCartIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-dark">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <UsersIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-dark">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-dark mb-4 flex items-center space-x-2">
              <ClipboardDocumentListIcon className="h-6 w-6 text-primary" />
              <span>Recent Orders</span>
            </h2>
            <div className="text-center py-8">
              <ClipboardDocumentListIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 