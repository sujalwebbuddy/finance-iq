import React, { useState, useEffect, useCallback } from 'react';
import TransactionModal from '../components/TransactionModal';
import useTheme from '../hooks/useTheme';
import dashboardService from '../services/dashboardService';
import transactionsService from '../services/transactionsService';
import { handleTransactionError } from '../utils/errorHandler';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SummaryCard from '../components/dashboard/SummaryCard';
import CategoryChartCard from '../components/dashboard/CategoryChartCard';
import ActivityChartCard from '../components/dashboard/ActivityChartCard';
import LineChartCard from '../components/dashboard/LineChartCard';
import ErrorNotification from '../components/transactions/ErrorNotification';

const DashboardPage = () => {
  const [summaryData, setSummaryData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });
  const [chartData, setChartData] = useState(null);
  const [categoryView, setCategoryView] = useState('expense');
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [summaryData, chartData, expenseCategories, incomeCategories] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getCharts(),
        dashboardService.getExpenseCategories(),
        dashboardService.getIncomeCategories(),
      ]);

      setSummaryData(summaryData);
      setChartData(chartData);
      setExpenseCategories(expenseCategories);
      setIncomeCategories(incomeCategories);
      setRecentTransactions(summaryData.recentTransactions || []);
      setError(null);
    } catch (err) {
      const transactionError = handleTransactionError(err, { action: 'fetchDashboardData' });
      setError(transactionError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const validateFormData = (formData) => {
    const errors = [];
    if (!formData.name || formData.name.trim() === '') {
      errors.push('Please enter a name for the transaction');
    }
    if (!formData.cost || isNaN(formData.cost) || Number(formData.cost) <= 0) {
      errors.push('Please enter a valid cost greater than 0');
    }
    if (!formData.category || formData.category.trim() === '') {
      errors.push('Please select a category');
    }
    return errors;
  };

  const handleFormSubmit = async (formData, id) => {
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      setError(validationErrors[0]);
      return;
    }

    try {
      if (id) {
        await transactionsService.updateTransaction(id, formData);
      } else {
        await transactionsService.createTransaction(formData);
      }
      fetchData();
      handleCloseModal();
      setError(null);
    } catch (err) {
      const transactionError = handleTransactionError(err, { action: 'saveTransaction', id });
      setError(transactionError.message);
    }
  };

  const handleNewCategory = (newCategory, isIncome) => {
    if (isIncome) {
      setIncomeCategories((prev) => [...prev, newCategory].sort());
    } else {
      setExpenseCategories((prev) => [...prev, newCategory].sort());
    }
  };

  const summaryCards = [
    {
      title: 'Total Income',
      value: summaryData.totalIncome,
      accentColor: 'bg-green-500 dark:bg-green-400',
    },
    {
      title: 'Total Expenses',
      value: summaryData.totalExpenses,
      accentColor: 'bg-red-500 dark:bg-red-400',
    },
    {
      title: 'Available Balance',
      value: summaryData.balance,
      accentColor: 'bg-teal-500 dark:bg-teal-400',
    },
  ];

  return (
    <>
      <DashboardHeader onAddTransaction={handleOpenModal} />

      {error && <ErrorNotification message={error} onClose={() => setError(null)} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {summaryCards.map((card) => (
          <SummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            accentColor={card.accentColor}
            loading={loading}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <CategoryChartCard
          categoryView={categoryView}
          onViewChange={setCategoryView}
          chartData={chartData}
          theme={theme}
          loading={loading}
        />

        <ActivityChartCard
          chartData={chartData}
          recentTransactions={recentTransactions}
          theme={theme}
          loading={loading}
        />

        <LineChartCard
          title="Income Trend"
          subtitle="Track your income over the last 30 days"
          data={chartData?.incomeOverTime}
          theme={theme}
          loading={loading}
        />

        <LineChartCard
          title="Spending Trend"
          subtitle="Monitor your expenses over the last 30 days"
          data={chartData?.expensesOverTime}
          theme={theme}
          loading={loading}
        />
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        expenseCategories={expenseCategories}
        incomeCategories={incomeCategories}
        onNewCategory={handleNewCategory}
        currentBalance={summaryData.balance}
      />
    </>
  );
};

export default DashboardPage;
