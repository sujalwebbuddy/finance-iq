import React from 'react';
import ShieldIcon from '../icons/ShieldIcon';
import CheckmarkIcon from '../icons/CheckmarkIcon';

const SuccessCard = () => {
  return (
    <div className="relative">
      <div
        className="absolute -left-4 top-1/2 w-8 h-12 -translate-y-1/2 z-0"
        style={{
          background: 'linear-gradient(to left, rgb(38, 109, 98), rgb(83, 154, 121))',
          clipPath: 'polygon(100% 0, 0 20%, 0 80%, 100% 100%)',
        }}
      />

      <div className="bg-white rounded-xl p-4 flex flex-col items-center relative z-10">
        <div className="relative mb-2">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #f97316, #fb923c, #fbbf24)',
            }}
          >
            <ShieldIcon className="h-8 w-8 text-white" />
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckmarkIcon className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        <span className="text-gray-900 dark:text-white font-semibold text-sm mb-2">
          Success!
        </span>

        <div className="w-full space-y-1.5">
          <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full" />
          <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full" />
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;

