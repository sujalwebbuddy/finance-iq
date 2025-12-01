import React from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useResize from '../hooks/useResize';
import DashboardHeader from './layout/DashboardHeader';
import MobileBottomNav from './layout/MobileBottomNav';

const Layout = () => {
  const isMobile = useResize(1024);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <DashboardHeader />
      <main className={isMobile ? 'pb-16' : ''}>
        <div className="max-w-7xl mx-auto py-8 px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      {isMobile && <MobileBottomNav />}
    </div>
  );
};

export default Layout;
