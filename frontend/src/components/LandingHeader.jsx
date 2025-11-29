import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useResize from '../hooks/useResize';
import ThemeToggle from './ThemeToggle';
import LogoIcon from './icons/LogoIcon';
import HamburgerIcon from './icons/HamburgerIcon';
import CloseIcon from './icons/CloseIcon';
import ArrowUpRightIcon from './icons/ArrowUpRightIcon';

const LandingHeader = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useResize(768);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  const navItems = [
    { label: 'Management', to: '/dashboard' },
    { label: 'Capital', to: '/budgets' },
    { label: 'Resources', to: '/transactions' },
    { label: 'About', to: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-gray-900 dark:text-white hover:opacity-80 transition-opacity"
            onClick={closeMobileMenu}
          >
            <LogoIcon className="h-7 w-7 text-green-500 dark:text-green-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">FinanceIQ</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-base font-normal transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="hidden md:block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-base font-normal transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/register"
                className="hidden lg:flex items-center gap-1.5 bg-gray-900 dark:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              >
                TRY IT FREE
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <HamburgerIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />

          <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto max-h-[100vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2.5">
                <LogoIcon className="h-7 w-7 text-green-500 dark:text-green-400" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">FinanceIQ</span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                aria-label="Close menu"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col p-6 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 bg-black dark:bg-gray-800 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors mt-4"
                    onClick={closeMobileMenu}
                  >
                    TRY IT FREE
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </Link>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default LandingHeader;

