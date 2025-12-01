import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import api from '../api/axios';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      console.error(err);
      setError('Failed to delete account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
      
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Account Info</h2>
        <p className="text-gray-600 dark:text-gray-400"><strong>Email:</strong> {user?.email}</p>
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
        <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Deleting your account is permanent. All your data will be lost.
        </p>
        {error && <p className="text-red-600 dark:text-red-400 mb-2 text-sm">{error}</p>}
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
