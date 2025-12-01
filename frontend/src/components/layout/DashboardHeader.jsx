import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '../icons/LogoIcon';
import DashboardNav from './DashboardNav';
import ThemeToggle from '../ThemeToggle';
import CurrencySelector from '../CurrencySelector';
import { APP_NAME } from '../../config/app';

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 text-gray-900 dark:text-white hover:opacity-80 transition-opacity"
            >
              <LogoIcon className="h-7 w-7 text-green-500 dark:text-green-400" />
              <span className="text-2xl font-bold">{APP_NAME}</span>
            </button>
            <DashboardNav />
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <CurrencySelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

