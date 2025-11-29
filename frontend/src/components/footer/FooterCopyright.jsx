import React from 'react';
import { APP_NAME } from '../../config/app';

const FooterCopyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
      <p className="text-center text-base text-gray-500 dark:text-gray-400">
        © Copyright {currentYear} {APP_NAME}. All rights reserved.
      </p>
    </div>
  );
};

export default FooterCopyright;

