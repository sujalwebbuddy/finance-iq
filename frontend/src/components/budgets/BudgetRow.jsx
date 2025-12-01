import React from 'react';
import useCurrency from '../../hooks/useCurrency';
import BudgetProgressBar from './BudgetProgressBar';
import TrashIcon from '../icons/TrashIcon';

const BudgetRow = ({ budget, spent, onDelete }) => {
  const { currency } = useCurrency();
  const remaining = budget.amount - spent;
  const percent = Math.min((spent / budget.amount) * 100, 100);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
    }).format(amount);
  };

  return (
    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
        {budget.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700 dark:text-gray-300">
        {budget.month}/{budget.year}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
        {formatCurrency(budget.amount)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600 dark:text-red-400">
        {formatCurrency(spent)}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
          remaining >= 0
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}
      >
        {formatCurrency(remaining)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap w-1/3">
        <BudgetProgressBar percent={percent} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onDelete(budget._id)}
          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors flex items-center gap-1"
        >
          <TrashIcon className="h-4 w-4" />
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BudgetRow;

