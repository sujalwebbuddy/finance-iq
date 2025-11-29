import React from 'react';
import CheckmarkIcon from '../icons/CheckmarkIcon';

const PasswordStrengthIndicator = ({ password }) => {
  if (!password) return null;

  const getPasswordStrength = () => {
    const hasLength = password.length >= 8 && password.length <= 16;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[\W_]/.test(password);
    
    const criteria = [hasLength, hasLetter, hasDigit, hasSymbol];
    const metCriteria = criteria.filter(Boolean).length;
    
    return {
      hasLength,
      hasLetter,
      hasDigit,
      hasSymbol,
      strength: metCriteria,
    };
  };

  const passwordStrength = getPasswordStrength();
  const criteria = [
    { met: passwordStrength.hasLength, text: '8-16 characters' },
    { met: passwordStrength.hasLetter, text: 'At least one letter' },
    { met: passwordStrength.hasDigit, text: 'At least one number' },
    { met: passwordStrength.hasSymbol, text: 'At least one symbol' },
  ];

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Password Requirements:
      </p>
      <div className="space-y-2">
        {criteria.map((criterion, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {criterion.met ? (
              <CheckmarkIcon className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
            ) : (
              <div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0" />
            )}
            <span className={criterion.met ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}>
              {criterion.text}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                passwordStrength.strength >= level
                  ? passwordStrength.strength === 4
                    ? 'bg-green-500'
                    : passwordStrength.strength === 3
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;

