import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useCurrency from '../hooks/useCurrency';
import Spinner from '../components/Spinner';
import AuthFormLayout from '../components/auth/AuthFormLayout';
import SetupHero from '../components/setup/SetupHero';
import CurrencySelector from '../components/setup/CurrencySelector';
import FormButton from '../components/auth/FormButton';

const SetupPage = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setup } = useAuth();
  const { supportedCurrencies } = useCurrency();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await setup(selectedCurrency);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <AuthFormLayout
      title=""
      subtitle=""
      footerText="You can change your currency preference later in settings."
    >
      <SetupHero userEmail={user.email} />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
            {error}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <CurrencySelector
          currencies={supportedCurrencies}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={setSelectedCurrency}
        />

        <FormButton isLoading={loading}>
          {loading ? 'Setting up...' : 'Save and Continue'}
        </FormButton>
      </form>
    </AuthFormLayout>
  );
};

export default SetupPage;
