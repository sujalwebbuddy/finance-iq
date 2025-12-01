import React from 'react';
import BudgetRow from './BudgetRow';
import TargetIcon from '../icons/TargetIcon';
import EmptyState from '../EmptyState';

const BudgetTable = ({ budgets, transactions, onDelete }) => {
  const calculateSpent = (budget) => {
    if (!Array.isArray(transactions)) {
      return 0;
    }
    return transactions
      .filter((tx) => {
        const txDate = new Date(tx.addedOn);
        return (
          tx.category === budget.category &&
          txDate.getMonth() + 1 === budget.month &&
          txDate.getFullYear() === budget.year &&
          !tx.isIncome
        );
      })
      .reduce((sum, tx) => sum + tx.cost, 0);
  };

  if (budgets.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
        <EmptyState
          message="No budgets found. Create your first budget to start tracking your spending."
          icon={<TargetIcon className="h-12 w-12 text-teal-500 dark:text-teal-400" />}
        />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Month
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Spent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Remaining
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {budgets.map((budget) => {
              const spent = calculateSpent(budget);
              return (
                <BudgetRow
                  key={budget._id}
                  budget={budget}
                  spent={spent}
                  onDelete={onDelete}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetTable;

