import React, { useState } from 'react';
import useResize from '../../hooks/useResize';
import FilterBadges from './FilterBadges';
import FilterDrawer from './FilterDrawer';
import FilterIcon from '../icons/FilterIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const TransactionFilters = ({
  searchTerm,
  typeFilter,
  categoryFilter,
  dateFrom,
  dateTo,
  categories,
  onSearchChange,
  onTypeFilterChange,
  onCategoryFilterChange,
  onDateFromChange,
  onDateToChange,
  onClearFilters,
  onRemoveFilter,
}) => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const isMobile = useResize(1024);
  const filters = {
    searchTerm,
    typeFilter,
    categoryFilter,
    dateFrom,
    dateTo,
  };

  const hasActiveFilters = searchTerm || typeFilter !== 'all' || categoryFilter !== 'all' || dateFrom || dateTo;

  const FilterInputs = ({ showLabels = false }) => (
    <>
      {showLabels ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Type
            </label>
            <select
              value={typeFilter}
              onChange={onTypeFilterChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={onCategoryFilterChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Date From
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={onDateFromChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Date To
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={onDateToChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      ) : (
        <div className="lg:col-span-8 grid grid-cols-4 gap-3">
          <div className="relative">
            <select
              value={typeFilter}
              onChange={onTypeFilterChange}
              className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDownIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={onCategoryFilterChange}
              className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDownIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 dark:text-gray-400 pointer-events-none">
              Fr:
            </span>
            <input
              type="date"
              value={dateFrom}
              onChange={onDateFromChange}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 dark:text-gray-400 pointer-events-none">
              To:
            </span>
            <input
              type="date"
              value={dateTo}
              onChange={onDateToChange}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      <div className="mb-4 bg-gray-100 dark:bg-gray-800 p-3 lg:p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 lg:flex-initial lg:w-auto">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={onSearchChange}
              className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>
          {isMobile ? (
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                hasActiveFilters
                  ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-500 dark:border-teal-600 text-teal-600 dark:text-teal-400'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              <FilterIcon className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 px-1.5 py-0.5 bg-teal-500 dark:bg-teal-600 text-white text-xs rounded-full">
                  {[typeFilter !== 'all', categoryFilter !== 'all', dateFrom, dateTo].filter(Boolean).length}
                </span>
              )}
            </button>
          ) : (
            <FilterInputs showLabels={false} />
          )}
        </div>
        <FilterBadges filters={filters} onClear={onClearFilters} onRemoveFilter={onRemoveFilter} />
      </div>

      <FilterDrawer isOpen={isFilterDrawerOpen} onClose={() => setIsFilterDrawerOpen(false)}>
        <FilterInputs showLabels={true} />
      </FilterDrawer>
    </>
  );
};

export default TransactionFilters;

