import React from 'react';
import { APP_NAME } from '../../config/app';

const SetupHero = ({ userEmail }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Welcome to {APP_NAME}!
      </h1>
      <p className="text-base text-gray-600 dark:text-gray-400">
        Welcome, {userEmail}! Let's set up your account.
      </p>
    </div>
  );
};

export default SetupHero;

