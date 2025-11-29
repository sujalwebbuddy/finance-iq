import React from 'react';
import ContactMethodCard from './ContactMethodCard';
import EmailIcon from '../icons/EmailIcon';
import TwitterIcon from '../icons/TwitterIcon';
import FacebookIcon from '../icons/FacebookIcon';
import InstagramIcon from '../icons/InstagramIcon';

const ContactMethods = () => {
  const contactMethods = [
    {
      icon: <EmailIcon className="h-6 w-6" />,
      title: 'Email Us',
      description: 'Send us an email anytime',
      details: 'support@financeiq.com',
      action: 'mailto:support@financeiq.com',
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: 'Call Us',
      description: 'Mon to Fri from 9am to 5pm',
      details: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: 'Office',
      description: 'Come say hello at our office',
      details: '123 Financial District, San Francisco, CA 94105',
      action: 'https://maps.google.com',
    },
    // {
    //   icon: (
    //     <svg
    //       className="h-6 w-6"
    //       fill="none"
    //       stroke="currentColor"
    //       viewBox="0 0 24 24"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth={2}
    //         d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
    //       />
    //     </svg>
    //   ),
    //   title: 'Live Chat',
    //   description: 'Instant help from our team',
    //   details: 'Available 24/7 for premium users',
    //   action: '#chat',
    // },
  ];

  const socialLinks = [
    { icon: <FacebookIcon className="h-5 w-5" />, label: 'Facebook', href: '#' },
    { icon: <TwitterIcon className="h-5 w-5" />, label: 'Twitter', href: '#' },
    { icon: <InstagramIcon className="h-5 w-5" />, label: 'Instagram', href: '#' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Get in touch
      </h2>
      <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
        Have questions about our financial management tools? Our team is here to help you achieve your financial goals.
      </p>

      <div className="space-y-4 mb-10">
        {contactMethods.map((method, index) => (
          <ContactMethodCard
            key={index}
            icon={method.icon}
            title={method.title}
            description={method.description}
            details={method.details}
            action={method.action}
          />
        ))}
      </div>

      <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Follow us
        </h3>
        <div className="flex items-center gap-3">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center hover:bg-teal-500 dark:hover:bg-teal-600 hover:text-white transition-colors"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactMethods;

