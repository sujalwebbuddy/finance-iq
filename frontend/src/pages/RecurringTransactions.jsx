import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import RecurringTransactionModal from '../components/recurring/RecurringTransactionModal';
import RecurringTransactionHeader from '../components/recurring/RecurringTransactionHeader';
import RecurringTransactionTable from '../components/recurring/RecurringTransactionTable';
import ConfirmDialog from '../components/transactions/ConfirmDialog';
import { recurringTransactionsService } from '../services/recurringTransactionsService';
import { handleTransactionError } from '../utils/errorHandler';
import transactionsService from '../services/transactionsService';

const RecurringTransactions = () => {
  const [recurring, setRecurring] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [recurringData, categoriesData] = await Promise.all([
        recurringTransactionsService.getRecurringTransactions(),
        transactionsService.getExpenseCategories(),
      ]);
      setRecurring(recurringData);
      setCategories(categoriesData);
    } catch (err) {
      const recurringError = handleTransactionError(err, { action: 'fetchRecurringTransactions' });
      toast.error(recurringError.message, { autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = (transaction = null) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (formData, id) => {
    try {
      if (id) {
        await recurringTransactionsService.updateRecurringTransaction(id, formData);
        toast.success('Recurring transaction updated successfully!');
      } else {
        await recurringTransactionsService.createRecurringTransaction(formData);
        toast.success('Recurring transaction created successfully!');
      }
      fetchData();
      handleCloseModal();
    } catch (err) {
      const recurringError = handleTransactionError(err, { action: 'saveRecurringTransaction', id });
      toast.error(recurringError.message, { autoClose: 5000 });
    }
  };

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    const { id } = confirmDialog;
    try {
      await recurringTransactionsService.deleteRecurringTransaction(id);
      toast.success('Recurring transaction deleted successfully!');
      fetchData();
      setConfirmDialog({ isOpen: false, id: null });
    } catch (err) {
      const recurringError = handleTransactionError(err, { action: 'deleteRecurringTransaction', id });
      toast.error(recurringError.message, { autoClose: 5000 });
      setConfirmDialog({ isOpen: false, id: null });
    }
  };

  const handleCancel = () => {
    setConfirmDialog({ isOpen: false, id: null });
  };

  return (
    <>
      <RecurringTransactionHeader onAddRecurring={() => handleOpenModal()} />

      {loading ? (
        <Spinner />
      ) : (
        <RecurringTransactionTable
          transactions={recurring}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      )}

      <RecurringTransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        transaction={editingTransaction}
        categories={categories}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Recurring Transaction"
        message="Are you sure you want to delete this recurring transaction? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={handleCancel}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </>
  );
};

export default RecurringTransactions;
