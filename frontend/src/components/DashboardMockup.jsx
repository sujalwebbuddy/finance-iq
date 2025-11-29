import React from 'react';
import AITag from './AITag';
import AirplaneIcon from './icons/AirplaneIcon';
import BuildingIcon from './icons/BuildingIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import { APP_NAME } from '../config/app';

const DashboardMockup = () => {
  const progressBars = [
    {
      icon: <AirplaneIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-600 dark:text-gray-400" />,
      label: 'Travel',
      percentage: 65,
      barColor: 'bg-gray-800 dark:bg-gray-300',
    },
    {
      icon: <BuildingIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-600 dark:text-gray-400" />,
      label: 'Property',
      percentage: 40,
      barColor: 'bg-gray-400 dark:bg-gray-500',
    },
  ];

  const statistics = [
    { value: '3 Years+', description: `${APP_NAME} is already up` },
    { value: '45+', description: 'Financial companies support' },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
      {/* Gradient Background Container - Vibrant green to teal gradient */}
      <div 
        className="relative rounded-3xl p-8 lg:p-10 shadow-2xl"
        style={{
          background: 'linear-gradient(to bottom right,rgb(165, 233, 198),rgb(83, 154, 121),rgb(38, 109, 98))',
        }}
      >
        {/* Dark mode overlay */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-0 dark:opacity-30 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom right, #065f46, #047857, #134e4a)',
          }}
        />
        
        {/* AI Tag */}
        <div className="absolute top-6 left-6 z-10">
          <AITag />
        </div>

        {/* Content Layout */}
        <div className="relative mt-20 space-y-6">
          {/* Transaction Card - Top */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
              Buy e-comers
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              You&apos;re transferring
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
              $4,250,500.00
            </p>
            <div className="flex items-center gap-2.5">
              <div className="bg-orange-500 dark:bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-medium">
                General Expenses
              </div>
              <ArrowRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <div className="bg-teal-500 dark:bg-teal-600 text-white px-4 py-2 rounded-lg text-xs font-medium">
                Shopping Expenses
              </div>
            </div>
          </div>

          {/* Bottom Row: Finance Card + Statistics */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Finance Management Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg flex-1">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-5">
                Manage your finances
              </h3>
              <div className="space-y-5">
                {progressBars.map((bar, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2.5">
                        {bar.icon}
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                          {bar.label}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {bar.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`${bar.barColor} h-3 rounded-full`}
                        style={{ width: `${bar.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics - Right side */}
            <div className="flex flex-col gap-6 pt-2 md:pt-0">
              {statistics.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-3xl text-white dark:text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white dark:text-gray-900">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;

