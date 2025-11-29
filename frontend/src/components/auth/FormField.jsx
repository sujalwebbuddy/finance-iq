import React from 'react';

const FormField = ({ label, id, error, children, required = false }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 mt-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;

