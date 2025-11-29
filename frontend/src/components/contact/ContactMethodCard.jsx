import React from 'react';

const ContactMethodCard = ({ icon, title, description, details, action }) => {
  return (
    <a
      href={action}
      className="flex items-start p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-lg transition-all duration-200 group"
    >
      <div className="flex-shrink-0 mt-1">
        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500 dark:group-hover:bg-teal-600 group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {description}
        </p>
        <p className="text-base font-medium text-gray-900 dark:text-white">
          {details}
        </p>
      </div>
    </a>
  );
};

export default ContactMethodCard;

