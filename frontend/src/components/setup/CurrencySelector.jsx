import React from 'react';
import CurrencyOption from './CurrencyOption';
import FormField from '../auth/FormField';

const CurrencySelector = ({ currencies, selectedCurrency, onCurrencyChange }) => {
  return (
    <FormField label="Choose your default currency" id="currency" required>
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {currencies.map((currency) => (
          <CurrencyOption
            key={currency.code}
            currency={currency}
            isSelected={selectedCurrency === currency.code}
            onSelect={(e) => onCurrencyChange(e.target.value)}
          />
        ))}
      </div>
    </FormField>
  );
};

export default CurrencySelector;

