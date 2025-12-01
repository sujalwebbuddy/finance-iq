import React, { useState, useEffect } from 'react';
import FormField from '../auth/FormField';
import FormInput from '../auth/FormInput';
import FormButton from '../auth/FormButton';
import CloseIcon from '../icons/CloseIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const RecurringTransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  transaction,
  categories,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    amount: '',
    isIncome: false,
    frequency: 'monthly',
    startDate: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        name: transaction.name || '',
        category: transaction.category || '',
        amount: transaction.amount || '',
        isIncome: transaction.isIncome || false,
        frequency: transaction.frequency || 'monthly',
        startDate: transaction.startDate?.slice(0, 10) || '',
      });
    } else {
      setFormData({
        name: '',
        category: '',
        amount: '',
        isIncome: false,
        frequency: 'monthly',
        startDate: '',
      });
    }
    setErrors({});
  }, [transaction, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' }));

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Please enter a name';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Please select a start date';
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
      await onSubmit(formData, transaction?._id);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'annually', label: 'Annually' },
  ];

  const expenseCategories = categories
    .filter((cat) => !cat.isIncome)
    .map((cat) => cat.name || cat);
  const incomeCategories = categories
    .filter((cat) => cat.isIncome)
    .map((cat) => cat.name || cat);
  const allCategories = formData.isIncome ? incomeCategories : expenseCategories;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {transaction ? 'Edit Recurring Transaction' : 'Add Recurring Transaction'}
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
          <FormField label="Name" id="name" error={errors.name} required>
            <FormInput
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter transaction name"
              error={errors.name}
              required
              className={!errors.name ? 'pl-4' : ''}
            />
          </FormField>

          <FormField label="Type" id="isIncome">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isIncome"
                checked={formData.isIncome}
                onChange={handleChange}
                className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                This is an income transaction
              </span>
            </label>
          </FormField>

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
                <option value="" className="bg-white dark:bg-gray-800">
                  Select Category
                </option>
                {allCategories.map((cat) => (
                  <option key={cat} value={cat} className="bg-white dark:bg-gray-800">
                    {cat}
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

          <FormField label="Frequency" id="frequency" required>
            <div className="relative">
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 appearance-none"
                required
              >
                {frequencyOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-white dark:bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
                <ChevronDownIcon className="h-5 w-5" />
              </div>
            </div>
          </FormField>

          <FormField label="Start Date" id="startDate" error={errors.startDate} required>
            <FormInput
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              error={errors.startDate}
              required
              className={!errors.startDate ? 'pl-4' : ''}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Next Due Date will be calculated automatically based on this start date and frequency.
            </p>
          </FormField>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <FormButton isLoading={isSubmitting} className="w-auto">
              {transaction ? 'Update Recurring Transaction' : 'Create Recurring Transaction'}
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecurringTransactionModal;

