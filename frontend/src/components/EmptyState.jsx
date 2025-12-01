import React from 'react';
import ChartBarIcon from './icons/ChartBarIcon';

const EmptyState = ({ message, icon }) => {
  const DefaultIcon = icon || <ChartBarIcon className="h-12 w-12 text-teal-500 dark:text-teal-400" />;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 w-full">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-xl opacity-50" />
        <div className="relative bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-900/10 dark:to-teal-800/5 rounded-2xl p-6 border border-teal-200/50 dark:border-teal-800/30">
          {DefaultIcon}
        </div>
      </div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center max-w-xs">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;
