import React from 'react';
import useCurrency from '../../hooks/useCurrency';
import EditIcon from '../icons/EditIcon';
import CheckmarkIcon from '../icons/CheckmarkIcon';
import ReceiptIcon from '../icons/ReceiptIcon';
import SpinnerIcon from '../icons/SpinnerIcon';

const ReceiptResult = ({ receiptResult, isSaving, onEdit, onSave }) => {
  const { currency } = useCurrency();

  if (!receiptResult) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ReceiptIcon className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-base text-gray-500 dark:text-gray-400">
            Upload a receipt to see the extracted data here
          </p>
        </div>
      </div>
    );
  }

  const extractedData = receiptResult.extractedData || {};

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
    }).format(parseFloat(amount) || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const resultFields = [
    { label: 'Merchant', value: extractedData.merchant || 'Unknown' },
    { label: 'Amount', value: formatAmount(extractedData.amount) },
    { label: 'Category', value: extractedData.category || 'Miscellaneous' },
    { label: 'Date', value: formatDate(extractedData.date) },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Extracted Information
      </h2>

      <div className="space-y-4 mb-6">
        {resultFields.map((field, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
          >
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {field.label}:
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white text-right">
              {field.value}
            </span>
          </div>
        ))}

        {extractedData.isIncome && (
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Type:
            </span>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              Income
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={onEdit}
          disabled={isSaving}
          className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <EditIcon className="h-4 w-4" />
          Edit
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 hover:from-teal-600 hover:to-teal-700 dark:hover:from-teal-700 dark:hover:to-teal-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <SpinnerIcon className="h-4 w-4 text-white" />
              Saving...
            </>
          ) : (
            <>
              <CheckmarkIcon className="h-4 w-4" />
              Save Transaction
            </>
          )}
        </button>
      </div>

      {receiptResult.fileUrl && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Receipt Image
          </h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <img
              src={receiptResult.fileUrl}
              alt="Uploaded Receipt"
              className="w-full h-auto max-h-96 object-contain bg-gray-50 dark:bg-gray-900"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptResult;

