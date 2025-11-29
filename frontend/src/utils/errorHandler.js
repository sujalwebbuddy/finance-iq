class TransactionError extends Error {
  constructor(message, code, context) {
    super(message);
    this.name = 'TransactionError';
    this.code = code;
    this.context = context;
  }
}

export const handleTransactionError = (error, context = {}) => {
  if (error.response) {
    const message = error.response.data?.message || 'An error occurred';
    return new TransactionError(message, error.response.status, context);
  }
  return new TransactionError(error.message || 'An unexpected error occurred', 'UNKNOWN', context);
};

export { TransactionError };

