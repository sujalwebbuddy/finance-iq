import React, { useState, useEffect } from 'react';
import FormField from '../auth/FormField';
import FormInput from '../auth/FormInput';
import FormButton from '../auth/FormButton';
import CloseIcon from '../icons/CloseIcon';

const AddCategoryModal = ({ isOpen, onClose, onAdd, isIncome }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCategoryName('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      setError('Please enter a category name');
      return;
    }

    if (trimmedName.length > 50) {
      setError('Category name must be 50 characters or less');
      return;
    }

    onAdd(trimmedName, isIncome);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[60] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Add New {isIncome ? 'Income' : 'Expense'} Category
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
          <FormField label="Category Name" id="categoryName" error={error} required>
            <FormInput
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                setError('');
              }}
              placeholder={`Enter ${isIncome ? 'income' : 'expense'} category name`}
              error={error}
              required
              maxLength={50}
              className={!error ? 'pl-4' : ''}
              autoFocus
            />
          </FormField>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <FormButton type="submit" className="w-auto">
              Add Category
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;

