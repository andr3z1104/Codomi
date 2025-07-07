
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminDashboard: React.FC = () => {
  const notifications = [
    { id: 1, type: 'warning', message: '3 propietarios con pagos atrasados', priority: 'alta' },
    { id: 2, type: 'info', message: 'Mantenimiento programado para el 15/12', priority: 'media' },
    { id: 3, type: 'success', message: 'Pago de gastos comunes procesado', priority: 'baja' },
  ];

  const metrics = [
    { title: 'Morosidad', value: '12%', change: '-2%', type: 'negative' },
    { title: 'Ingresos del Mes', value: '$45,200', change: '+8%', type: 'positive' },
    { title: 'Gastos Pendientes', value: '$8,500', change: '0%', type: 'neutral' },
    { title: 'Unidades al Día', value: '88%', change: '+5%', type: 'positive' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-codomi-navy">Panel de Control</h1>
        <Badge variant="outline" className="text-sm">
          Administrador
        </Badge>
      </div>

      {/* Notifications */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-codomi-navy">Notificaciones</h2>
        {notifications.map((notification) => (
          <Alert key={notification.id} className="border-l-4 border-l-codomi-navy">
            <AlertDescription className="flex justify-between items-center">
              <span>{notification.message}</span>
              <Badge 
                variant={notification.priority === 'alta' ? 'destructive' : 'secondary'}
                className="text-xs"
              >
                {notification.priority}
              </Badge>
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription className="text-sm font-medium">
                {metric.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-codomi-navy">
                {metric.value}
              </div>
              <div className={`text-sm flex items-center mt-1 ${
                metric.type === 'positive' ? 'text-green-600' :
                metric.type === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.change} vs mes anterior
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-codomi-navy">Transacciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { owner: 'María López', apt: 'Apt 201', amount: '$420', type: 'Pago', date: '10/12/2024' },
              { owner: 'Juan Pérez', apt: 'Apt 305', amount: '$380', type: 'Pago', date: '09/12/2024' },
              { owner: 'Ana Martínez', apt: 'Apt 102', amount: '$420', type: 'Pago', date: '08/12/2024' },
            ].map((transaction, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium">{transaction.owner}</p>
                  <p className="text-sm text-gray-600">{transaction.apt}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{transaction.amount}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
