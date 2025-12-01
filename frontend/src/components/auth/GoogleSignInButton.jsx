import React from 'react';
import GoogleIcon from '../icons/GoogleIcon';

const GoogleSignInButton = ({ onClick, isLoading = false, text = 'Continue with Google' }) => {
  const handleClick = () => {
    if (!isLoading && onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-teal-500 rounded-full animate-spin" />
      ) : (
        <GoogleIcon className="w-5 h-5" />
      )}
      <span>{isLoading ? 'Signing in...' : text}</span>
    </button>
  );
};

export default GoogleSignInButton;

