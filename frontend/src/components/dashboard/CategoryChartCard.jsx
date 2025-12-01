import React from 'react';
import CategoryPieChart from '../CategoryPieChart';
import CategoryToggle from './CategoryToggle';
import ChartCard from './ChartCard';
import EmptyState from '../EmptyState';
import PieChartIcon from '../icons/PieChartIcon';

const CategoryChartCard = ({ categoryView, onViewChange, chartData, theme, loading }) => {
  const isExpense = categoryView === 'expense';
  const data = isExpense ? chartData?.expensesByCategory : chartData?.incomeByCategory;
  const title = isExpense ? 'Top Spending Categories' : 'Top Income Sources';
  const subtitle = isExpense 
    ? 'See where your money goes' 
    : 'See where your money comes from';
  const emptyMessage = isExpense 
    ? 'Add transactions to see your spending breakdown' 
    : 'Add transactions to see your income sources';
  const hasData = data?.length > 0;

  return (
    <ChartCard
      title={title}
      subtitle={subtitle}
      loading={loading}
      emptyMessage={hasData ? null : emptyMessage}
      emptyIcon={<PieChartIcon className="h-12 w-12 text-teal-500 dark:text-teal-400" />}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-end">
          <CategoryToggle categoryView={categoryView} onViewChange={onViewChange} />
        </div>
        {hasData ? (
          <CategoryPieChart data={data} theme={theme} label={title} />
        ) : null}
      </div>
    </ChartCard>
  );
};

export default CategoryChartCard;

