import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../icons/LogoIcon';
import { APP_NAME } from '../../config/app';

const AuthFormLayout = ({ title, subtitle, children, footerText, linkText, linkTo, showLogo = true }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {showLogo && (
          <Link 
            to="/" 
            className="flex items-center gap-2.5 mb-12 text-gray-900 dark:text-white hover:opacity-80 transition-opacity"
          >
            <LogoIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
            <span className="text-2xl font-bold">{APP_NAME}</span>
          </Link>
        )}

        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            {title && (
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {subtitle}
                  </p>
                )}
              </div>
            )}

            {children}

            {(linkText && linkTo) && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {footerText}
                </p>
                <Link 
                  to={linkTo} 
                  className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold transition-colors"
                >
                  {linkText}
                </Link>
              </div>
            )}
          </div>

          {footerText && !linkText && (
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
              {footerText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthFormLayout;

