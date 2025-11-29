import React from 'react';

const ShoeIcon = ({ className = 'h-6 w-6' }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.5 10.5c-.83 0-1.5-.67-1.5-1.5V8h-2v1c0 .83-.67 1.5-1.5 1.5S15 9.83 15 9V8h-2v1c0 .83-.67 1.5-1.5 1.5S10 9.83 10 9V8H8v1c0 .83-.67 1.5-1.5 1.5S5 9.83 5 9V8H3c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v1c0 .83.67 1.5 1.5 1.5S8 14.83 8 14v-1h2v1c0 .83.67 1.5 1.5 1.5S13 14.83 13 14v-1h2v1c0 .83.67 1.5 1.5 1.5S18 14.83 18 14v-1h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-1v1c0 .83-.67 1.5-1.5 1.5z" />
    </svg>
  );
};

export default ShoeIcon;

