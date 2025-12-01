import api from '../api/axios';

export const recurringTransactionsService = {
  getRecurringTransactions: async () => {
    const response = await api.get('/recurring');
    return response.data || [];
  },

  createRecurringTransaction: async (formData) => {
    const response = await api.post('/recurring/create', formData);
    return response.data;
  },

  updateRecurringTransaction: async (id, formData) => {
    const response = await api.put(`/recurring/${id}`, formData);
    return response.data;
  },

  deleteRecurringTransaction: async (id) => {
    const response = await api.delete(`/recurring/${id}`);
    return response.data;
  },
};

export default recurringTransactionsService;

