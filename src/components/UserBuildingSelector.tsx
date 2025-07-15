
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building2, ChevronDown } from 'lucide-react';
import { useAuth, Building } from '@/contexts/AuthContext';

const UserBuildingSelector: React.FC = () => {
  const { buildings, selectedBuilding, selectBuilding, selectedCondominium } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Filtrar edificios por condominio seleccionado
  const availableBuildings = buildings.filter(
    building => building.condominiumId === selectedCondominium?.id
  );

  const handleBuildingSelect = (building: Building) => {
    selectBuilding(building);
    setIsOpen(false);
  };

  if (!selectedCondominium) {
    return null;
  }

  return (
    <Card className="border-codomi-navy">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Building2 className="h-5 w-5 text-codomi-navy" />
          Edificio Actual
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            {selectedBuilding ? (
              <div>
                <h3 className="font-semibold text-codomi-navy truncate">
                  {selectedBuilding.name}
                </h3>
                <p className="text-sm text-gray-600 truncate">
                  {selectedBuilding.address}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-500">Sin edificio seleccionado</p>
              </div>
            )}
          </div>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="ml-3">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md">
              <DialogHeader>
                <DialogTitle>Seleccionar Edificio</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-4">
                {availableBuildings.map((building) => (
                  <Button
                    key={building.id}
                    variant={selectedBuilding?.id === building.id ? "default" : "outline"}
                    className="w-full justify-start h-auto p-4 text-left"
                    onClick={() => handleBuildingSelect(building)}
                  >
                    <div className="text-left">
                      <div className="font-semibold break-words">{building.name}</div>
                      <div className="text-sm opacity-80 break-words">
                        {building.address}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserBuildingSelector;
