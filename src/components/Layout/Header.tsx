
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-codomi-navy text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center ml-12 md:ml-0">
            <h1 className="text-xl md:text-2xl font-bold font-montserrat">
              CODOMI
            </h1>
            <span className="ml-2 text-xs md:text-sm opacity-80 hidden sm:block">
              Gestión de Condominios
            </span>
          </div>
          
          {user && (
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 md:h-5 md:w-5" />
                <div className="text-right">
                  <p className="text-xs md:text-sm font-medium">{user.name}</p>
                  <p className="text-xs opacity-80 capitalize">
                    {user.role === 'admin' ? 'Administrador' : 'Propietario'}
                    {user.apartment && ` - ${user.apartment}`}
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-white text-white hover:bg-white hover:text-codomi-navy text-xs md:text-sm"
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
