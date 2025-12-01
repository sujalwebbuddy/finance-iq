import React from 'react';
import LineChart from '../LineChart';
import ChartCard from './ChartCard';

const LineChartCard = ({ title, subtitle, data, theme, loading }) => {
  const emptyMessage = data?.length === 0 
    ? `No ${title.toLowerCase()} data available. Add transactions to track your financial trends.`
    : null;

  return (
    <ChartCard
      title={title}
      subtitle={subtitle}
      loading={loading}
      emptyMessage={emptyMessage}
    >
      <div className="h-[400px]">
        {data?.length > 0 && <LineChart label={title} data={data} theme={theme} />}
      </div>
    </ChartCard>
  );
};

export default LineChartCard;

