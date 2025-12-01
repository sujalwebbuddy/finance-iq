import React from 'react';
import ActivityBarChart from '../ActivityBarChart';
import RecentTransactions from './RecentTransactions';
import ChartCard from './ChartCard';

const ActivityChartCard = ({ chartData, recentTransactions, theme, loading }) => {
  const hasData = chartData?.expensesOverTime?.length > 0 || chartData?.incomeOverTime?.length > 0;

  return (
    <ChartCard
      title="Financial Activity"
      subtitle="Daily income and expenses overview"
      loading={loading}
      emptyMessage={!hasData ? 'No activity data available. Start adding transactions to see your financial activity.' : null}
    >
      <div className="relative h-80">
        {hasData && (
          <ActivityBarChart
            expensesData={chartData.expensesOverTime}
            incomeData={chartData.incomeOverTime}
            theme={theme}
          />
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          Latest Transactions
        </h3>
        <RecentTransactions transactions={recentTransactions} loading={loading} />
      </div>
    </ChartCard>
  );
};

export default ActivityChartCard;

