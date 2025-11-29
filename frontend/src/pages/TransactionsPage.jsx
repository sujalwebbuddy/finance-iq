import React, { useState, useEffect, useCallback, useRef } from 'react';
import TransactionModal from '../components/TransactionModal';
import TransactionDetailModal from '../components/TransactionDetailModal';
import ManageCategoriesModal from '../components/ManageCategoriesModal';
import Spinner from '../components/Spinner';
import useCurrency from '../hooks/useCurrency';
import { handleExportCSV } from '../utils/transactions';
import { handleTransactionError } from '../utils/errorHandler';
import transactionsService from '../services/transactionsService';
import TransactionHeader from '../components/transactions/TransactionHeader';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionPagination from '../components/transactions/TransactionPagination';
import ConfirmDialog from '../components/transactions/ConfirmDialog';
import ErrorNotification from '../components/transactions/ErrorNotification';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [summaryData, setSummaryData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [viewingDetails, setViewingDetails] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTransactionIds, setSelectedTransactionIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: null, data: null });
  const [error, setError] = useState(null);
  const debounceTimer = useRef(null);
  const isInitialMount = useRef(true);
  const { currency } = useCurrency();
  const allCategories = [...new Set([...expenseCategories, ...incomeCategories])];

  const fetchData = useCallback(
    async (currentSearchTerm = searchTerm) => {
      if (isInitialMount.current) {
        setLoading(true);
      } else {
        setIsFiltering(true);
      }

      try {
        const [summaryData, expenseCategories, incomeCategories, transactionsData] = await Promise.all([
          transactionsService.getSummary(),
          transactionsService.getExpenseCategories(),
          transactionsService.getIncomeCategories(),
          transactionsService.getTransactions({
            page,
            limit: 10,
            search: currentSearchTerm || undefined,
            isIncome: typeFilter !== 'all' ? typeFilter === 'income' : undefined,
            category: categoryFilter !== 'all' ? categoryFilter : undefined,
            startDate: dateFrom || undefined,
            endDate: dateTo || undefined,
          }),
        ]);

        setSummaryData(summaryData);
        setExpenseCategories(expenseCategories);
        setIncomeCategories(incomeCategories);
        setTransactions(transactionsData.transactions);
        setTotalPages(transactionsData.totalPages);
        setSelectedTransactionIds([]);
        setError(null);
      } catch (err) {
        const transactionError = handleTransactionError(err, { action: 'fetchTransactions' });
        setError(transactionError.message);
      } finally {
        setLoading(false);
        setIsFiltering(false);
        isInitialMount.current = false;
      }
    },
    [page, typeFilter, categoryFilter, dateFrom, dateTo, searchTerm]
  );

  useEffect(() => {
    if (isInitialMount.current) {
      fetchData();
    } else {
      if (!debounceTimer.current) {
        fetchData();
      }
    }
  }, [fetchData]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setPage(1);
      fetchData(value);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const clearAllFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setDateFrom('');
    setDateTo('');
    setPage(1);
  };

  const handleRemoveFilter = (filterKey) => {
    switch (filterKey) {
      case 'searchTerm':
        setSearchTerm('');
        break;
      case 'typeFilter':
        setTypeFilter('all');
        break;
      case 'categoryFilter':
        setCategoryFilter('all');
        break;
      case 'dateFrom':
        setDateFrom('');
        break;
      case 'dateTo':
        setDateTo('');
        break;
      default:
        break;
    }
    setPage(1);
  };

  const handleOpenTransactionModal = (transaction = null) => {
    setEditingTransaction(transaction);
    setIsTransactionModalOpen(true);
  };

  const handleCloseTransactionModal = () => {
    setIsTransactionModalOpen(false);
    setEditingTransaction(null);
  };

  const handleOpenDetailsModal = (transaction) => {
    setViewingDetails(transaction);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setViewingDetails(null);
  };

  const handleFormSubmit = async (formData, id) => {
    try {
      if (id) {
        await transactionsService.updateTransaction(id, formData);
      } else {
        await transactionsService.createTransaction(formData);
      }
      fetchData();
      handleCloseTransactionModal();
      setError(null);
    } catch (err) {
      const transactionError = handleTransactionError(err, { action: 'saveTransaction', id });
      setError(transactionError.message);
    }
  };

  const handleDeleteTransaction = (id) => {
    setConfirmDialog({
      isOpen: true,
      type: 'delete',
      data: { id, count: 1 },
    });
  };

  const confirmDeleteTransaction = async () => {
    const { id } = confirmDialog.data;
    try {
      await transactionsService.deleteTransaction(id);
      setTransactions((prev) => {
        const updatedTransactions = prev.filter((t) => t._id !== id);
        if (updatedTransactions.length === 0 && page > 1) {
          setPage(page - 1);
        } else {
          fetchData();
        }
        return updatedTransactions;
      });
      setConfirmDialog({ isOpen: false, type: null, data: null });
      setError(null);
    } catch (err) {
      const transactionError = handleTransactionError(err, { action: 'deleteTransaction', id });
      setError(transactionError.message);
      setConfirmDialog({ isOpen: false, type: null, data: null });
    }
  };

  const toggleSelect = (id) => {
    setSelectedTransactionIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    setSelectedTransactionIds(selectedTransactionIds.length ? [] : transactions.map((t) => t._id));
  };

  const handleBulkDelete = () => {
    setConfirmDialog({
      isOpen: true,
      type: 'bulkDelete',
      data: { count: selectedTransactionIds.length },
    });
  };

  const confirmBulkDelete = async () => {
    const { count } = confirmDialog.data;
    try {
      await transactionsService.bulkDeleteTransactions(selectedTransactionIds);
      setSelectedTransactionIds([]);
      fetchData();
      setConfirmDialog({ isOpen: false, type: null, data: null });
      setError(null);
    } catch (err) {
      const transactionError = handleTransactionError(err, { action: 'bulkDelete', count });
      setError(transactionError.message);
      setConfirmDialog({ isOpen: false, type: null, data: null });
    }
  };

  const handleNewCategory = (newCategory, isIncome) => {
    if (isIncome) {
      setIncomeCategories((prev) => [...prev, newCategory].sort());
    } else {
      setExpenseCategories((prev) => [...prev, newCategory].sort());
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setConfirmDialog({
      isOpen: true,
      type: 'deleteCategory',
      data: { category: categoryToDelete },
    });
  };

  const confirmDeleteCategory = async () => {
    const { category } = confirmDialog.data;
    try {
      await transactionsService.deleteCategory(category);
      fetchData();
      setConfirmDialog({ isOpen: false, type: null, data: null });
      setError(null);
    } catch (err) {
      const transactionError = handleTransactionError(err, { action: 'deleteCategory', category });
      setError(transactionError.message);
      setConfirmDialog({ isOpen: false, type: null, data: null });
    }
  };

  const handleConfirm = () => {
    if (confirmDialog.type === 'delete') {
      confirmDeleteTransaction();
    } else if (confirmDialog.type === 'bulkDelete') {
      confirmBulkDelete();
    } else if (confirmDialog.type === 'deleteCategory') {
      confirmDeleteCategory();
    }
  };

  const handleCancel = () => {
    setConfirmDialog({ isOpen: false, type: null, data: null });
  };

  const getConfirmDialogProps = () => {
    switch (confirmDialog.type) {
      case 'delete':
        return {
          title: 'Delete Transaction',
          message: 'Are you sure you want to delete this transaction?',
          confirmLabel: 'Delete',
        };
      case 'bulkDelete':
        return {
          title: 'Delete Transactions',
          message: `Are you sure you want to permanently delete these ${confirmDialog.data.count} transactions? This action cannot be undone.`,
          confirmLabel: 'Delete',
        };
      case 'deleteCategory':
        return {
          title: 'Delete Category',
          message: `Are you sure you want to delete the category "${confirmDialog.data.category}"? All associated transactions will be moved to "Miscellaneous".`,
          confirmLabel: 'Delete',
        };
      default:
        return { title: '', message: '', confirmLabel: 'Confirm' };
    }
  };

  return (
    <>
      <TransactionHeader
        selectedCount={selectedTransactionIds.length}
        onBulkDelete={handleBulkDelete}
        onAddTransaction={() => handleOpenTransactionModal()}
        onManageCategories={() => setIsCategoryModalOpen(true)}
        onExportCSV={handleExportCSV}
      />

      <TransactionFilters
        searchTerm={searchTerm}
        typeFilter={typeFilter}
        categoryFilter={categoryFilter}
        dateFrom={dateFrom}
        dateTo={dateTo}
        categories={allCategories}
        onSearchChange={handleSearchChange}
        onTypeFilterChange={(e) => {
          setTypeFilter(e.target.value);
          setPage(1);
        }}
        onCategoryFilterChange={(e) => {
          setCategoryFilter(e.target.value);
          setPage(1);
        }}
        onDateFromChange={(e) => {
          setDateFrom(e.target.value);
          setPage(1);
        }}
        onDateToChange={(e) => {
          setDateTo(e.target.value);
          setPage(1);
        }}
        onClearFilters={clearAllFilters}
        onRemoveFilter={handleRemoveFilter}
      />

      {error && <ErrorNotification message={error} onClose={() => setError(null)} />}

      {loading ? (
        <Spinner />
      ) : (
        <>
          <TransactionTable
            transactions={transactions}
            currency={currency}
            selectedTransactionIds={selectedTransactionIds}
            onToggleSelect={toggleSelect}
            onSelectAll={handleSelectAll}
            onEdit={handleOpenTransactionModal}
            onDelete={handleDeleteTransaction}
            onViewDetails={handleOpenDetailsModal}
            isFiltering={isFiltering}
          />

          <TransactionPagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={handleCloseTransactionModal}
        onSubmit={handleFormSubmit}
        transaction={editingTransaction}
        expenseCategories={expenseCategories}
        incomeCategories={incomeCategories}
        onNewCategory={handleNewCategory}
        currentBalance={summaryData.balance}
      />

      <ManageCategoriesModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        expenseCategories={expenseCategories}
        incomeCategories={incomeCategories}
        onDelete={handleDeleteCategory}
      />

      <TransactionDetailModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        transaction={viewingDetails}
        currency={currency}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        {...getConfirmDialogProps()}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

export default TransactionsPage;
