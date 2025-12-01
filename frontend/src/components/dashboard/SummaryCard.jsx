import React from 'react';
import useCurrency from '../../hooks/useCurrency';

const SummaryCard = ({ title, value, accentColor, loading }) => {
  const { currency } = useCurrency();
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
  }).format(value);

  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-400">{title}</h3>
        <div className={`w-1 h-8 rounded-full ${accentColor}`} />
      </div>
      {loading ? (
        <div className="mt-2 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      ) : (
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{formattedValue}</p>
      )}
    </div>
  );
};

export default SummaryCard;

