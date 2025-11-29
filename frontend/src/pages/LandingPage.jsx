import React from 'react';
import LandingHeader from '../components/LandingHeader';
import HeroSection from '../components/HeroSection';
import PartnerLogos from '../components/PartnerLogos';
import ValueProposition from '../components/ValueProposition';
import FeatureCards from '../components/FeatureCards';
import BudgetExpenseSection from '../components/BudgetExpenseSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';
import LandingFooter from '../components/LandingFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <LandingHeader />
      <HeroSection />
      <PartnerLogos />
      <ValueProposition />
      <FeatureCards />
      <BudgetExpenseSection />
      <TestimonialsSection />
      <BlogSection />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;