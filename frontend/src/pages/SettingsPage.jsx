import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import api from '../api/axios';
import subscriptionService from '../services/subscriptionService';
import SubscriptionCard from '../components/subscription/SubscriptionCard';
import PlanSelector from '../components/subscription/PlanSelector';
import SubscriptionActions from '../components/subscription/SubscriptionActions';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [error, setError] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [usage, setUsage] = useState(null);
  const [showPlans, setShowPlans] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(false);

  useEffect(() => {
    fetchSubscriptionData();
    
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');
    
    if (success === 'true') {
      toast.success('Subscription upgraded successfully!');
      fetchSubscriptionData();
      window.history.replaceState({}, '', '/settings');
    } else if (canceled === 'true') {
      toast.info('Subscription upgrade was cancelled');
      window.history.replaceState({}, '', '/settings');
    }
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      setSubscriptionLoading(true);
      const subscriptionData = await subscriptionService.getCurrentSubscription();
      setSubscription(subscriptionData.subscription);
      setUsage(subscriptionData.usage);
    } catch (err) {
      toast.error('Failed to load subscription data');
    } finally {
      setSubscriptionLoading(false);
    }
  };

  const handleUpgrade = () => {
    setShowPlans(true);
  };

  const handleSelectPlan = async (planId) => {
    if (planId === 'enterprise') {
      toast.info('Please contact sales for enterprise plans');
      return;
    }

    try {
      setUpgradeLoading(true);
      const { url } = await subscriptionService.createCheckoutSession(planId);
      window.location.href = url;
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to create checkout session'
      );
    } finally {
      setUpgradeLoading(false);
    }
  };

  const handleCancel = async (cancelAtPeriodEnd) => {
    await subscriptionService.cancelSubscription(cancelAtPeriodEnd);
    await fetchSubscriptionData();
  };

  const handleReactivate = async () => {
    await subscriptionService.reactivateSubscription();
    await fetchSubscriptionData();
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setError('');
      await api.delete('/users/account');
      logout();
    } catch (err) {
      setError('Failed to delete account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Settings
      </h1>

      {subscriptionLoading ? (
        <Spinner />
      ) : (
        <>
          {subscription && (
            <SubscriptionCard
              subscription={subscription}
              usage={usage}
              onUpgrade={handleUpgrade}
              loading={upgradeLoading}
            />
          )}

          {showPlans && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Choose a Plan
                </h2>
                <button
                  onClick={() => setShowPlans(false)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Close
                </button>
              </div>
              <PlanSelector
                currentPlan={subscription?.plan || 'free'}
                onSelectPlan={handleSelectPlan}
                loading={upgradeLoading}
              />
            </div>
          )}

          {subscription && subscription.plan !== 'free' && (
            <div className="mb-6">
              <SubscriptionActions
                subscription={subscription}
                onCancel={handleCancel}
                onReactivate={handleReactivate}
                loading={upgradeLoading}
              />
            </div>
          )}
        </>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Account Info
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Account Actions</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Sign out of your account. You can sign back in anytime.
        </p>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-red-200 dark:border-red-800 p-6">
        <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
          Danger Zone
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Deleting your account is permanent. All your data will be lost.
        </p>
        {error && (
          <p className="text-red-600 dark:text-red-400 mb-2 text-sm">{error}</p>
        )}
        <button
          onClick={handleDeleteAccount}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors text-sm font-semibold"
        >
          {loading ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
