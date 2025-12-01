import React from 'react';

const BudgetProgressBar = ({ percent }) => {
  const getProgressColor = () => {
    if (percent < 80) return 'bg-green-500 dark:bg-green-400';
    if (percent < 100) return 'bg-yellow-500 dark:bg-yellow-400';
    return 'bg-red-600 dark:bg-red-500';
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-1">
        <div
          className={`h-3 rounded-full transition-all duration-300 ${getProgressColor()}`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">{percent.toFixed(1)}%</span>
    </div>
  );
};

export default BudgetProgressBar;

