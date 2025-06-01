import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center text-primary">
          <UserIcon className="h-10 w-10" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-dark">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or
          <Link to="/register" className="font-medium text-primary hover:text-secondary ml-1">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-1" />
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark flex items-center">
                <LockClosedIcon className="h-5 w-5 mr-1" />
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="" className="font-medium text-primary hover:text-secondary">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center space-x-2"
              >
                 <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Sign in</span>
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div>
                <button
                   onClick={() => console.log('Sign in with Google clicked')}
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-dark bg-white hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 10.179l-1.571 1.438 1.438 1.571 1.57-1.438a3.349 3.349 0 01-.006-3.142zM10 13.452a3.348 3.348 0 01-.007 3.146l1.438-1.571 1.571 1.438a6.646 6.646 0 003.132-5.516h-4.554a3.348 3.348 0 01-1.58-.997zM13.71 10.178l1.572-1.438-1.438-1.571-1.571 1.438a3.349 3.349 0 01.005 3.143zM10 6.548a3.348 3.348 0 01.007-3.146l-1.438 1.571-1.571-1.438a6.646 6.646 0 00-3.132 5.516h4.554a3.348 3.348 0 011.58.997z" />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 