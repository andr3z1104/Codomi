
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!user) {
    return (
      <div className="min-h-screen bg-codomi-gray flex flex-col w-full">
        <Header />
        <main className="flex-1 w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-codomi-gray flex flex-col w-full">
      <Header />
      <div className="flex flex-1 w-full">
        {isMobile ? <MobileSidebar /> : <Sidebar />}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
