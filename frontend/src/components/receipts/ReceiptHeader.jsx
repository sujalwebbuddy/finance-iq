import React from 'react';

const ReceiptHeader = () => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Upload Receipt
      </h1>
      <p className="text-base text-gray-600 dark:text-gray-400">
        Upload a receipt image and let AI extract transaction details automatically
      </p>
    </div>
  );
};

export default ReceiptHeader;

