
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NotificationDropdown from '@/components/NotificationDropdown';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className="main-header bg-codomi-navy text-white shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center ml-12 md:ml-0">
            <h1 className="logo text-xl md:text-2xl font-bold font-montserrat">
              CODOMI
            </h1>
            <span className="ml-2 text-xs md:text-sm opacity-80 hidden sm:block">
              Gestión de Condominios
            </span>
          </div>
          
          {user && (
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Notificaciones */}
              <NotificationDropdown />
              
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 text-white hover:bg-white/20 rounded-lg p-2 transition-colors cursor-pointer"
              >
                <User className="h-4 w-4 md:h-5 md:w-5" />
                <div className="text-right">
                  <p className="text-xs md:text-sm font-medium">{user.name}</p>
                  <p className="text-xs opacity-80 capitalize">
                    {user.role === 'admin' ? 'Administrador' : 'Propietario'}
                    {user.apartment && ` - ${user.apartment}`}
                  </p>
                </div>
              </button>
              
              <Button
                variant="outline-white"
                size="sm"
                onClick={logout}
                className="logout-button text-xs md:text-sm transition-all duration-200 hover:shadow-md"
              >
                <LogOut className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
