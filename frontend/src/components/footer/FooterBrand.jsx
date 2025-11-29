import React from 'react';
import LogoIcon from '../icons/LogoIcon';
import TwitterIcon from '../icons/TwitterIcon';
import FacebookIcon from '../icons/FacebookIcon';
import InstagramIcon from '../icons/InstagramIcon';
import { APP_NAME } from '../../config/app';

const FooterBrand = () => {
  const socialLinks = [
    { icon: <TwitterIcon className="h-5 w-5" />, label: 'Twitter', href: '#' },
    { icon: <FacebookIcon className="h-5 w-5" />, label: 'Facebook', href: '#' },
    { icon: <InstagramIcon className="h-5 w-5" />, label: 'Instagram', href: '#' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <LogoIcon className="h-8 w-8 text-teal-500 dark:text-teal-400" />
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{APP_NAME}</span>
      </div>
      
      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
        Your intelligent financial companion. Manage expenses, track budgets, and achieve financial goals with AI-powered insights and smart automation.
      </p>
      
      <div className="flex items-center gap-3">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            className="w-10 h-10 rounded-full bg-teal-500 dark:bg-teal-600 text-white flex items-center justify-center hover:bg-teal-600 dark:hover:bg-teal-700 transition-colors"
            aria-label={social.label}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterBrand;

