import api from '../api/axios';

export const dashboardService = {
  getSummary: async () => {
    const response = await api.get('/transactions/summary');
    return response.data;
  },

  getCharts: async () => {
    const response = await api.get('/transactions/charts');
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
};

export default dashboardService;

