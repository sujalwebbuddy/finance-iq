import React, { useState } from 'react';
import AddCategoryModal from './transactions/AddCategoryModal';

const ManageCategoriesModal = ({ isOpen, onClose, expenseCategories, incomeCategories, onDelete, onNewCategory }) => {
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [isIncomeCategory, setIsIncomeCategory] = useState(false);
  // Pre-defined categories that should not be deleted
  const defaultExpenseCategories = [
    'Food', 'Shopping', 'Bills', 'Subscriptions', 'Transportation', 'Entertainment', 'Groceries', 'Miscellaneous'
  ];
  const defaultIncomeCategories = [
    'Salary',
    'Freelance / Side Gig',
    'Investment Returns',
    'Gifts',
    'Refunds'
  ];

  // Filter out the default categories to get the user-defined list
  const userExpenseDefinedCategories = expenseCategories.filter(cat => !defaultExpenseCategories.includes(cat));
  const userIncomeDefinedCategories = incomeCategories.filter(cat => !defaultIncomeCategories.includes(cat));

  const hasCustomCategories = userExpenseDefinedCategories.length > 0 || userIncomeDefinedCategories.length > 0;

  if (!isOpen) return null;

  const handleAddCategoryClick = (isIncome) => {
    setIsIncomeCategory(isIncome);
    setAddCategoryModalOpen(true);
  };

  const handleCategoryAdd = (categoryName, isIncome) => {
    if (onNewCategory) {
      onNewCategory(categoryName, isIncome);
    }
    setAddCategoryModalOpen(false);
  };

  const CategoryList = ({ title, categories, isIncome }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-1 flex-1">{title}</h3>
        <button
          onClick={() => handleAddCategoryClick(isIncome)}
          className="ml-4 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          + Add
        </button>
      </div>
      {categories.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {categories.map(category => (
            <li key={category} className="py-2 flex justify-between items-center">
              <span className="text-gray-800">{category}</span>
              <button
                onClick={() => onDelete(category)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm italic">No custom categories defined for this type.</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Manage Custom Categories</h2>

        <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
          <CategoryList
            title="Expense Categories"
            categories={userExpenseDefinedCategories}
            isIncome={false}
          />
          <CategoryList
            title="Income Categories"
            categories={userIncomeDefinedCategories}
            isIncome={true}
          />
        </div>

        {!hasCustomCategories && (
          <p className="text-gray-500 text-center py-4 text-sm">You haven't added any custom categories yet. Use the "Add" buttons above to create new categories.</p>
        )}

        <div className="flex justify-end mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Close</button>
        </div>
      </div>

      <AddCategoryModal
        isOpen={addCategoryModalOpen}
        onClose={() => setAddCategoryModalOpen(false)}
        onAdd={handleCategoryAdd}
        isIncome={isIncomeCategory}
      />
    </div>
  );
};

export default ManageCategoriesModal;