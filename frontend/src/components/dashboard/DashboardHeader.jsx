import React from 'react';
import useResize from '../../hooks/useResize';
import PlusIcon from '../icons/PlusIcon';

const DashboardHeader = ({ onAddTransaction }) => {
  const isMobile = useResize(768);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
      <button
        onClick={onAddTransaction}
        className="flex items-center justify-center gap-2 px-4 py-2 font-semibold bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 hover:from-teal-600 hover:to-teal-700 dark:hover:from-teal-700 dark:hover:to-teal-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        <PlusIcon className="h-5 w-5" />
        {isMobile ? 'Add' : 'Add Transaction'}
      </button>
    </div>
  );
};

export default DashboardHeader;

