import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getChartColors } from '../config/chartColors';

ChartJS.register(ArcElement, Tooltip, Legend);

const hexToRgba = (hex, alpha = 0.7) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const CategoryPieChart = ({ data, theme, label = 'Expenses by Category' }) => {
  const colors = getChartColors(data.length);
  const backgroundColor = colors.map((color) => hexToRgba(color, 0.7));
  const borderColor = colors.map((color) => hexToRgba(color, 1));

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label,
        data: data.map((d) => d.total),
        backgroundColor,
        borderColor,
        borderWidth: 2,
      },
    ],
  };
  const options = useMemo(() => {
    const isDarkMode = theme === 'dark';
    const textColor = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';

    return {
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor,
            padding: 20,
          },
        },
      },
    };
  }, [theme]);

  return <Pie data={chartData} options={options} />;
};

export default CategoryPieChart;