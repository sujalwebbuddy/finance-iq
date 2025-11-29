import React from 'react';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';

const TransactionPagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    onPageChange(Math.max(page - 1, 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(page + 1, totalPages));
  };

  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className="flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        title="Previous page"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Page</span>
        <span className="px-3 py-1 bg-teal-500 dark:bg-teal-600 text-white rounded-lg font-medium">
          {page}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400">of {totalPages}</span>
      </div>

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        title="Next page"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default TransactionPagination;

