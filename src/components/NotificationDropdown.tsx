
import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  urgent?: boolean;
}

const NotificationDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Mantenimiento de Ascensores',
      message: 'Programado para el próximo lunes',
      date: '2024-01-15',
      read: false,
      urgent: true
    },
    {
      id: 2,
      title: 'Reunión de Propietarios',
      message: 'Reunión ordinaria mensual',
      date: '2024-01-20',
      read: false,
      urgent: false
    },
    {
      id: 3,
      title: 'Corte de Agua Programado',
      message: 'De 9:00 AM a 2:00 PM',
      date: '2024-01-18',
      read: true,
      urgent: true
    },
    {
      id: 4,
      title: 'Pago de Gastos Comunes',
      message: 'Recordatorio de vencimiento',
      date: '2024-01-12',
      read: false,
      urgent: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const removeNotification = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className={`h-5 w-5 ${unreadCount > 0 ? 'text-yellow-500' : 'text-gray-600'}`} />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
        <div className="p-2 border-b">
          <h3 className="font-semibold text-sm">Notificaciones</h3>
          {unreadCount > 0 && (
            <p className="text-xs text-gray-600">{unreadCount} sin leer</p>
          )}
        </div>
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No hay notificaciones
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="p-0 focus:bg-gray-50"
              onSelect={() => markAsRead(notification.id)}
            >
              <div className="w-full p-3 relative">
                <button
                  onClick={(e) => removeNotification(notification.id, e)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
                <div className="pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                      {notification.title}
                    </h4>
                    {notification.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgente
                      </Badge>
                    )}
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{notification.message}</p>
                  <p className="text-xs text-gray-400">{notification.date}</p>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
