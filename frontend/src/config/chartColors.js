export const chartColors = {
  primary: '#256274',
  secondary: '#F8B774',
  tertiary: '#8CC4B7',
  quaternary: '#6F8580',
  quinary: '#D1D2D4',
  senary: '#8CC4B7',
};

export const chartColorPalette = [
  chartColors.primary,
  chartColors.secondary,
  chartColors.tertiary,
  chartColors.quaternary,
  chartColors.quinary,
  chartColors.senary,
];

export const getChartColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(chartColorPalette[i % chartColorPalette.length]);
  }
  return colors;
};

export default chartColors;

