import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';

const GoogleAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleGoogleCallback } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) {
      return;
    }

    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');
    const isSetupComplete = searchParams.get('isSetupComplete') === 'true';
    const defaultCurrency = searchParams.get('defaultCurrency') || 'USD';

    const error = searchParams.get('error');

    if (error) {
      hasProcessed.current = true;
      navigate('/login?error=' + encodeURIComponent(error));
      return;
    }

    if (token && userId && email) {
      hasProcessed.current = true;
      handleGoogleCallback({
        token,
        userId,
        email,
        isSetupComplete,
        defaultCurrency,
      });
    } else {
      hasProcessed.current = true;
      navigate('/login?error=invalid_callback');
    }
  }, [searchParams, navigate, handleGoogleCallback]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <Spinner />
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Completing sign in...
        </p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;

