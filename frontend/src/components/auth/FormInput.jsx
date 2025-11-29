import React from 'react';

const FormInput = ({ 
  type = 'text', 
  id, 
  value, 
  onChange, 
  placeholder, 
  error, 
  icon: Icon,
  className = '',
  required = false,
  ...props 
}) => {
  const baseClasses = 'w-full pl-10 pr-4 py-3 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200';
  const errorClasses = error 
    ? 'border-red-500 focus:ring-red-500' 
    : 'border-gray-300 dark:border-gray-600 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent';
  
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
        </div>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      />
    </div>
  );
};

export default FormInput;

