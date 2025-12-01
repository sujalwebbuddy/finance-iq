import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SubscriptionActions = ({
  subscription,
  onCancel,
  onReactivate,
  loading,
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [reactivateLoading, setReactivateLoading] = useState(false);

  const handleCancel = async (cancelAtPeriodEnd = true) => {
    try {
      setCancelLoading(true);
      await onCancel(cancelAtPeriodEnd);
      toast.success(
        cancelAtPeriodEnd
          ? 'Subscription will be cancelled at the end of the billing period'
          : 'Subscription cancelled successfully'
      );
      setShowCancelConfirm(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to cancel subscription'
      );
    } finally {
      setCancelLoading(false);
    }
  };

  const handleReactivate = async () => {
    try {
      setReactivateLoading(true);
      await onReactivate();
      toast.success('Subscription reactivated successfully');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to reactivate subscription'
      );
    } finally {
      setReactivateLoading(false);
    }
  };

  if (subscription.status === 'cancelled' || subscription.cancelAtPeriodEnd) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Reactivate Subscription
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Your subscription has been cancelled. You can reactivate it to continue
          using premium features.
        </p>
        <button
          onClick={handleReactivate}
          disabled={reactivateLoading || loading}
          className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 transition-colors"
        >
          {reactivateLoading ? 'Reactivating...' : 'Reactivate Subscription'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Manage Subscription
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Cancel your subscription. You can reactivate it anytime before the end
        of your billing period.
      </p>

      {!showCancelConfirm ? (
        <button
          onClick={() => setShowCancelConfirm(true)}
          disabled={loading}
          className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-700 dark:hover:bg-red-600 disabled:opacity-50 transition-colors"
        >
          Cancel Subscription
        </button>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Are you sure you want to cancel your subscription?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleCancel(true)}
              disabled={cancelLoading || loading}
              className="px-4 py-2 bg-orange-600 dark:bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 dark:hover:bg-orange-600 disabled:opacity-50 transition-colors"
            >
              {cancelLoading ? 'Cancelling...' : 'Cancel at Period End'}
            </button>
            <button
              onClick={() => handleCancel(false)}
              disabled={cancelLoading || loading}
              className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-700 dark:hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              {cancelLoading ? 'Cancelling...' : 'Cancel Immediately'}
            </button>
            <button
              onClick={() => setShowCancelConfirm(false)}
              disabled={cancelLoading || loading}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50 transition-colors"
            >
              Keep Subscription
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionActions;

