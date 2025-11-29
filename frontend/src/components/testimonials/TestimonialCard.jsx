import React from 'react';


const TestimonialCard = ({ quote, name, title, avatar }) => {
  return (
    <div className="bg-gray-700 dark:bg-gray-800 rounded-2xl p-6 lg:p-8 text-white">
      <p className="text-base lg:text-lg mb-6 leading-relaxed">{quote}</p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-600 dark:bg-gray-500 flex-shrink-0 overflow-hidden">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-lg font-semibold">
              {name.charAt(0)}
            </div>
          )}
        </div>
        
        <div>
          <div className="font-semibold text-white mb-1">{name}</div>
          <div className="text-sm text-gray-300 dark:text-gray-400">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

