import React from 'react';
import useCurrency from '../hooks/useCurrency';
import CheckmarkIcon from './icons/CheckmarkIcon';
import CloseIcon from './icons/CloseIcon';

const DetailRow = ({ label, value, color }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
    <span className={`text-sm font-semibold text-gray-900 dark:text-white ${color || ''}`}>{value}</span>
  </div>
);

const TransactionDetailModal = ({ isOpen, onClose, transaction }) => {
  const { currency } = useCurrency();

  if (!isOpen || !transaction) return null;

  const isIncome = transaction.isIncome;
  const amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
  }).format(transaction.cost);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Transaction Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-1">
          <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                isIncome
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
              }`}
            >
              {isIncome ? (
                <>
                  <CheckmarkIcon className="h-3 w-3 mr-1" />
                  Income
                </>
              ) : (
                'Expense'
              )}
            </span>
          </div>

          <DetailRow label="Name/Description" value={transaction.name || 'N/A'} />

          <DetailRow label="Category" value={transaction.category || 'N/A'} />

          <DetailRow
            label="Amount"
            value={`${isIncome ? '+' : '-'}${amount}`}
            color={isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
          />

          <DetailRow label="Date" value={formatDate(transaction.addedOn)} />

          {transaction.note && (
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Note:</p>
              <p className="text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                {transaction.note}
              </p>
            </div>
          )}

          {!transaction.note && (
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">No note provided.</p>
            </div>
          )}
        </div>

        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 dark:hover:from-teal-700 dark:hover:to-teal-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailModal;
