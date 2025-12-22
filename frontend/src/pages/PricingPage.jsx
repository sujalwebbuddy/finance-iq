import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';
import PricingHero from '../components/pricing/PricingHero';
import PricingPlans from '../components/pricing/PricingPlans';
import FeatureComparisonTable from '../components/pricing/FeatureComparisonTable';
import PricingFAQ from '../components/pricing/PricingFAQ';
import PricingCTA from '../components/pricing/PricingCTA';
import useAuth from '../hooks/useAuth';
import subscriptionService from '../services/subscriptionService';

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSelectPlan = async (planId) => {
    if (planId === 'enterprise') {
      return;
    }

    if (!user) {
      navigate('/register');
      return;
    }

    setLoading(true);
    try {
      const { url } = await subscriptionService.createCheckoutSession(planId);
      window.location.href = url;
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(scrollTimeout);
  },[]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <LandingHeader />
      <PricingHero />
      <PricingPlans
        currentPlan={user ? 'free' : null}
        onSelectPlan={handleSelectPlan}
        loading={loading}
      />
      <FeatureComparisonTable />
      <PricingFAQ />
      <PricingCTA />
      <LandingFooter />
    </div>
  );
};

export default PricingPage;

