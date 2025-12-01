import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { chartColors } from '../config/chartColors';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const hexToRgba = (hex, alpha = 0.7) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ActivityBarChart = ({ expensesData, incomeData, theme }) => {
  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  const chartData = useMemo(() => {
    const allDates = [...expensesData.map((d) => d.date), ...incomeData.map((d) => d.date)];
    const uniqueDates = [...new Set(allDates)].sort();

    const expenseMap = new Map(expensesData.map((d) => [d.date, d.total]));
    const incomeMap = new Map(incomeData.map((d) => [d.date, d.total]));

    return {
      labels: uniqueDates,
      datasets: [
        {
          label: 'Income',
          data: uniqueDates.map((date) => incomeMap.get(date) || 0),
          backgroundColor: hexToRgba(chartColors.tertiary, 0.8),
          borderRadius: 4,
        },
        {
          label: 'Expenses',
          data: uniqueDates.map((date) => expenseMap.get(date) || 0),
          backgroundColor: hexToRgba(chartColors.quaternary, 0.8),
          borderRadius: 4,
        },
      ],
    };
  }, [expensesData, incomeData]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
      plugins: {
        legend: { 
          labels: { color: textColor },
          position: 'top',
        },
        title: { display: false },
      },
    scales: {
      y: { stacked: true, ticks: { color: textColor }, grid: { color: gridColor } },
      x: { stacked: true, ticks: { color: textColor }, grid: { color: gridColor } },
    }
  }), [textColor, gridColor]);

  return <Bar options={options} data={chartData} />;
};

export default ActivityBarChart;