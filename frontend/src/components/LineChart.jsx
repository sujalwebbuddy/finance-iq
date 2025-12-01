'use client';

import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useCurrency from '../hooks/useCurrency';
import { chartColors } from '../config/chartColors';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const hexToRgba = (hex, alpha = 0.7) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const LineChart = ({ data, theme, label }) => {
  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  const { currency } = useCurrency();
  const chartData = useMemo(() => {
    const allDates = data.map((d) => d.date);
    const uniqueDates = [...new Set(allDates)].sort();

    const dataMap = new Map(data.map((d) => [d.date, d.total]));

    const isIncome = label?.toLowerCase().includes('income');
    const primaryColor = isIncome ? chartColors.tertiary : chartColors.primary;

    return {
      labels: uniqueDates.map((date) => new Date(date).toDateString().slice(4, 10)),
      datasets: [
        {
          label: label || 'Amount',
          data: uniqueDates.map((date) => dataMap.get(date) || 0),
          borderColor: hexToRgba(primaryColor, 0.8),
          backgroundColor: hexToRgba(primaryColor, 0.2),
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [data, label]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 8, right: 8, bottom: 28, left: 8 } },
      plugins: {
        legend: {
          labels: { color: textColor },
        },
        title: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.parsed.y;
              return `${context.dataset.label}: ${currency.symbol}${value.toLocaleString()}`;
            },
          },
        },
      },
      scales: {
        y: {
          ticks: {
            color: textColor,
            callback: function(value) {
              return currency.symbol + value;
            }
          },
          grid: { color: gridColor },
          title: {
            display: true,
            text: 'Amount',
            color: textColor,
            font: { size: 12, weight: '500' },
          },
        },
        x: {
          ticks: { color: textColor },
          grid: { color: gridColor },
          title: {
            display: true,
            text: 'Time Period',
            color: textColor,
            font: { size: 12, weight: '500' },
          },
        },
      },
    }),
    [textColor, gridColor, currency]
  );

  return <Line data={chartData} options={options} />;
};

export default LineChart;

