import api from '../api/axios';

export const receiptsService = {
  uploadReceipt: async (file) => {
    const formData = new FormData();
    formData.append('receipt', file);
    const response = await api.post('/receipts/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  saveTransactionFromReceipt: async (receiptId, transactionData) => {
    const response = await api.post('/receipts/save-transaction', {
      receiptId,
      transactionData,
    });
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/transactions/categories/expense');
    return response.data;
  },
};

export default receiptsService;

