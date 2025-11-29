import React, { useState } from 'react';
import TwitterIcon from '../icons/TwitterIcon';
import FacebookIcon from '../icons/FacebookIcon';
import InstagramIcon from '../icons/InstagramIcon';

const BlogHeader = () => {
  const [email, setEmail] = useState('');

  const socialLinks = [
    { icon: <TwitterIcon className="h-5 w-5" />, label: 'Twitter', href: '#' },
    { icon: <FacebookIcon className="h-5 w-5" />, label: 'Facebook', href: '#' },
    { icon: <InstagramIcon className="h-5 w-5" />, label: 'Instagram', href: '#' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribing email:', email);
      setEmail('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
      <div className="space-y-8">
        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
          Explore and spread<br />Our Blog
        </h2>
        
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email.."
            className="flex-1 px-5 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 text-base"
          />
          <button
            type="submit"
            className="px-8 py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 dark:from-teal-500 dark:to-teal-700 text-white font-semibold rounded-xl hover:from-teal-500 hover:to-teal-700 dark:hover:from-teal-600 dark:hover:to-teal-800 transition-all whitespace-nowrap shadow-md"
          >
            Subscribe
          </button>
        </form>
      </div>

      <div className="space-y-8 flex flex-col justify-center">
        <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-[1.7] tracking-normal">
          Follow our developments and the blogs we provide. Lots of interesting articles about finance, budgeting, and smart money management. Stay updated with the latest tips, insights, and strategies to achieve your financial goals.
        </p>
        
        <div className="flex items-center gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="w-11 h-11 rounded-full bg-gray-800 dark:bg-gray-700 text-white flex items-center justify-center hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
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

export default BlogHeader;

