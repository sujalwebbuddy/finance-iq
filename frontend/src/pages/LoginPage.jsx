import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthFormLayout from '../components/auth/AuthFormLayout';
import FormField from '../components/auth/FormField';
import FormInput from '../components/auth/FormInput';
import FormButton from '../components/auth/FormButton';
import PasswordInput from '../components/PasswordInput';
import EmailIcon from '../components/icons/EmailIcon';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

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

        <FormButton isLoading={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </FormButton>
      </form>
    </AuthFormLayout>
  );
};

export default LoginPage;
