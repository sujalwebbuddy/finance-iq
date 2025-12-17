import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthFormLayout from '../components/auth/AuthFormLayout';
import FormField from '../components/auth/FormField';
import FormButton from '../components/auth/FormButton';
import PasswordInput from '../components/PasswordInput';
import PasswordStrengthIndicator from '../components/auth/PasswordStrengthIndicator';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPassword } = useAuth();

  useEffect(() => {
    if (!token) {
      setServerError('Invalid reset link. Please request a new password reset.');
    }
  }, [token]);

  const validatePassword = () => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationError = validatePassword();
    if (validationError) {
      setServerError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token, password);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <AuthFormLayout
        title="Invalid Reset Link"
        subtitle="This password reset link is invalid or has expired"
        footerText="Need a new reset link?"
        linkText="Request reset"
        linkTo="/forgot-password"
      >
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/20 border-2 border-red-200 dark:border-red-800 shadow-sm">
            <p className="text-base text-red-700 dark:text-red-300 font-medium leading-relaxed">
              Please request a new password reset link to continue.
            </p>
          </div>
        </div>
      </AuthFormLayout>
    );
  }

  if (isSuccess) {
    return (
      <AuthFormLayout
        title="Password Reset Successful"
        subtitle="Your password has been updated successfully"
        footerText="Ready to sign in?"
        linkText="Sign in"
        linkTo="/login"
      >
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg animate-bounce">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 shadow-sm">
            <p className="text-base text-green-700 dark:text-green-300 font-medium leading-relaxed">
              Your password has been reset successfully. You will be redirected to the login page in a few seconds.
            </p>
          </div>
          <div className="pt-4">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Redirecting...</span>
            </div>
          </div>
        </div>
      </AuthFormLayout>
    );
  }

  return (
    <AuthFormLayout
      title="Reset Your Password"
      subtitle="Enter your new password below"
      footerText="Remember your password?"
      linkText="Sign in"
      linkTo="/login"
    >

      {password && confirmPassword && password === confirmPassword && password.length >= 6 && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm text-green-700 dark:text-green-300 font-medium">
              Passwords match!
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="New Password" id="password" error={null} required>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-teal-500 dark:focus:border-teal-400 transition-all duration-200"
          />
          <PasswordStrengthIndicator password={password} />
        </FormField>

        <FormField label="Confirm New Password" id="confirmPassword" error={null} required>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              confirmPassword && password === confirmPassword && password.length >= 6
                ? 'border-green-500 dark:border-green-400 focus:ring-green-500 dark:focus:ring-green-400'
                : 'border-gray-300 dark:border-gray-600 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-teal-500 dark:focus:border-teal-400'
            }`}
          />
          {confirmPassword && password && (
            <div className="mt-2 flex items-center space-x-2">
              {password === confirmPassword && password.length >= 6 ? (
                <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Passwords match
                </span>
              ) : (
                <span className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Passwords do not match
                </span>
              )}
            </div>
          )}
        </FormField>

        <FormButton isLoading={isLoading}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </FormButton>
      </form>
    </AuthFormLayout>
  );
};

export default ResetPasswordPage;
