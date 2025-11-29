import React from 'react';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';

const TestimonialNavigation = ({ onPrevious, onNext, currentIndex, total, maxIndex }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous testimonial"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      
      <button
        onClick={onNext}
        disabled={currentIndex >= maxIndex}
        className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next testimonial"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default TestimonialNavigation;

