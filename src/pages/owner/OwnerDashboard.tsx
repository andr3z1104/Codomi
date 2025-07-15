
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, CreditCard, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-codomi-navy to-blue-600 rounded-xl">
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

        {/* Balance Cards - Enhanced Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Balance Principal */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-shadow duration-300">
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
              <div className="flex items-center gap-2 p-3 bg-white/60 rounded-lg">
                <Calendar className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Último Pago</p>
                  <p className="text-sm font-semibold text-slate-700">{balance.lastPayment}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monto a Pagar */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-rose-50 hover:shadow-xl transition-shadow duration-300">
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
                <div className="flex items-center gap-2 p-3 bg-white/60 rounded-lg">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">Vencimiento</p>
                    <p className="text-sm font-semibold text-slate-700">{balance.nextDue}</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-codomi-navy to-blue-600 hover:from-codomi-navy-dark hover:to-blue-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Pagar Ahora
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumen de Pagos - Enhanced Design */}
        <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              Resumen de Pagos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                </div>
                <p className="text-sm text-slate-600 mb-1">Pagos al Día</p>
                <p className="text-3xl font-bold text-green-600">8</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-100">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-yellow-600 font-bold text-lg">⏳</span>
                </div>
                <p className="text-sm text-slate-600 mb-1">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-600">1</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-lg">💰</span>
                </div>
                <p className="text-sm text-slate-600 mb-1">Total Pagado (Año)</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(1500000)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;
