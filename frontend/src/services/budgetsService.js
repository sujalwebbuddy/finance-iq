import api from '../api/axios';

export const budgetsService = {
  getBudgets: async () => {
    const response = await api.get('/budgets');
    return response.data;
  },

  createBudget: async (formData) => {
    const response = await api.post('/budgets', formData);
    return response.data;
  },

  updateBudget: async (id, formData) => {
    const response = await api.put(`/budgets/${id}`, formData);
    return response.data;
  },

  deleteBudget: async (id) => {
    const response = await api.delete(`/budgets/${id}`);
    return response.data;
  },
};

export default budgetsService;

