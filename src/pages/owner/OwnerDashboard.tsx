
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();

  const financialData = {
    debt: 0,
    credit: 150,
    balance: 150,
    currentFee: 420,
    dueDate: '15/12/2024'
  };

  const recentPayments = [
    { month: 'Noviembre 2024', amount: '$420', status: 'Pagado', date: '10/11/2024' },
    { month: 'Octubre 2024', amount: '$420', status: 'Pagado', date: '08/10/2024' },
    { month: 'Septiembre 2024', amount: '$420', status: 'Pagado', date: '12/09/2024' },
  ];

  const announcements = [
    { id: 1, title: 'Mantenimiento de Ascensores', date: '12/12/2024', type: 'info' },
    { id: 2, title: 'Reunión de Consorcio', date: '20/12/2024', type: 'important' },
    { id: 3, title: 'Horarios de Limpieza', date: '10/12/2024', type: 'info' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-codomi-navy">Bienvenido, {user?.name}</h1>
          <p className="text-gray-600 mt-1">{user?.apartment}</p>
        </div>
        <Badge variant="outline" className="text-sm">
          Propietario
        </Badge>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardDescription>Deuda Pendiente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ${financialData.debt}
            </div>
            <p className="text-sm text-gray-600 mt-1">Sin deudas pendientes</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardDescription>Saldo a Favor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${financialData.credit}
            </div>
            <p className="text-sm text-gray-600 mt-1">Pagos adelantados</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-codomi-navy">
          <CardHeader className="pb-2">
            <CardDescription>Balance Total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-codomi-navy">
              ${financialData.balance}
            </div>
            <p className="text-sm text-gray-600 mt-1">Estado favorable</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Fee */}
      <Card>
        <CardHeader>
          <CardTitle className="text-codomi-navy">Cuota Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-codomi-navy">
                ${financialData.currentFee}
              </p>
              <p className="text-sm text-gray-600">
                Vencimiento: {financialData.dueDate}
              </p>
            </div>
            <Button className="bg-codomi-navy hover:bg-codomi-navy-dark">
              Pagar Ahora
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-codomi-navy">Avisos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {announcements.map((announcement) => (
              <Alert key={announcement.id} className="border-l-4 border-l-codomi-navy">
                <AlertDescription className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{announcement.title}</p>
                    <p className="text-sm text-gray-600">{announcement.date}</p>
                  </div>
                  {announcement.type === 'important' && (
                    <Badge variant="destructive" className="text-xs">
                      Importante
                    </Badge>
                  )}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-codomi-navy">Pagos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPayments.map((payment, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium">{payment.month}</p>
                  <p className="text-sm text-gray-600">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{payment.amount}</p>
                  <Badge variant="outline" className="text-xs">
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerDashboard;
