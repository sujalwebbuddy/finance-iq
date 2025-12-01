import React from 'react';
import Spinner from '../Spinner';
import EmptyState from '../EmptyState';

const ChartCard = ({ title, subtitle, loading, children, emptyMessage, emptyIcon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>
      {loading ? (
        <Spinner />
      ) : emptyMessage ? (
        <EmptyState message={emptyMessage} icon={emptyIcon} />
      ) : (
        children
      )}
    </div>
  );
};

export default ChartCard;

