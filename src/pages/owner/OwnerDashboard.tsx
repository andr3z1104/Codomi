
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, MessageSquare, Calendar, FileText, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserBuildingSelector from '@/components/UserBuildingSelector';

const OwnerDashboard: React.FC = () => {
  const { user, selectedBuilding } = useAuth();

  // Mock data para el dashboard
  const stats = [
    { title: 'Anuncios Nuevos', value: '3', icon: Bell, color: 'text-blue-600' },
    { title: 'Mensajes', value: '12', icon: MessageSquare, color: 'text-green-600' },
    { title: 'Próximos Eventos', value: '2', icon: Calendar, color: 'text-purple-600' },
    { title: 'Documentos', value: '8', icon: FileText, color: 'text-orange-600' },
  ];

  const recentAnnouncements = [
    { id: 1, title: 'Mantenimiento de Ascensores', date: '2024-01-15', urgent: true },
    { id: 2, title: 'Reunión de Propietarios', date: '2024-01-20', urgent: false },
    { id: 3, title: 'Corte de Agua Programado', date: '2024-01-18', urgent: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Building2 className="h-8 w-8 text-codomi-navy" />
        <div>
          <h1 className="text-3xl font-bold text-codomi-navy">Dashboard Propietario</h1>
          <p className="text-gray-600">Bienvenido, {user?.name}</p>
        </div>
      </div>

      {/* Selector de Edificio */}
      <UserBuildingSelector />

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Anuncios Recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Anuncios Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${announcement.urgent ? 'bg-red-500' : 'bg-gray-300'}`} />
                  <div>
                    <h3 className="font-semibold">{announcement.title}</h3>
                    <p className="text-sm text-gray-600">{announcement.date}</p>
                  </div>
                </div>
                {announcement.urgent && (
                  <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                    Urgente
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerDashboard;
