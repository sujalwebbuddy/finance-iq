import React from 'react';
import LineChart from '../LineChart';
import ChartCard from './ChartCard';
import TrendUpIcon from '../icons/TrendUpIcon';

const LineChartCard = ({ title, subtitle, data, theme, loading }) => {
  const emptyMessage = data?.length === 0 
    ? `Add transactions to track your ${title.toLowerCase()}`
    : null;

  return (
    <ChartCard
      title={title}
      subtitle={subtitle}
      loading={loading}
      emptyMessage={emptyMessage}
      emptyIcon={<TrendUpIcon className="h-12 w-12 text-teal-500 dark:text-teal-400" />}
    >
      <div className="h-[400px]">
        {data?.length > 0 && <LineChart label={title} data={data} theme={theme} />}
      </div>
    </ChartCard>
  );
};

export default LineChartCard;

