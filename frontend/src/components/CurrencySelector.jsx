import React, { useState, useEffect, useRef } from 'react';
import useCurrency from '../hooks/useCurrency';
import useAuth from '../hooks/useAuth';
import ChevronDownIcon from './icons/ChevronDownIcon';

const CurrencySelector = () => {
  const { currency, changeCurrency, supportedCurrencies } = useCurrency();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user?.defaultCurrency) {
      const userCurrency = supportedCurrencies.find((c) => c.code === user.defaultCurrency);
      changeCurrency(userCurrency);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code) => {
    changeCurrency(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
      >
        <span className="text-lg">{currency.flag}</span>
        <span className="font-medium text-sm text-gray-900 dark:text-white">{currency.code}</span>
        <ChevronDownIcon
          className={`h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          <ul className="py-2 max-h-64 overflow-y-auto">
            {supportedCurrencies.map((curr) => (
              <li
                key={curr.code}
                onClick={() => handleSelect(curr.code)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                  currency.code === curr.code
                    ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">{curr.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{curr.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{curr.code}</div>
                </div>
                {currency.code === curr.code && (
                  <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;