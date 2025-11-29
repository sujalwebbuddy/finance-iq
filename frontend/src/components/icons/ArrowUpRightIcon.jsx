import React from 'react';

const ArrowUpRightIcon = ({ className = 'h-4 w-4' }) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 17L17 7M7 7h10v10"
      />
    </svg>
  );
};

export default ArrowUpRightIcon;

