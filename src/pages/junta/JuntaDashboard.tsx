import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Megaphone, MessageCircle, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const JuntaDashboard: React.FC = () => {
  const { user, selectedBuilding } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Building2 className="h-8 w-8 text-codomi-navy" />
        <div>
          <h1 className="text-3xl font-bold text-codomi-navy">Dashboard - Junta de Condominio</h1>
          <p className="text-gray-600">
            Bienvenido/a, {user?.name} - {selectedBuilding?.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/junta/announcements')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-codomi-navy">
              <Megaphone className="h-6 w-6" />
              Anuncios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Gestiona y publica anuncios importantes para los residentes del edificio.
            </p>
            <Button className="w-full">
              Ver Anuncios
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/junta/communication')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-codomi-navy">
              <MessageCircle className="h-6 w-6" />
              Comunicación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Comunícate directamente con los residentes y la administración.
            </p>
            <Button className="w-full">
              Ver Mensajes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JuntaDashboard;