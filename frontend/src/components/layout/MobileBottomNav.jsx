import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '../icons/HomeIcon';
import TransactionIcon from '../icons/TransactionIcon';
import ReceiptIcon from '../icons/ReceiptIcon';
import TargetIcon from '../icons/TargetIcon';
import RefreshIcon from '../icons/RefreshIcon';
import SettingsIcon from '../icons/SettingsIcon';

const MobileBottomNav = () => {
  const navItems = [
    { label: 'Dashboard', to: '/dashboard', icon: HomeIcon },
    { label: 'Transactions', to: '/transactions', icon: TransactionIcon },
    { label: 'Receipts', to: '/receipts', icon: ReceiptIcon },
    { label: 'Budgets', to: '/budgets', icon: TargetIcon },
    { label: 'Recurring', to: '/recurring-transactions', icon: RefreshIcon },
    { label: 'Settings', to: '/settings', icon: SettingsIcon },
  ];

  const getNavLinkClass = ({ isActive }) => {
    const baseClasses = 'flex flex-col items-center justify-center gap-1 py-2 px-2 min-w-0 flex-1 transition-colors';
    if (isActive) {
      return `${baseClasses} text-teal-500 dark:text-teal-400`;
    }
    return `${baseClasses} text-gray-600 dark:text-gray-400`;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink key={item.to} to={item.to} className={getNavLinkClass}>
              <IconComponent className="h-5 w-5 flex-shrink-0" />
              <span className="text-xs font-medium text-center leading-tight">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;

