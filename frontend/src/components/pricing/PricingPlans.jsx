import React from 'react';
import PlanSelector from '../subscription/PlanSelector';

const PricingPlans = ({ currentPlan, onSelectPlan, loading }) => {
  return (
    <section className="py-16 px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <PlanSelector
          currentPlan={currentPlan}
          onSelectPlan={onSelectPlan}
          loading={loading}
        />
      </div>
    </section>
  );
};

export default PricingPlans;

