import React from 'react';
import UsageMeter from './UsageMeter';

const SubscriptionCard = ({ subscription, usage, onUpgrade, loading }) => {
  const planNames = {
    free: 'Free',
    basic: 'Basic',
    pro: 'Pro',
    enterprise: 'Enterprise',
  };

  const planColors = {
    free: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    basic: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    pro: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    enterprise: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
  };

  const getStatusBadge = () => {
    if (subscription.status === 'cancelled') {
      return (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
          Cancelled
        </span>
      );
    }
    if (subscription.status === 'past_due') {
      return (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
          Past Due
        </span>
      );
    }
    if (subscription.cancelAtPeriodEnd) {
      return (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
          Cancelling at period end
        </span>
      );
    }
    return (
      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
        Active
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Subscription
          </h2>
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${planColors[subscription.plan]}`}
            >
              {planNames[subscription.plan]}
            </span>
            {getStatusBadge()}
          </div>
        </div>
        {subscription.plan !== 'enterprise' && (
          <button
            onClick={onUpgrade}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Loading...' : 'Upgrade Plan'}
          </button>
        )}
      </div>

      {subscription.currentPeriodEnd && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Current Period:</strong>{' '}
            {formatDate(subscription.currentPeriodStart)} -{' '}
            {formatDate(subscription.currentPeriodEnd)}
          </p>
        </div>
      )}

      {usage && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Usage This Month
          </h3>
          <UsageMeter
            label="Transactions"
            current={usage.transactions?.current || 0}
            limit={usage.transactions?.limit || -1}
          />
          {/* Only show Receipt Uploads if limit > 0 or unlimited */}
          {usage.receipts && (usage.receipts.limit > 0 || usage.receipts.limit === -1) && (
            <UsageMeter
              label="Receipt Uploads"
              current={usage.receipts.current || 0}
              limit={usage.receipts.limit || -1}
            />
          )}
          <UsageMeter
            label="Budgets"
            current={usage.budgets?.current || 0}
            limit={usage.budgets?.limit || -1}
          />
          <UsageMeter
            label="Recurring Transactions"
            current={usage.recurring_transactions?.current || 0}
            limit={usage.recurring_transactions?.limit || -1}
          />
          {/* Only show Exports if limit > 0 or unlimited */}
          {usage.exports && (usage.exports.limit > 0 || usage.exports.limit === -1) && (
            <UsageMeter
              label="Exports"
              current={usage.exports.current || 0}
              limit={usage.exports.limit || -1}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;

