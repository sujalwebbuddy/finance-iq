import React from 'react';
import CheckmarkIcon from '../icons/CheckmarkIcon';

const CurrencyOption = ({ currency, isSelected, onSelect }) => {
  return (
    <label
      className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-teal-500 dark:border-teal-400 bg-teal-50 dark:bg-teal-900/20 shadow-md'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
      }`}
    >
      <input
        type="radio"
        name="currency"
        value={currency.code}
        checked={isSelected}
        onChange={onSelect}
        className="sr-only"
      />
      <div className="flex items-center gap-4 w-full">
        <span className="text-3xl">{currency.flag}</span>
        <div className="flex-1">
          <div className="font-semibold text-gray-900 dark:text-white">
            {currency.name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {currency.code} • {currency.symbol}
          </div>
        </div>
        {isSelected && (
          <div className="w-5 h-5 rounded-full bg-teal-500 dark:bg-teal-400 flex items-center justify-center flex-shrink-0">
            <CheckmarkIcon className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
    </label>
  );
};

export default CurrencyOption;

