import React from 'react';
import TShirtIcon from '../icons/TShirtIcon';
import ShoeIcon from '../icons/ShoeIcon';
import BurgerIcon from '../icons/BurgerIcon';

const ExpenseList = () => {
  const expenses = [
    { icon: <TShirtIcon className="h-5 w-5" />, amount: '$250,00', color: 'text-blue-500' },
    { icon: <ShoeIcon className="h-5 w-5" />, amount: '$371,50', color: 'text-red-500' },
    { icon: <BurgerIcon className="h-5 w-5" />, amount: '$97,99', color: 'text-orange-500' },
  ];

  return (
    <div className="w-full space-y-3">
      {expenses.map((expense, index) => (
        <div
          key={index}
          className="bg-gray-800 dark:bg-gray-700 rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className={expense.color}>{expense.icon}</div>
            <span className="text-white font-semibold">{expense.amount}</span>
          </div>
          <div className="w-16 h-1 bg-gray-600 rounded-full opacity-50" />
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;

