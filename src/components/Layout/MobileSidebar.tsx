
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Home, 
  User, 
  Calendar,
  MessageSquare,
  Plus,
  Search,
  Menu,
  Megaphone
} from 'lucide-react';

const MobileSidebar: React.FC = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const adminMenuItems = [
    { icon: Home, label: 'Panel de Control', path: '/admin' },
    { icon: User, label: 'Gestión de Propietarios', path: '/admin/owners' },
    { icon: Calendar, label: 'Gestión Financiera', path: '/admin/finance' },
    { icon: Search, label: 'Gestión de Recibos', path: '/admin/receipts' },
    { icon: Plus, label: 'Análisis de Datos', path: '/admin/analytics' },
    { icon: Home, label: 'Gestión de Edificios', path: '/admin/buildings' },
    { icon: Megaphone, label: 'Anuncios', path: '/admin/announcements' },
    { icon: MessageSquare, label: 'Comunicación', path: '/admin/communication' },
  ];

  const ownerMenuItems = [
    { icon: Home, label: 'Panel de Control', path: '/owner' },
    { icon: Megaphone, label: 'Anuncios', path: '/owner/announcements' },
    { icon: MessageSquare, label: 'Comunicación', path: '/owner/communication' },
    { icon: Search, label: 'Historial de Facturas', path: '/owner/invoices' },
    { icon: Calendar, label: 'Portal de Pagos', path: '/owner/payments' },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : ownerMenuItems;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-white">
        <nav className="mt-8">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-codomi-navy text-white'
                        : 'text-gray-700 hover:bg-codomi-gray hover:text-codomi-navy'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
