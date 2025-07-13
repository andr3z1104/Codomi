import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import CondominiumSelector from '../CondominiumSelector';
import BuildingSelector from '../BuildingSelector';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'login' | 'condominium' | 'building'>('login');
  const { login, isLoading, user, selectedCondominium, selectedBuilding, buildings } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (!success) {
      setError('Credenciales incorrectas. Intente nuevamente.');
    } else {
      // Check if user is admin and needs to select condominium/building
      const loggedInUser = JSON.parse(localStorage.getItem('codomi_user') || '{}');
      if (loggedInUser.role === 'admin') {
        setStep('condominium');
      }
    }
  };

  const handleCondominiumSelect = () => {
    setStep('building');
  };

  const handleBuildingSelect = () => {
    // Building is selected, user can proceed to dashboard
    window.location.reload(); // This will redirect to the appropriate dashboard
  };

  // Show condominium selection for admin after login
  if (user?.role === 'admin' && step === 'condominium') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-codomi-gray p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-codomi-navy">
              Seleccionar Condominio
            </CardTitle>
            <CardDescription>
              Selecciona el condominio donde deseas trabajar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CondominiumSelector onSelect={handleCondominiumSelect} />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show building selection for admin after condominium selection
  if (user?.role === 'admin' && step === 'building' && selectedCondominium) {
    const condominiumBuildings = buildings.filter(b => b.condominiumId === selectedCondominium.id);
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-codomi-gray p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-codomi-navy">
              Seleccionar Edificio
            </CardTitle>
            <CardDescription>
              Selecciona el edificio de {selectedCondominium.name} donde deseas trabajar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BuildingSelector onSelect={handleBuildingSelect} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-codomi-gray">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-codomi-navy">
            CODOMI
          </CardTitle>
          <CardDescription className="text-lg">
            Gestión de Condominios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingrese su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-base"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-codomi-navy hover:bg-codomi-navy-dark text-base py-6"
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

          <div className="mt-6 p-4 bg-codomi-gray-light rounded-lg">
            <p className="text-sm text-gray-600 font-medium mb-2">Credenciales de prueba:</p>
            <div className="text-xs space-y-1">
              <p><strong>Administrador:</strong> admin@codomi.com / 123456</p>
              <p><strong>Junta Directiva (Propietario):</strong> carlos@email.com / 123456</p>
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
