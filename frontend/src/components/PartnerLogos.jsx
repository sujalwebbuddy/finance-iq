import React, { useState } from 'react';

const PartnerLogos = () => {
  const [imageErrors, setImageErrors] = useState({});

  const partners = [
    { name: 'WebMoney', logo: '/placeholder-webmoney-logo.svg' },
    { name: 'Western Union', logo: '/placeholder-western-union-logo.svg' },
    { name: 'stripe', logo: '/placeholder-stripe-logo.svg' },
    { name: 'VISA', logo: '/placeholder-visa-logo.svg' },
    { name: 'PayPal', logo: '/placeholder-paypal-logo.svg' },
  ];

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section className="py-12 px-6 lg:px-8 bg-gray-100 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text */}
          <p className="text-base text-gray-600 dark:text-gray-400 text-center md:text-left whitespace-nowrap">
            Supported by international financial managers.
          </p>

          {/* Logos Container - Horizontal Scroll on Mobile */}
          <div className="flex-1 w-full md:w-auto overflow-x-auto md:overflow-x-visible">
            <div className="flex items-center gap-6 md:gap-8 lg:gap-12 min-w-max md:min-w-0">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center h-8 md:h-10 lg:h-12"
                >
                  {imageErrors[index] ? (
                    <span className="text-gray-400 dark:text-gray-500 text-xs md:text-sm font-medium">
                      {partner.name}
                    </span>
                  ) : (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-full w-auto opacity-60 dark:opacity-40 grayscale hover:opacity-100 dark:hover:opacity-60 transition-opacity"
                      onError={() => handleImageError(index)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;

