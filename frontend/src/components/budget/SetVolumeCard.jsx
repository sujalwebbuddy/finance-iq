import React, { useState } from 'react';
import AngleBracketsIcon from '../icons/AngleBracketsIcon';

const SetVolumeCard = () => {
  const [sliderValue, setSliderValue] = useState(5600);
  const minValue = 4000;
  const maxValue = 10000;

  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US').replace(/,/g, '.')}`;
  };

  const getDisplayValues = () => {
    const current = sliderValue;
    const step = (maxValue - minValue) / 2;
    const top = Math.min(maxValue, current + step);
    const bottom = Math.max(minValue, current - step);
    return {
      top: formatCurrency(top * 1000),
      middle: formatCurrency(current * 1000),
      bottom: formatCurrency(bottom * 1000),
    };
  };

  const displayValues = getDisplayValues();
  const sliderPercentage = ((sliderValue - minValue) / (maxValue - minValue)) * 100;

  const handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value, 10));
  };

  return (
    <div className="relative bg-white rounded-2xl p-6 flex-1">
      <div className="absolute -top-3 left-6 bg-gray-800 dark:bg-gray-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg z-10">
        Set Volume
      </div>

      <div className="relative h-24 flex flex-col items-center justify-center mt-2">
        <div className="text-base font-bold text-gray-300 dark:text-gray-500 mb-0.5">
          {displayValues.top}
        </div>
        <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white my-1">
          {displayValues.middle}
        </div>
        <div className="text-base font-bold text-gray-300 dark:text-gray-500 mt-0.5">
          {displayValues.bottom}
        </div>
      </div>

      <div className="relative w-full mb-4 py-4">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-600 rounded-full -translate-y-1/2">
          <div
            className="h-1 bg-gray-400 dark:bg-gray-400 rounded-full transition-all duration-150"
            style={{ width: `${sliderPercentage}%` }}
          />
        </div>

        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={sliderValue}
          onChange={handleSliderChange}
          step="100"
          className="custom-range-slider absolute top-1/2 left-0 right-0 w-full h-1 bg-transparent cursor-pointer appearance-none -translate-y-1/2 z-10"
        />

        <div
          className="absolute top-1/2 -translate-y-1/2 bg-gray-900 dark:bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-150 shadow-lg pointer-events-none z-20"
          style={{ left: `calc(${sliderPercentage}% - 20px)` }}
        >
          <AngleBracketsIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default SetVolumeCard;

