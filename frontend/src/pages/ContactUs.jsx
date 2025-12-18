import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';
import ContactHero from '../components/contact/ContactHero';
import ContactMethods from '../components/contact/ContactMethods';
import ContactForm from '../components/contact/ContactForm';
import FAQ from '../components/contact/FAQ';

const ContactUs = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#faq') {
      setTimeout(() => {
        const faqSection = document.getElementById('faq');
        if (faqSection) {
          faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <LandingHeader />
      
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ContactHero />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <ContactMethods />
            </div>

            <div className="lg:col-span-2 space-y-8">
              <ContactForm />
              <FAQ />
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default ContactUs;
