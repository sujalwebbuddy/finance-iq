import React from 'react';

const AngleBracketsIcon = ({ className = 'h-5 w-5' }) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left bracket < */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12l-4-4 4-4"
      />
      {/* Right bracket > */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 12l4-4-4-4"
      />
    </svg>
  );
};

export default AngleBracketsIcon;

