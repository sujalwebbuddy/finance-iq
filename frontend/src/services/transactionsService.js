import api from '../api/axios';

export const transactionsService = {
  getSummary: async () => {
    const response = await api.get('/transactions/summary');
    return response.data;
  },

  getExpenseCategories: async () => {
    const response = await api.get('/transactions/categories/expense');
    return response.data;
  },

  getIncomeCategories: async () => {
    const response = await api.get('/transactions/categories/income');
    return response.data;
  },

  getTransactions: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.page) {
      params.append('page', filters.page.toString());
    }
    if (filters.limit) {
      params.append('limit', filters.limit.toString());
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.isIncome !== undefined && filters.isIncome !== null) {
      params.append('isIncome', filters.isIncome.toString());
    }
    if (filters.category) {
      params.append('category', filters.category);
    }
    if (filters.startDate) {
      params.append('startDate', filters.startDate);
    }
    if (filters.endDate) {
      params.append('endDate', filters.endDate);
    }

    const response = await api.get(`/transactions?${params.toString()}`);
    return response.data;
  },

  createTransaction: async (formData) => {
    const response = await api.post('/transactions', formData);
    return response.data;
  },

  updateTransaction: async (id, formData) => {
    const response = await api.put(`/transactions/${id}`, formData);
    return response.data;
  },

  deleteTransaction: async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },

  bulkDeleteTransactions: async (transactionIds) => {
    const response = await api.delete('/transactions/bulk', {
      data: { transactionIds },
    });
    return response.data;
  },

  deleteCategory: async (categoryToDelete) => {
    const response = await api.delete('/transactions/category', {
      data: { categoryToDelete },
    });
    return response.data;
  },

  getCharts: async () => {
    const response = await api.get('/transactions/charts');
    return response.data;
  },
};

export default transactionsService;

