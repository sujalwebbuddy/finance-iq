import React from 'react';
import FooterBrand from './footer/FooterBrand';
import FooterNavigation from './footer/FooterNavigation';
import FooterCopyright from './footer/FooterCopyright';

const LandingFooter = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          <FooterBrand />
          <FooterNavigation />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
};

export default LandingFooter;

