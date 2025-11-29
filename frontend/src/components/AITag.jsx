import React from 'react';
import LightningIcon from './icons/LightningIcon';
import { APP_DESCRIPTION } from '../config/app';

const AITag = () => {
  return (
    <div 
      className="relative inline-flex items-center gap-2.5 backdrop-blur-sm px-5 py-2 pl-2 rounded-full"
      style={{
        background: 'rgba(209, 250, 229, 0.7)',
      }}
    >
      <div 
        className="absolute inset-0 rounded-full opacity-0 dark:opacity-40 pointer-events-none"
        style={{
          background: 'rgba(6, 95, 70, 0.6)',
        }}
      />
      
      <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-gray-100 flex-shrink-0 scale-150 shadow-md">
        <LightningIcon className="h-3.5 w-3.5 text-orange-500 dark:text-orange-600 scale-115" />
      </div>
      
      <span className="relative text-xs font-medium text-gray-600 dark:text-gray-200">
        {APP_DESCRIPTION}
      </span>
    </div>
  );
};

export default AITag;

