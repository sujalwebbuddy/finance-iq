import React from 'react';
import CheckmarkIcon from '../icons/CheckmarkIcon';

const PlanSelector = ({ currentPlan, onSelectPlan, loading }) => {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '50 transactions/month',
        '3 budgets',
        '2 recurring transactions',
        'Basic analytics',
      ],
      color: 'border-gray-300 dark:border-gray-600',
      bgColor: 'bg-gray-50 dark:bg-gray-800',
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '$9',
      period: 'month',
      features: [
        '500 transactions/month',
        '10 receipt OCR uploads/month',
        '10 budgets',
        '10 recurring transactions',
        '5 exports/month',
        'Receipt OCR',
      ],
      color: 'border-blue-400 dark:border-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      popular: true,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$29',
      period: 'month',
      features: [
        'Unlimited transactions',
        'Unlimited receipt OCR',
        'Unlimited budgets',
        'Unlimited recurring transactions',
        'Unlimited exports',
        'Advanced analytics',
        'API access',
        'Priority support',
      ],
      color: 'border-purple-400 dark:border-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Everything in Pro',
        'SSO support',
        'White-label options',
        'Dedicated support',
        'Custom integrations',
      ],
      color: 'border-green-400 dark:border-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {plans.map((plan) => {
        const isCurrentPlan = currentPlan === plan.id;
        const isUpgrade = ['basic', 'pro'].includes(plan.id);

        return (
          <div
            key={plan.id}
            className={`relative rounded-xl border-2 p-6 transition-all ${
              isCurrentPlan
                ? `${plan.color} ${plan.bgColor} ring-2 ring-offset-2 ring-opacity-50`
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg'
            } ${plan.popular ? 'md:scale-105' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Popular
                </span>
              </div>
            )}

            {isCurrentPlan && (
              <div className="absolute top-4 right-4">
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  Current
                </span>
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {plan.name}
              </h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                    /{plan.period}
                  </span>
                )}
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckmarkIcon className="w-5 h-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {isCurrentPlan ? (
              <button
                disabled
                className="w-full px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-sm font-semibold cursor-not-allowed"
              >
                Current Plan
              </button>
            ) : isUpgrade ? (
              <button
                onClick={() => onSelectPlan(plan.id)}
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Processing...' : 'Upgrade'}
              </button>
            ) : (
              <button
                disabled
                className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg text-sm font-semibold cursor-not-allowed"
              >
                Contact Sales
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlanSelector;

