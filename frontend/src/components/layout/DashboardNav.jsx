import React from 'react';
import { NavLink } from 'react-router-dom';
import useResize from '../../hooks/useResize';

const DashboardNav = () => {
  const isMobile = useResize(1024);

  const navItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Transactions', to: '/transactions' },
    { label: 'Receipts', to: '/receipts' },
    { label: 'Budgets', to: '/budgets' },
    { label: 'Recurring Transactions', to: '/recurring-transactions' },
    { label: 'Settings', to: '/settings' },
  ];

  const getNavLinkClass = ({ isActive }) => {
    const baseClasses = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors';
    if (isActive) {
      return `${baseClasses} bg-teal-500 dark:bg-teal-600 text-white`;
    }
    return `${baseClasses} text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white`;
  };

  if (isMobile) {
    return null;
  }

  return (
    <nav>
      <div className="ml-10 flex items-center gap-2">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={getNavLinkClass}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default DashboardNav;

