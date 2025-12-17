import React, { useState, useEffect } from 'react';
import FormField from '../auth/FormField';
import FormInput from '../auth/FormInput';
import FormButton from '../auth/FormButton';
import CloseIcon from '../icons/CloseIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import AddCategoryModal from '../transactions/AddCategoryModal';

const RecurringTransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  transaction,
  expenseCategories = [],
  incomeCategories = [],
  onNewCategory,
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
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

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

    if (name === 'category' && value === '__add_new__') {
      setIsCategoryModalOpen(true);
      return;
    }

    if (type === 'checkbox') {
      if (name === 'isIncome') {
        const newCategories = checked ? incomeCategories : expenseCategories;
        setFormData((prev) => ({
          ...prev,
          isIncome: checked,
          category: newCategories[0] || '',
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryAdd = (newCategory, isIncome) => {
    onNewCategory(newCategory, isIncome);
    setFormData((prev) => ({ ...prev, category: newCategory }));
    setIsCategoryModalOpen(false);
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

  const currentCategories = formData.isIncome ? incomeCategories : expenseCategories;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[51] p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-xl w-full max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white pr-2">
            {transaction ? 'Edit Recurring Transaction' : 'Add Recurring Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 sm:mr-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors touch-manipulation"
            aria-label="Close modal"
          >
            <CloseIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
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
              className={`text-sm sm:text-base ${!errors.name ? 'pl-3 sm:pl-4' : ''}`}
              style={{ fontSize: '16px' }}
            />
          </FormField>

          <FormField label="Type" id="isIncome">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isIncome"
                checked={formData.isIncome}
                onChange={handleChange}
                className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 touch-manipulation"
              />
              <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
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
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 appearance-none touch-manipulation ${
                    errors.category
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-teal-500 focus:border-transparent'
                  }`}
                  required
                >
                  <option value="" className="bg-white dark:bg-gray-800">
                    Select Category
                  </option>
                  {currentCategories.map((cat) => (
                    <option key={cat} value={cat} className="bg-white dark:bg-gray-800">
                      {cat}
                    </option>
                  ))}
                  <option value="__add_new__" className="bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-semibold">
                    + Add New Category
                  </option>
                </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-3 text-gray-700 dark:text-gray-300">
                <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />
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
              className={`text-sm sm:text-base ${!errors.amount ? 'pl-3 sm:pl-4' : ''}`}
              style={{ fontSize: '16px' }}
            />
          </FormField>

          <FormField label="Frequency" id="frequency" required>
            <div className="relative">
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 appearance-none touch-manipulation"
                required
              >
                {frequencyOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-white dark:bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-3 text-gray-700 dark:text-gray-300">
                <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />
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
              min={new Date().toISOString().split('T')[0]}
              className={`text-sm sm:text-base ${!errors.startDate ? 'pl-3 sm:pl-4' : ''}`}
              style={{ fontSize: '16px' }}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Next Due Date will be calculated automatically based on this start date and frequency.
            </p>
          </FormField>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 sm:py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium touch-manipulation w-full sm:w-auto"
            >
              Cancel
            </button>
            <FormButton isLoading={isSubmitting} className="w-full sm:w-auto text-sm sm:text-base py-2.5 sm:py-3.5">
              <span className="hidden sm:inline">{transaction ? 'Update Recurring Transaction' : 'Create Recurring Transaction'}</span>
              <span className="sm:hidden">{transaction ? 'Update' : 'Create'}</span>
            </FormButton>
          </div>
        </form>
      </div>

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onAdd={handleCategoryAdd}
        isIncome={formData.isIncome}
      />
    </div>
  );
};

export default RecurringTransactionModal;

