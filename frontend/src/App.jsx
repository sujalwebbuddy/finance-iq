import React, { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import SetupProtectedRoute from './components/SetupProtectedRoute';
import Spinner from './components/Spinner';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const SetupPage = lazy(() => import('./pages/SetupPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'));
const ReceiptsPage = lazy(() => import('./pages/ReceiptsPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Budgets = lazy(() => import('./pages/Budgets'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const RecurringTransactions = lazy(
  () => import('./pages/RecurringTransactions'),
);
const GoogleAuthCallback = lazy(
  () => import('./pages/GoogleAuthCallback'),
);

function App() {
  return (
    <Suspense fallback={<Spinner/>}>
      <>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/auth/google/callback"
            element={<GoogleAuthCallback />}
          />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          {/* Protected Routes */}
          <Route
            path="/setup"
            element={
              <ProtectedRoute>
                <SetupPage />
              </ProtectedRoute>
            }
          />
          {/* Protected Routes Wrapper */}
          <Route
            element={
              <SetupProtectedRoute>
                <Layout />
              </SetupProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/receipts" element={<ReceiptsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route
              path="/recurring-transactions"
              element={<RecurringTransactions />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          autoClose={3000}
          closeOnClick
          draggable
          theme="light"
        />
      </>
    </Suspense>
  );
}

export default App;
