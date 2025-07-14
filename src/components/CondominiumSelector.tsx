import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, MapPin } from 'lucide-react';
import { useAuth, Condominium } from '@/contexts/AuthContext';

interface CondominiumSelectorProps {
  onSelect?: (condominium: Condominium) => void;
  showCurrentSelection?: boolean;
}

const CondominiumSelector: React.FC<CondominiumSelectorProps> = ({ onSelect, showCurrentSelection = false }) => {
  const { condominiums, selectedCondominium, selectCondominium } = useAuth();

  const handleCondominiumSelect = (condominium: Condominium) => {
    selectCondominium(condominium);
    onSelect?.(condominium);
  };

  if (showCurrentSelection && selectedCondominium) {
    return (
      <Card className="border-codomi-navy shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg text-codomi-navy">Condominio Seleccionado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-codomi-navy" />
            <div>
              <h3 className="font-semibold">{selectedCondominium.name}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-codomi-navy mb-4">Seleccionar Condominio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {condominiums.map((condominium) => (
          <Button
            key={condominium.id}
            variant={selectedCondominium?.id === condominium.id ? "default" : "outline"}
            className="h-auto p-6 justify-start"
            onClick={() => handleCondominiumSelect(condominium)}
          >
            <div className="flex items-center gap-3 w-full min-w-0">
              <Building2 className="h-6 w-6 text-codomi-navy flex-shrink-0" />
              <div className="text-left min-w-0 flex-1">
                <h3 className="font-semibold text-lg truncate">{condominium.name}</h3>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CondominiumSelector;