import React from 'react';
import { Link } from 'react-router-dom';

const FooterNavigation = () => {
  const navigationSections = [
    {
      title: 'About',
      links: [
        { label: 'About us', to: '/about' },
        { label: 'Features', to: '/features' },
        { label: 'Blog', to: '/blog' },
        { label: 'Pricing', to: '/pricing' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'How we work', to: '/how-we-work' },
        { label: 'Press Room', to: '/press' },
        { label: 'Jobs', to: '/jobs' },
        { label: 'Community', to: '/community' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of use', to: '/terms' },
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Security Policy', to: '/security' },
        { label: 'Cookie Settings', to: '/cookies' },
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

