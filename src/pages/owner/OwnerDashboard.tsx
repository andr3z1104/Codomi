
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import UserBuildingSelector from '@/components/UserBuildingSelector';

const OwnerDashboard: React.FC = () => {
  const { user, selectedBuilding } = useAuth();

  // Mock data del balance del propietario
  const balance = {
    amount: 125000, // Monto en pesos
    due: 45000, // Monto que debe
    lastPayment: '2024-01-10',
    nextDue: '2024-02-15'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

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

      {/* Balance del Propietario */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Principal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Balance Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Saldo Disponible</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(balance.amount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Último Pago</p>
                <p className="text-lg">{balance.lastPayment}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monto a Pagar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Monto Pendiente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Debe</p>
                <p className="text-3xl font-bold text-red-600">{formatCurrency(balance.due)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Vencimiento</p>
                <p className="text-lg mb-4">{balance.nextDue}</p>
                <Button className="w-full bg-codomi-navy hover:bg-codomi-navy/90">
                  Pagar Ahora
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información Adicional */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Pagos al Día</p>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-600">1</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Pagado (Año)</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(1500000)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerDashboard;
