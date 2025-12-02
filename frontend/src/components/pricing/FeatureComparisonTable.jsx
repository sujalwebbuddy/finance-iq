import React from 'react';
import CheckmarkIcon from '../icons/CheckmarkIcon';

const FeatureComparisonTable = () => {
  const features = [
    {
      name: 'Transaction Management',
      free: true,
      basic: true,
      pro: true,
      enterprise: true,
    },
    {
      name: 'Budget Tracking',
      free: true,
      basic: true,
      pro: true,
      enterprise: true,
    },
    {
      name: 'Receipt OCR (AI-powered)',
      free: false,
      basic: '10/month',
      pro: 'Unlimited',
      enterprise: 'Unlimited',
    },
    {
      name: 'Recurring Transactions',
      free: '2',
      basic: '10',
      pro: 'Unlimited',
      enterprise: 'Unlimited',
    },
    {
      name: 'Data Export',
      free: false,
      basic: '5/month',
      pro: 'Unlimited',
      enterprise: 'Unlimited',
    },
    {
      name: 'Advanced Analytics',
      free: false,
      basic: false,
      pro: true,
      enterprise: true,
    },
    {
      name: 'Priority Support',
      free: false,
      basic: false,
      pro: true,
      enterprise: true,
    },
    {
      name: 'SSO Support',
      free: false,
      basic: false,
      pro: false,
      enterprise: true,
    },
    {
      name: 'White-label Options',
      free: false,
      basic: false,
      pro: false,
      enterprise: true,
    },
  ];

  const renderFeatureValue = (value) => {
    if (value === true) {
      return (
        <CheckmarkIcon className="w-5 h-5 text-green-500 dark:text-green-400 mx-auto" />
      );
    }
    if (value === false) {
      return <span className="text-gray-400 dark:text-gray-600">—</span>;
    }
    return (
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {value}
      </span>
    );
  };

  return (
    <section className="py-16 px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Compare Plans
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            See what&apos;s included in each plan
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Features
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Free
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Basic
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Pro
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                    {feature.name}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {renderFeatureValue(feature.free)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {renderFeatureValue(feature.basic)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {renderFeatureValue(feature.pro)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {renderFeatureValue(feature.enterprise)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparisonTable;

