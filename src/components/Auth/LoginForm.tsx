
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, MapPin, AlertCircle } from 'lucide-react';
import CondominiumSelector from '../CondominiumSelector';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'login' | 'condominium' | 'building'>('login');
  const { login, isLoading, user, selectedCondominium, selectedBuilding, buildings, selectBuilding } = useAuth();

  // Effect to handle admin flow after successful login
  useEffect(() => {
    if (user?.role === 'admin' && step === 'login') {
      setStep('condominium');
    } else if (user?.role !== 'admin' && step === 'login') {
      // For non-admin users, check if building selection is required
      const userBuildings = buildings.filter(b => b.condominiumId === selectedCondominium?.id);
      if (userBuildings.length > 1 && !selectedBuilding) {
        setStep('building');
      }
    }
  }, [user, step, selectedCondominium, selectedBuilding, buildings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (!success) {
      setError('Credenciales incorrectas. Intente nuevamente.');
    }
  };

  const handleCondominiumSelect = () => {
    setStep('building');
  };

  const handleBuildingSelect = () => {
    // Building is selected, user can proceed to dashboard
    if (user?.role === 'admin') {
      window.location.href = '/admin';
    } else {
      // Let the app routing handle non-admin redirects
      window.location.reload();
    }
  };

  // Show condominium selection for admin after login
  if (user?.role === 'admin' && step === 'condominium') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <Card className="w-full max-w-2xl shadow-xl border-0">
          <CardHeader className="text-center bg-codomi-navy text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">
              Seleccionar Condominio
            </CardTitle>
            <CardDescription className="text-blue-100">
              Selecciona el condominio donde deseas trabajar
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <CondominiumSelector onSelect={handleCondominiumSelect} />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show building selection for users who need to select a building
  if ((user?.role === 'admin' && step === 'building' && selectedCondominium) || 
      (user?.role !== 'admin' && step === 'building')) {
    const condominiumBuildings = buildings.filter(b => b.condominiumId === selectedCondominium?.id);
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <Card className="w-full max-w-2xl shadow-xl border-0">
          <CardHeader className="text-center bg-codomi-navy text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">
              Seleccionar Edificio
            </CardTitle>
            <CardDescription className="text-blue-100">
              {user?.role === 'admin' 
                ? `Selecciona el edificio de ${selectedCondominium?.name} donde deseas trabajar`
                : 'Selecciona tu edificio para acceder al sistema'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {condominiumBuildings.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No hay edificios disponibles en este condominio.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {condominiumBuildings.map((building) => (
                  <Button
                    key={building.id}
                    variant="outline"
                    className="w-full justify-start h-auto p-4 hover:shadow-md transition-all duration-200 border-slate-200 hover:border-blue-300"
                    onClick={() => {
                      selectBuilding(building);
                      handleBuildingSelect();
                    }}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-slate-800">{building.name}</div>
                        <div className="text-sm text-slate-600 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {building.address}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center bg-codomi-navy text-white rounded-t-lg">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <CardTitle className="text-3xl font-bold">
            CODOMI
          </CardTitle>
          <CardDescription className="text-lg text-blue-100">
            Gestión de Condominios
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingrese su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base border-slate-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-base border-slate-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-codomi-navy hover:bg-codomi-navy-dark text-white text-base py-6 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600 font-medium mb-2">Credenciales de prueba:</p>
            <div className="text-xs space-y-1 text-slate-600">
              <p><strong>Administrador:</strong> admin@codomi.com / 123456</p>
              <p><strong>Junta Directiva:</strong> carlos@email.com / 123456</p>
              <p><strong>Junta de Condominio:</strong> roberto@email.com / 123456</p>
              <p><strong>Propietario:</strong> maria@email.com / 123456</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
