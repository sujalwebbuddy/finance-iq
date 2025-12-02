import React from 'react';
import CheckmarkIcon from '../icons/CheckmarkIcon';

const PricingHero = () => {
  return (
    <section className="py-16 lg:py-24 px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Simple, transparent{' '}
          <span className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
            pricing
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Choose the perfect plan for your financial management needs. Start
          free and upgrade anytime.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <CheckmarkIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
            <span>No credit card required</span>
          </div>
          <span className="mx-2">•</span>
          <div className="flex items-center gap-1">
            <CheckmarkIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
            <span>Cancel anytime</span>
          </div>
          <span className="mx-2">•</span>
          <div className="flex items-center gap-1">
            <CheckmarkIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;

