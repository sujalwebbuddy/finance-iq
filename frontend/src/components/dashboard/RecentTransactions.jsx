import React from 'react';
import useCurrency from '../../hooks/useCurrency';

const RecentTransactions = ({ transactions, loading }) => {
  const { currency } = useCurrency();

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400 mt-2">Loading transactions...</p>;
  }

  if (transactions.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">No transactions found. Add your first transaction to get started.</p>;
  }

  return (
    <ul className="mt-2 space-y-3">
      {transactions.map((tx) => (
        <li key={tx._id} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-200">{tx.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(tx.addedOn).toLocaleDateString()}</p>
          </div>
          <p className={`font-semibold ${tx.isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {tx.isIncome ? '+' : '-'}
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.code }).format(tx.cost)}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default RecentTransactions;

