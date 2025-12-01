import React, { useState, useEffect } from 'react';
import FormField from './auth/FormField';
import FormInput from './auth/FormInput';
import FormButton from './auth/FormButton';
import CloseIcon from './icons/CloseIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import AddCategoryModal from './transactions/AddCategoryModal';
import ConfirmDialog from './transactions/ConfirmDialog';

const VIEW_MODE = {
  EXPENSE_FORM: 'expenseForm',
  INCOME_FORM: 'incomeForm',
};

const getInitialFormData = (categories) => ({
  name: '',
  category: categories[0] || '',
  cost: '',
  addedOn: new Date().toISOString().split('T')[0],
  isIncome: false,
  note: '',
});

const TransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  transaction,
  expenseCategories = [],
  incomeCategories = [],
  onNewCategory,
  currentBalance = 0,
}) => {
  const [modalView, setModalView] = useState(VIEW_MODE.EXPENSE_FORM);
  const [submittedAnyway, setSubmittedAnyway] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: '', onConfirm: null });
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    cost: '',
    addedOn: new Date().toISOString().split('T')[0],
    isIncome: false,
    note: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (transaction) {
      setFormData({
        name: transaction.name || '',
        category: transaction.category || '',
        cost: transaction.cost || '',
        addedOn: new Date(transaction.addedOn).toISOString().split('T')[0],
        isIncome: transaction.isIncome || false,
        note: transaction.note || '',
      });
      setModalView(transaction.isIncome ? VIEW_MODE.INCOME_FORM : VIEW_MODE.EXPENSE_FORM);
    } else {
      const initialData = getInitialFormData(
        modalView === VIEW_MODE.EXPENSE_FORM ? expenseCategories : incomeCategories
      );
      setFormData(initialData);
    }
    setErrors({});
  }, [transaction, isOpen, modalView, expenseCategories, incomeCategories]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'category' && value === '__add_new__') {
      setIsCategoryModalOpen(true);
      return;
    }

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
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
    const isIncomeTransaction = modalView === VIEW_MODE.INCOME_FORM;

    if (!isIncomeTransaction && !formData.name?.trim()) {
      newErrors.name = 'Please enter a name';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.cost || parseFloat(formData.cost) <= 0) {
      newErrors.cost = 'Please enter a valid amount greater than 0';
    }
    if (!formData.addedOn) {
      newErrors.addedOn = 'Please select a date';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const isIncomeTransaction = modalView === VIEW_MODE.INCOME_FORM;
    const costValue = parseFloat(formData.cost);

    if (!isIncomeTransaction && !transaction && costValue > currentBalance && !submittedAnyway) {
      setConfirmDialog({
        isOpen: true,
        message: `Warning: This expense (${costValue}) exceeds your current balance (${currentBalance}). Proceeding will result in a negative balance. Do you wish to submit anyway?`,
        onConfirm: () => {
          setSubmittedAnyway(true);
          setConfirmDialog({ isOpen: false, message: '', onConfirm: null });
          setTimeout(() => {
            const finalFormData = {
              ...formData,
              name: formData.name.trim() || (formData.category ? formData.category : 'General') + ' Income',
              isIncome: isIncomeTransaction,
            };
            onSubmit(finalFormData, transaction?._id);
          }, 0);
        },
      });
      return;
    }

    setSubmittedAnyway(false);
    let transactionName = formData.name.trim();
    if (isIncomeTransaction && transactionName === '') {
      transactionName = (formData.category ? formData.category : 'General') + ' Income';
    }
    const finalFormData = {
      ...formData,
      name: transactionName,
      isIncome: isIncomeTransaction,
    };
    onSubmit(finalFormData, transaction?._id);
  };

  const handleSwitchToIncome = (e) => {
    e.preventDefault();
    setFormData(getInitialFormData(incomeCategories));
    setModalView(VIEW_MODE.INCOME_FORM);
    setErrors({});
  };

  const handleSwitchToExpense = (e) => {
    e.preventDefault();
    setFormData(getInitialFormData(expenseCategories));
    setModalView(VIEW_MODE.EXPENSE_FORM);
    setErrors({});
  };

  if (!isOpen) return null;

  const currentCategories = modalView === VIEW_MODE.EXPENSE_FORM ? expenseCategories : incomeCategories;
  const isIncomeTransaction = modalView === VIEW_MODE.INCOME_FORM;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {transaction ? 'Edit' : 'Add'} {isIncomeTransaction ? 'Income' : 'Expense'}
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
            {!isIncomeTransaction && (
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
            )}

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
                  {currentCategories.map((cat) => (
                    <option key={cat} value={cat} className="bg-white dark:bg-gray-800">
                      {cat}
                    </option>
                  ))}
                  <option value="__add_new__" className="bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-semibold">
                    + Add New Category
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
                  <ChevronDownIcon className="h-5 w-5" />
                </div>
              </div>
            </FormField>

            <FormField label={`Amount (${isIncomeTransaction ? 'Income' : 'Expense'})`} id="cost" error={errors.cost} required>
              <FormInput
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                error={errors.cost}
                required
                className={!errors.cost ? 'pl-4' : ''}
              />
            </FormField>

            <FormField label="Date" id="addedOn" error={errors.addedOn} required>
              <FormInput
                type="date"
                id="addedOn"
                name="addedOn"
                value={formData.addedOn}
                onChange={handleChange}
                error={errors.addedOn}
                required
                className={!errors.addedOn ? 'pl-4' : ''}
              />
            </FormField>

            <FormField label="Notes (Optional)" id="note">
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={3}
                className="block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-y"
                placeholder="E.g., Dinner at favorite restaurant, January salary"
              />
            </FormField>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={isIncomeTransaction ? handleSwitchToExpense : handleSwitchToIncome}
                className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
              >
                Switch to {isIncomeTransaction ? 'Expense' : 'Income'}
              </button>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <FormButton type="submit" className="w-auto">
                  {transaction ? 'Update Transaction' : 'Save Transaction'}
                </FormButton>
              </div>
            </div>
          </form>
        </div>
      </div>

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onAdd={handleCategoryAdd}
        isIncome={isIncomeTransaction}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Confirm Transaction"
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm || (() => {})}
        onCancel={() => setConfirmDialog({ isOpen: false, message: '', onConfirm: null })}
        confirmLabel="Submit Anyway"
        cancelLabel="Cancel"
      />
    </>
  );
};

export default TransactionModal;
