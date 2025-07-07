
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!user) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-codomi-gray">
      <Header />
      <div className="flex">
        {isMobile ? <MobileSidebar /> : <Sidebar />}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
