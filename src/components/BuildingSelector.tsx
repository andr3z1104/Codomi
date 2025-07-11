import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin } from 'lucide-react';
import { useAuth, Building } from '@/contexts/AuthContext';

interface BuildingSelectorProps {
  onSelect?: (building: Building) => void;
  showCurrentSelection?: boolean;
}

const BuildingSelector: React.FC<BuildingSelectorProps> = ({ 
  onSelect, 
  showCurrentSelection = false 
}) => {
  const { buildings, selectedBuilding, selectBuilding } = useAuth();

  const handleBuildingSelect = (building: Building) => {
    selectBuilding(building);
    onSelect?.(building);
  };

  if (showCurrentSelection && selectedBuilding) {
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
            <div>
              <h3 className="font-semibold text-codomi-navy">{selectedBuilding.name}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                {selectedBuilding.address}
              </p>
            </div>
            <Badge variant="secondary" className="bg-codomi-navy text-white">
              Activo
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-codomi-navy flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          Seleccionar Edificio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {buildings.map((building) => (
            <Button
              key={building.id}
              variant={selectedBuilding?.id === building.id ? "default" : "outline"}
              className="w-full justify-start h-auto p-4"
              onClick={() => handleBuildingSelect(building)}
            >
              <div className="text-left">
                <div className="font-semibold">{building.name}</div>
                <div className="text-sm opacity-80 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {building.address}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BuildingSelector;