
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, CreditCard, Calendar, History, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import UserBuildingSelector from '@/components/UserBuildingSelector';
import { Badge } from '@/components/ui/badge';

const OwnerDashboard: React.FC = () => {
  const { user, selectedBuilding } = useAuth();

  // Mock data del balance del propietario
  const balance = {
    amount: 125000, // Monto en pesos
    due: 45000, // Monto que debe
    lastPayment: '2024-01-10',
    nextDue: '2024-02-15'
  };

  // Mock data de últimas transacciones
  const recentTransactions = [
    {
      id: 1,
      date: '2024-01-10',
      description: 'Gastos Comunes Enero',
      amount: -55000,
      type: 'payment'
    },
    {
      id: 2,
      date: '2024-12-15',
      description: 'Gastos Comunes Diciembre',
      amount: -50000,
      type: 'payment'
    },
    {
      id: 3,
      date: '2024-11-20',
      description: 'Multa por Retraso',
      amount: -5000,
      type: 'fine'
    },
    {
      id: 4,
      date: '2024-11-10',
      description: 'Gastos Comunes Noviembre',
      amount: -52000,
      type: 'payment'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'text-blue-600';
      case 'fine':
        return 'text-red-600';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-codomi-gray p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-codomi-navy rounded-xl">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-codomi-navy">Dashboard Propietario</h1>
              <p className="text-slate-600 text-lg">Bienvenido, {user?.name}</p>
              {selectedBuilding && (
                <Badge variant="secondary" className="mt-2 bg-blue-50 text-blue-700">
                  {selectedBuilding.name}
                </Badge>
              )}
            </div>
          </div>

          {/* Building Selector - More Prominent */}
          <UserBuildingSelector />
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Balance Principal */}
          <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                Balance Actual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-2">Saldo Disponible</p>
                <p className="text-4xl font-bold text-green-600">{formatCurrency(balance.amount)}</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <Calendar className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Último Pago</p>
                  <p className="text-sm font-semibold text-slate-700">{balance.lastPayment}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monto a Pagar */}
          <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl text-red-600">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                Monto Pendiente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-2">Debe</p>
                <p className="text-4xl font-bold text-red-600">{formatCurrency(balance.due)}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">Vencimiento</p>
                    <p className="text-sm font-semibold text-slate-700">{balance.nextDue}</p>
                  </div>
                </div>
                <Button className="w-full bg-codomi-navy hover:bg-codomi-navy-dark text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Pagar Ahora
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Últimas Transacciones */}
        <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <History className="h-6 w-6 text-blue-600" />
              </div>
              Últimas Transacciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{transaction.description}</h4>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {transaction.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                      {formatCurrency(Math.abs(transaction.amount))}
                    </p>
                    <Badge 
                      variant={transaction.type === 'payment' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {transaction.type === 'payment' ? 'Pago' : 'Multa'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;
