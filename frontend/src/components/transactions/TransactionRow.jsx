import React from 'react';
import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';

const TransactionRow = ({
  transaction,
  currency,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const formatAmount = (amount, isIncome) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
    }).format(amount);
    return `${isIncome ? '+' : '-'}${formatted}`;
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-2 py-6 text-center">
        <input
          type="checkbox"
          className="w-4 h-4 rounded focus:ring-2 focus:ring-teal-500 hover:ring-4 hover:ring-teal-200 dark:hover:ring-teal-800 transition-all duration-200 cursor-pointer"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{transaction.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{transaction.category}</td>
      <td
        className={`px-6 py-4 whitespace-nowrap font-semibold ${
          transaction.isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}
      >
        {formatAmount(transaction.cost, transaction.isIncome)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
        {new Date(transaction.addedOn).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => onViewDetails(transaction)}
          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 underline font-medium transition-colors"
        >
          Details
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(transaction)}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
            title="Edit transaction"
          >
            <EditIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(transaction._id)}
            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            title="Delete transaction"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionRow;

