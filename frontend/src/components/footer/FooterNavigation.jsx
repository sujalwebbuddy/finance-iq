import React from 'react';
import { Link } from 'react-router-dom';

const FooterNavigation = () => {
  const navigationSections = [
    {
      title: 'About',
      links: [
        { label: 'Contact us', to: '/contact' },
        { label: 'FAQ', to: '/contact#faq' },
        { label: 'Blog', to: '/#blogs' },
        { label: 'Pricing', to: '/pricing' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of use', to: '/terms' },
        { label: 'Privacy Policy', to: '/privacy' },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
      {navigationSections.map((section, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            {section.title}
          </h3>
          <ul className="space-y-3">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link
                  to={link.to}
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterNavigation;

