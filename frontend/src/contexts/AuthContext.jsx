import React, { createContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { setAuthToken, handleAuthSuccess, handleAuthError } from '../utils/authUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [pendingToast, setPendingToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        setAuthToken(storedToken);
        try {
          const userData = await authService.getMe();
          setUser(userData);
        } catch (error) {
          setUser(null);
          setToken(null);
          setAuthToken(null);
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, []);

  useEffect(() => {
    if (pendingToast) {
      toast[pendingToast.type](pendingToast.message);
      setPendingToast(null);
    }
  }, [pendingToast]);

  const login = useCallback(async (email, password) => {
    try {
      const { token: newToken, ...userData } = await authService.login(email, password);
      handleAuthSuccess(newToken, userData, navigate, setToken, setUser, setPendingToast);
    } catch (error) {
      handleAuthError(error, setPendingToast, 'Login failed. Please try again.');
    }
  }, [navigate]);

  const signup = useCallback(async (email, password) => {
    try {
      const { token: newToken, ...userData } = await authService.signup(email, password);
      setToken(newToken);
      setUser(userData);
      setAuthToken(newToken);
      setPendingToast({ type: 'success', message: 'Signup successful!' });
      navigate('/setup');
    } catch (error) {
      handleAuthError(error, setPendingToast, 'Signup failed. Please try again.');
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setPendingToast({ type: 'info', message: 'Logged out successfully.' });
    setUser(null);
    setToken(null);
    setAuthToken(null);
    navigate('/login');
  }, [navigate]);

  const setup = useCallback(async (defaultCurrency) => {
    try {
      const userData = await authService.completeSetup(defaultCurrency);
      setUser(userData);
      navigate('/dashboard');
    } catch (error) {
      handleAuthError(error, setPendingToast, 'Setup failed. Please try again.');
    }
  }, [navigate]);

  const initiateGoogleAuth = useCallback(() => {
    window.location.href = authService.getGoogleAuthUrl();
  }, []);

  const forgotPassword = useCallback(async (email) => {
    try {
      const result = await authService.forgotPassword(email);
      setPendingToast({ type: 'success', message: result.message });
      return result;
    } catch (error) {
      handleAuthError(error, setPendingToast, 'Failed to send reset email. Please try again.');
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (token, password) => {
    try {
      const result = await authService.resetPassword(token, password);
      setPendingToast({ type: 'success', message: result.message });
      return result;
    } catch (error) {
      handleAuthError(error, setPendingToast, 'Failed to reset password. Please try again.');
      throw error;
    }
  }, []);

  const handleGoogleCallback = useCallback((data) => {
    const { token: newToken, userId, email, isSetupComplete, defaultCurrency } = data;
    const userData = {
      _id: userId,
      email: email,
      isSetupComplete: isSetupComplete === 'true' || isSetupComplete === true,
      defaultCurrency: defaultCurrency || 'USD',
    };
    handleAuthSuccess(newToken, userData, navigate, setToken, setUser, setPendingToast);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      signup,
      logout,
      setup,
      forgotPassword,
      resetPassword,
      initiateGoogleAuth,
      handleGoogleCallback,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;