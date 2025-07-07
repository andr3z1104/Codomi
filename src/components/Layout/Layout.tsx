
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-codomi-gray">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
