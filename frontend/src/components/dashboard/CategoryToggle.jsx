import React from 'react';

const CategoryToggle = ({ categoryView, onViewChange }) => {
  return (
    <div className="inline-flex rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 overflow-hidden" role="group" aria-label="Toggle category view">
      <button
        type="button"
        onClick={() => onViewChange('expense')}
        className={`px-4 py-2 text-sm font-medium transition-all ${
          categoryView === 'expense'
            ? 'bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 text-white'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
        }`}
      >
        Expense
      </button>
      <button
        type="button"
        onClick={() => onViewChange('income')}
        className={`px-4 py-2 text-sm font-medium transition-all border-l border-gray-300 dark:border-gray-600 ${
          categoryView === 'income'
            ? 'bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 text-white'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
        }`}
      >
        Income
      </button>
    </div>
  );
};

export default CategoryToggle;

