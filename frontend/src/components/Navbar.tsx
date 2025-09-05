import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-mint-lg border-b border-mint-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-mint-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EduStream</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-mint-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-gray-700 hover:text-mint-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Courses
            </Link>
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-mint-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/cart"
                  className="text-gray-700 hover:text-mint-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  <ShoppingCartIcon className="w-5 h-5 mr-1" />
                  Cart
                </Link>
                <Link
                  to="/chat"
                  className="text-gray-700 hover:text-mint-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-1" />
                  Chat
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-mint-500 hover:bg-mint-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-mint"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-mint-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-mint-500 hover:bg-mint-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-mint"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-mint-600 p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-mint-200">
              <Link
                to="/"
                className="text-gray-700 hover:text-mint-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="text-gray-700 hover:text-mint-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-mint-600 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/cart"
                    className="text-gray-700 hover:text-mint-600 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCartIcon className="w-5 h-5 mr-2" />
                    Cart
                  </Link>
                  <Link
                    to="/chat"
                    className="text-gray-700 hover:text-mint-600 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                    Chat
                  </Link>
                </>
              )}
              <div className="border-t border-mint-200 pt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-700">
                      Welcome, {user.name}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left bg-mint-500 hover:bg-mint-600 text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-mint-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block bg-mint-500 hover:bg-mint-600 text-white px-3 py-2 rounded-md text-base font-medium transition-colors text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
