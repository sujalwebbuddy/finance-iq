import React, { useState, useEffect } from 'react';
import FormField from '../auth/FormField';
import FormInput from '../auth/FormInput';
import FormButton from '../auth/FormButton';
import CloseIcon from '../icons/CloseIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const BudgetModal = ({ isOpen, onClose, onSubmit, budget, categories }) => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (budget) {
      setFormData({
        category: budget.category || '',
        amount: budget.amount || '',
        month: budget.month || new Date().getMonth() + 1,
        year: budget.year || new Date().getFullYear(),
      });
    } else {
      setFormData({
        category: categories[0] || '',
        amount: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      });
    }
    setErrors({});
  }, [budget, categories, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'month') {
      const num = parseInt(value, 10);
      if (num < 1) {
        setFormData((prev) => ({ ...prev, month: 1 }));
        return;
      }
      if (num > 12) {
        setFormData((prev) => ({ ...prev, month: 12 }));
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    }
    if (!formData.month || formData.month < 1 || formData.month > 12) {
      newErrors.month = 'Please enter a valid month (1-12)';
    }
    if (!formData.year || formData.year < 2000 || formData.year > 2100) {
      newErrors.year = 'Please enter a valid year';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData, budget?._id);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {budget ? 'Edit Budget' : 'Add Budget'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <FormField label="Category" id="category" error={errors.category} required>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                  errors.category
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-teal-500 focus:border-transparent'
                }`}
                required
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-white dark:bg-gray-800">
                    {c}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
                <ChevronDownIcon className="h-5 w-5" />
              </div>
            </div>
          </FormField>

          <FormField label="Amount" id="amount" error={errors.amount} required>
            <FormInput
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              error={errors.amount}
              required
              className={!errors.amount ? 'pl-4' : ''}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Month" id="month" error={errors.month} required>
              <div className="relative">
                <select
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    errors.month
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-teal-500 focus:border-transparent'
                  }`}
                  required
                >
                  {monthNames.map((month, index) => (
                    <option key={index + 1} value={index + 1} className="bg-white dark:bg-gray-800">
                      {month}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
                  <ChevronDownIcon className="h-5 w-5" />
                </div>
              </div>
            </FormField>

            <FormField label="Year" id="year" error={errors.year} required>
              <FormInput
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
                min="2000"
                max="2100"
                error={errors.year}
                required
                className={!errors.year ? 'pl-4' : ''}
              />
            </FormField>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <FormButton isLoading={isSubmitting} className="w-auto">
              {budget ? 'Update Budget' : 'Create Budget'}
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;

