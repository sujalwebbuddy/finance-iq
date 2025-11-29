import api from '../api/axios';
import { handleTransactionError } from './errorHandler';

export const handleExportCSV = async () => {
  try {
    const res = await api.get('/transactions/export', {
      responseType: 'blob',
    });
    const blob = new Blob([res.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financeIQ_transactions.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    handleTransactionError(error, { action: 'exportCSV' });
  }
};