import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BudgetModal from '../components/budgets/BudgetModal';
import BudgetHeader from '../components/budgets/BudgetHeader';
import BudgetTable from '../components/budgets/BudgetTable';
import ConfirmDialog from '../components/transactions/ConfirmDialog';
import { budgetsService } from '../services/budgetsService';
import { handleTransactionError } from '../utils/errorHandler';
import transactionsService from '../services/transactionsService';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [budgetsData, categoriesData, transactionsData] = await Promise.all([
        budgetsService.getBudgets(),
        transactionsService.getExpenseCategories(),
        transactionsService.getTransactions({ limit: 1000 }),
      ]);
      setBudgets(budgetsData);
      setCategories(categoriesData);
      setTransactions(transactionsData.transactions || []);
    } catch (err) {
      const budgetError = handleTransactionError(err, { action: 'fetchBudgets' });
      toast.error(budgetError.message, { autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenBudgetModal = (budget = null) => {
    setEditingBudget(budget);
    setIsBudgetModalOpen(true);
  };

  const handleCloseBudgetModal = () => {
    setIsBudgetModalOpen(false);
    setEditingBudget(null);
  };

  const handleFormSubmit = async (formData, id) => {
    try {
      if (id) {
        await budgetsService.updateBudget(id, formData);
        toast.success('Budget updated successfully!');
      } else {
        await budgetsService.createBudget(formData);
        toast.success('Budget created successfully!');
      }
      fetchData();
      handleCloseBudgetModal();
    } catch (err) {
      const budgetError = handleTransactionError(err, { action: 'saveBudget', id });
      toast.error(budgetError.message, { autoClose: 5000 });
    }
  };

  const handleDeleteBudget = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const confirmDeleteBudget = async () => {
    const { id } = confirmDialog;
    try {
      await budgetsService.deleteBudget(id);
      toast.success('Budget deleted successfully!');
      fetchData();
      setConfirmDialog({ isOpen: false, id: null });
    } catch (err) {
      const budgetError = handleTransactionError(err, { action: 'deleteBudget', id });
      toast.error(budgetError.message, { autoClose: 5000 });
      setConfirmDialog({ isOpen: false, id: null });
    }
  };

  const handleCancel = () => {
    setConfirmDialog({ isOpen: false, id: null });
  };

  return (
    <>
      <BudgetHeader onAddBudget={() => handleOpenBudgetModal()} />

      {loading ? (
        <Spinner />
      ) : (
        <BudgetTable
          budgets={budgets}
          transactions={transactions}
          onDelete={handleDeleteBudget}
        />
      )}

      <BudgetModal
        isOpen={isBudgetModalOpen}
        onClose={handleCloseBudgetModal}
        onSubmit={handleFormSubmit}
        budget={editingBudget}
        categories={categories}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Budget"
        message="Are you sure you want to delete this budget? This action cannot be undone."
        onConfirm={confirmDeleteBudget}
        onCancel={handleCancel}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </>
  );
};

export default Budgets;
