import React from 'react';
import SetVolumeCard from './budget/SetVolumeCard';
import SuccessCard from './budget/SuccessCard';
import ExpenditureCard from './budget/ExpenditureCard';
import ExpenseList from './budget/ExpenseList';
import TrackingSection from './budget/TrackingSection';
import DoubleArrowIcon from './icons/DoubleArrowIcon';

const BudgetExpenseSection = () => {
  return (
    <section className="py-20 px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div
            className="relative rounded-3xl p-8 lg:p-10 text-white overflow-hidden"
            style={{
              background: 'linear-gradient(to bottom right,rgb(38, 109, 98),rgb(83, 154, 121),rgb(165, 233, 198))',
            }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-8">
              We will set a limit for your spending target costume
            </h2>

            <p className="text-lg mb-8 opacity-90 leading-8">
              Customize as you like according to your needs. We will provide what you need to manage
            </p>

            <div className="flex items-center gap-4">
              <SetVolumeCard />
              <SuccessCard />
            </div>
          </div>

          <div className="space-y-6 bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 lg:p-10">
            <div className="flex items-center gap-4 flex-col md:flex-row">
              <ExpenditureCard />
              <div className="flex-shrink-0 w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center shadow-lg z-10">
                <DoubleArrowIcon className="h-6 w-6 text-white rotate-90 md:rotate-0" />
              </div>
              <ExpenseList />
            </div>
            <TrackingSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetExpenseSection;

