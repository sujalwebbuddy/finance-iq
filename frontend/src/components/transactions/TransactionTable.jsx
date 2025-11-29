import React from 'react';
import TransactionRow from './TransactionRow';
import EmptyState from '../EmptyState';

const TransactionTable = ({
  transactions,
  currency,
  selectedTransactionIds,
  onToggleSelect,
  onSelectAll,
  onEdit,
  onDelete,
  onViewDetails,
  isFiltering,
}) => {
  const allSelected = transactions.length > 0 && selectedTransactionIds.length === transactions.length;

  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow rounded-xl overflow-x-auto border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isFiltering ? 'opacity-50 pointer-events-none' : 'opacity-100'
      }`}
    >
      {transactions.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-2 py-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded focus:ring-2 focus:ring-teal-500 hover:ring-4 hover:ring-teal-200 dark:hover:ring-teal-800 transition-all duration-200 cursor-pointer"
                  checked={allSelected}
                  disabled={transactions.length === 0}
                  onChange={onSelectAll}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Note
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction._id}
                transaction={transaction}
                currency={currency}
                isSelected={selectedTransactionIds.includes(transaction._id)}
                onSelect={() => onToggleSelect(transaction._id)}
                onEdit={onEdit}
                onDelete={onDelete}
                onViewDetails={onViewDetails}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-6">
          <EmptyState message="No Transaction done" />
        </div>
      )}
    </div>
  );
};

export default TransactionTable;

