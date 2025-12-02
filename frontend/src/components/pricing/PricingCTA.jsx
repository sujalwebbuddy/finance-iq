import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ArrowRightIcon from '../icons/ArrowRightIcon';

const PricingCTA = () => {
  const { user } = useAuth();

  return (
    <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to get started?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Join thousands of users managing their finances with Paisable
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Go to Dashboard
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;

