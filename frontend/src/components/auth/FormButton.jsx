import React from 'react';
import ArrowUpRightIcon from '../icons/ArrowUpRightIcon';

const FormButton = ({ 
  type = 'submit', 
  isLoading = false, 
  children, 
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'w-full px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 dark:hover:from-teal-700 dark:hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';
  
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {children}
        </>
      ) : (
        <>
          {children}
          <ArrowUpRightIcon className="h-5 w-5" />
        </>
      )}
    </button>
  );
};

export default FormButton;

