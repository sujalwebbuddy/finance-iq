import React from 'react';
import useCurrency from '../../hooks/useCurrency';
import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';

const RecurringTransactionRow = ({ transaction, onEdit, onDelete }) => {
  const { currency } = useCurrency();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFrequency = (frequency) => {
    const frequencyMap = {
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      annually: 'Annually',
      yearly: 'Annually',
    };
    return frequencyMap[frequency.toLowerCase()] || frequency;
  };

  return (
    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
        {transaction.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
        {transaction.category}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
          transaction.isIncome
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}
      >
        {transaction.isIncome ? '+' : '-'}
        {formatCurrency(transaction.amount)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            transaction.isIncome
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
          }`}
        >
          {transaction.isIncome ? 'Income' : 'Expense'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
        {formatFrequency(transaction.frequency)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
        {formatDate(transaction.nextDueDate)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => onEdit(transaction)}
            className="text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors flex items-center gap-1"
          >
            <EditIcon className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(transaction._id)}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors flex items-center gap-1"
          >
            <TrashIcon className="h-4 w-4" />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RecurringTransactionRow;

