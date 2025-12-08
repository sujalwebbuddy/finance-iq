import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthFormLayout from '../components/auth/AuthFormLayout';
import FormField from '../components/auth/FormField';
import FormInput from '../components/auth/FormInput';
import FormButton from '../components/auth/FormButton';
import PasswordInput from '../components/PasswordInput';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';
import EmailIcon from '../components/icons/EmailIcon';

const LoginPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { login, initiateGoogleAuth } = useAuth();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      const errorMessages = {
        google_auth_failed: 'Google authentication failed. Please try again.',
        server_error: 'Server error occurred. Please try again later.',
        invalid_callback: 'Invalid authentication callback. Please try again.',
      };
      setServerError(errorMessages[errorParam] || 'An error occurred. Please try again.');
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    initiateGoogleAuth();
  };

  return (
    <AuthFormLayout
      title="Welcome Back"
      subtitle="Sign in to continue to your account"
      linkText="Create an account"
      linkTo="/register"
      footerText="New to FinanceIQ?"
    >
      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
            {serverError}
          </p>
        </div>
      )}

      <div className="space-y-6">
        <GoogleSignInButton 
          onClick={handleGoogleSignIn} 
          isLoading={isGoogleLoading}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Email Address" id="email" error={null} required>
            <FormInput
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={EmailIcon}
              required
            />
          </FormField>

          <FormField label="Password" id="password" error={null} required>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-200"
            />
          </FormField>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <FormButton isLoading={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </FormButton>
        </form>
      </div>
    </AuthFormLayout>
  );
};

export default LoginPage;
