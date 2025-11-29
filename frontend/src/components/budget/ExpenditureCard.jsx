import React from 'react';
import MoneyIcon from '../icons/MoneyIcon';

const ExpenditureCard = () => {
  return (
    <div className="bg-gray-800 dark:bg-gray-700 rounded-2xl text-white w-full text-center">
      <div className="flex items-center gap-3 mb-4 p-4">
        <span className="bg-gray-700 dark:bg-gray-600 text-white font-medium rounded-full w-fit flex items-center gap-4 pr-4">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center scale-120">
          <MoneyIcon className="h-6 w-6 text-yellow-500" />
        </div>
          Expenditure
        </span>
      </div>

      <div className="text-2xl font-bold mb-4">$12.600</div>

      <div className="w-full flex items-center justify-center gap-1">
      <div className="h-2 w-16 bg-gray-700 dark:bg-gray-600 rounded-full">
        </div>
          <svg width="8" height="8" viewBox="0 0 12 12">
            <path d="M6 0L12 12H0Z" fill="#ef4444" />
          </svg>
      </div>

      <div className="relative h-16 mb-2">
        <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <polyline
            points="0,50 30,45 60,40 90,35 120,30 150,25 180,20 200,15 200,60 0,60"
            fill="url(#chartGradient)"
          />
          <polyline
            points="0,50 30,45 60,40 90,35 120,30 150,25 180,20 200,15"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default ExpenditureCard;

