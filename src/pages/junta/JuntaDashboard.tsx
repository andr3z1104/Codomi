
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, MessageSquare, Calendar, FileText, Building2, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserBuildingSelector from '@/components/UserBuildingSelector';

const JuntaDashboard: React.FC = () => {
  const { user, selectedBuilding } = useAuth();

  // Mock data para el dashboard
  const stats = [
    { title: 'Anuncios Publicados', value: '15', icon: Bell, color: 'text-blue-600' },
    { title: 'Mensajes Pendientes', value: '8', icon: MessageSquare, color: 'text-green-600' },
    { title: 'Próximos Eventos', value: '4', icon: Calendar, color: 'text-purple-600' },
    { title: 'Propietarios', value: '45', icon: Users, color: 'text-orange-600' },
  ];

  const recentActivity = [
    { id: 1, action: 'Anuncio publicado', description: 'Mantenimiento de jardines', date: '2024-01-15' },
    { id: 2, action: 'Mensaje enviado', description: 'Respuesta a consulta sobre gastos', date: '2024-01-14' },
    { id: 3, action: 'Evento creado', description: 'Reunión mensual de junta', date: '2024-01-13' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Building2 className="h-8 w-8 text-codomi-navy" />
        <div>
          <h1 className="text-3xl font-bold text-codomi-navy">Dashboard Junta</h1>
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

      {/* Actividad Reciente */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{activity.action}</h3>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JuntaDashboard;
