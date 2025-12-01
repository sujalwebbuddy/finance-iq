import React from 'react';

const UsageMeter = ({ label, current, limit, unit = '' }) => {
  const isUnlimited = limit === -1;
  const percentage = isUnlimited ? 0 : Math.min(100, (current / limit) * 100);
  const isNearLimit = !isUnlimited && percentage >= 80;
  const isAtLimit = !isUnlimited && percentage >= 100;

  const formatValue = (value) => {
    if (value === -1) return 'Unlimited';
    return value.toLocaleString();
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span
          className={`text-sm font-semibold ${
            isAtLimit
              ? 'text-red-600 dark:text-red-400'
              : isNearLimit
              ? 'text-yellow-600 dark:text-yellow-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          {formatValue(current)} / {formatValue(limit)} {unit}
        </span>
      </div>
      {!isUnlimited && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isAtLimit
                ? 'bg-red-500 dark:bg-red-600'
                : isNearLimit
                ? 'bg-yellow-500 dark:bg-yellow-600'
                : 'bg-blue-500 dark:bg-blue-600'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default UsageMeter;

