import React from 'react';
import useResize from '../../hooks/useResize';
import PlusIcon from '../icons/PlusIcon';
import DownloadIcon from '../icons/DownloadIcon';
import TrashIcon from '../icons/TrashIcon';

const TransactionHeader = ({
  selectedCount,
  onBulkDelete,
  onAddTransaction,
  onManageCategories,
  onExportCSV,
}) => {
  const isMobile = useResize(768);

  const actionButtons = [
    {
      label: 'Manage Categories',
      shortLabel: 'Categories',
      onClick: onManageCategories,
      className: 'bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 hover:from-gray-600 hover:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-800',
    },
    {
      label: 'Add Transaction',
      shortLabel: 'Add',
      onClick: onAddTransaction,
      icon: <PlusIcon className="h-5 w-5" />,
      className: 'bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 hover:from-teal-600 hover:to-teal-700 dark:hover:from-teal-700 dark:hover:to-teal-800',
    },
    {
      label: 'Export to CSV',
      shortLabel: 'Export',
      onClick: onExportCSV,
      icon: <DownloadIcon className="h-5 w-5" />,
      className: 'bg-gradient-to-r from-teal-400 to-teal-500 dark:from-teal-500 dark:to-teal-600 hover:from-teal-500 hover:to-teal-600 dark:hover:from-teal-600 dark:hover:to-teal-700',
      title: 'Export all transactions to CSV',
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {selectedCount > 0 && (
          <button
            onClick={onBulkDelete}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">
              {isMobile ? `Del (${selectedCount})` : `Delete (${selectedCount})`}
            </span>
          </button>
        )}
        {actionButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg text-white text-sm sm:text-base ${button.className}`}
            title={button.title}
          >
            {button.icon}
            <span>{isMobile ? button.shortLabel : button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionHeader;

