import api from '../api/axios';

/**
 * Set authentication token in localStorage and axios headers
 * @param {string|null} token - Authentication token or null to clear
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

/**
 * Handle authentication success
 * Sets token, user data, and navigates to appropriate route
 * @param {string} token - Authentication token
 * @param {Object} userData - User data object
 * @param {Function} navigate - React Router navigate function
 * @param {Function} setToken - State setter for token
 * @param {Function} setUser - State setter for user
 * @param {Function} setPendingToast - State setter for pending toast
 */
export const handleAuthSuccess = (token, userData, navigate, setToken, setUser, setPendingToast) => {
  setToken(token);
  setUser(userData);
  setAuthToken(token);
  
  setPendingToast({ type: 'success', message: 'Authentication successful!' });
  
  if (!userData.isSetupComplete) {
    navigate('/setup');
  } else {
    navigate('/dashboard');
  }
};

/**
 * Handle authentication errors
 * Extracts error message and sets pending toast
 * @param {Error} error - Error object
 * @param {Function} setPendingToast - State setter for pending toast
 * @param {string} defaultMessage - Default error message if none found
 * @throws {Error} Throws error with appropriate message
 */
export const handleAuthError = (error, setPendingToast, defaultMessage) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  setPendingToast({ type: 'error', message: errorMessage });
  throw new Error(errorMessage);
};

