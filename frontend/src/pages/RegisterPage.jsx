import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import AuthFormLayout from '../components/auth/AuthFormLayout';
import FormField from '../components/auth/FormField';
import FormInput from '../components/auth/FormInput';
import FormButton from '../components/auth/FormButton';
import PasswordInput from '../components/PasswordInput';
import PasswordStrengthIndicator from '../components/auth/PasswordStrengthIndicator';
import EmailIcon from '../components/icons/EmailIcon';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    } else {
      const domain = email.split('@')[1];
      const blockedDomains = ['example.com', 'test.com', 'invalid.com'];
      if (blockedDomains.includes(domain)) {
        newErrors.email = 'This email domain is not allowed.';
      }
    }

    if (password.length < 8 || password.length > 16) {
      newErrors.password = 'Password must be 8-16 characters long.';
    } else {
      const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])/;
      if (!passwordRegex.test(password)) {
        newErrors.password = 'Password must contain an alphabet, a digit, and a symbol.';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    
    try {
      await signup(email, password);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormLayout
      title="Create Account"
      subtitle="Start managing your finances today"
      linkText="Sign in instead"
      linkTo="/login"
      footerText="Already have an account?"
    >
      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
            {serverError}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Email Address" id="email" error={errors.email} required>
          <FormInput
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            icon={EmailIcon}
            error={errors.email}
            required
          />
        </FormField>

        <FormField label="Password" id="password" error={errors.password} required>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.password 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent'
            }`}
          />
          <PasswordStrengthIndicator password={password} />
        </FormField>

        <FormButton isLoading={isLoading}>
          {isLoading ? 'Creating account...' : 'Create Account'}
        </FormButton>
      </form>

      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
        By signing up, you agree to our Terms & Privacy Policy
      </p>
    </AuthFormLayout>
  );
};

export default RegisterPage;
