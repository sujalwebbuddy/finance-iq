import React from 'react';
import CloseIcon from '../icons/CloseIcon';

const ErrorNotification = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 animate-shake">
      <div className="flex items-center justify-between">
        <p className="text-sm text-red-600 dark:text-red-400 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
          aria-label="Close error"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ErrorNotification;

