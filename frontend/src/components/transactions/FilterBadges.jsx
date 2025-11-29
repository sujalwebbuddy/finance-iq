import React from 'react';
import CloseIcon from '../icons/CloseIcon';

const FilterBadges = ({ filters, onClear, onRemoveFilter }) => {
  const badgeConfigs = [
    {
      key: 'searchTerm',
      condition: filters.searchTerm,
      label: `"${filters.searchTerm}"`,
      onRemove: () => onRemoveFilter('searchTerm'),
    },
    {
      key: 'typeFilter',
      condition: filters.typeFilter !== 'all',
      label: filters.typeFilter === 'income' ? 'Income' : filters.typeFilter === 'expense' ? 'Expense' : '',
      onRemove: () => onRemoveFilter('typeFilter'),
    },
    {
      key: 'categoryFilter',
      condition: filters.categoryFilter !== 'all',
      label: filters.categoryFilter,
      onRemove: () => onRemoveFilter('categoryFilter'),
    },
    {
      key: 'dateFrom',
      condition: filters.dateFrom,
      label: `From: ${new Date(filters.dateFrom).toLocaleDateString()}`,
      onRemove: () => onRemoveFilter('dateFrom'),
    },
    {
      key: 'dateTo',
      condition: filters.dateTo,
      label: `To: ${new Date(filters.dateTo).toLocaleDateString()}`,
      onRemove: () => onRemoveFilter('dateTo'),
    },
  ];

  const activeBadges = badgeConfigs.filter((badge) => badge.condition);

  if (activeBadges.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-between items-center gap-3 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Active:</span>
        {activeBadges.map((badge) => (
          <span
            key={badge.key}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-600 dark:border-teal-700"
          >
            {badge.label}
            <button
              onClick={badge.onRemove}
              className="ml-0.5 p-0.5 hover:bg-teal-100 dark:hover:bg-teal-800 rounded-full transition-colors"
              aria-label={`Remove ${badge.label} filter`}
            >
              <CloseIcon className="h-3 w-3 text-teal-600 dark:text-teal-400" />
            </button>
          </span>
        ))}
      </div>
      <button
        onClick={onClear}
        className="px-3 py-1 bg-red-500 dark:bg-red-600 text-white text-xs rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBadges;

