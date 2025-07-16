import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building2, ChevronDown, MapPin, ArrowLeft } from 'lucide-react';
import { useAuth, Building, Condominium } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

const UserCondominiumBuildingSelector: React.FC = () => {
  const { selectedBuilding, selectedCondominium, selectBuilding, selectCondominium, getUserCondominiums, getUserBuildings } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'condominium' | 'building'>('condominium');
  const [tempCondominium, setTempCondominium] = useState<Condominium | null>(null);

  const availableCondominiums = getUserCondominiums();
  const availableBuildings = getUserBuildings(tempCondominium?.id || selectedCondominium?.id);

  const handleCondominiumSelect = (condominium: Condominium) => {
    setTempCondominium(condominium);
    const buildings = getUserBuildings(condominium.id);
    
    if (buildings.length === 1) {
      // Auto-select single building and close dialog
      selectCondominium(condominium);
      selectBuilding(buildings[0]);
      setIsOpen(false);
      setStep('condominium');
      setTempCondominium(null);
    } else {
      // Show building selection
      setStep('building');
    }
  };

  const handleBuildingSelect = (building: Building) => {
    if (tempCondominium) {
      selectCondominium(tempCondominium);
    }
    selectBuilding(building);
    setIsOpen(false);
    setStep('condominium');
    setTempCondominium(null);
  };

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setStep('condominium');
      setTempCondominium(null);
    }
  };

  const goBackToCondominium = () => {
    setStep('condominium');
    setTempCondominium(null);
  };

  if (!selectedCondominium && !selectedBuilding) {
    return null;
  }

  return (
    <Card className="border-0 shadow-md bg-blue-50 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <span className="text-slate-800">Ubicación Seleccionada</span>
            <p className="text-sm text-slate-600 font-normal mt-1">
              Cambia entre condominios y edificios
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            {selectedBuilding ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-slate-800 truncate">
                    {selectedBuilding.name}
                  </h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    Activo
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <p className="text-sm truncate">{selectedBuilding.address}</p>
                </div>
                <p className="text-xs text-slate-500">
                  {selectedCondominium?.name}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-500">
                <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Sin ubicación seleccionada</p>
                  <p className="text-sm">Selecciona un condominio y edificio</p>
                </div>
              </div>
            )}
          </div>
          
          <Dialog open={isOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-3 bg-white border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                <ChevronDown className="h-4 w-4 mr-2" />
                Cambiar
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  {step === 'building' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goBackToCondominium}
                      className="p-1 h-auto"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                  {step === 'condominium' ? 'Seleccionar Condominio' : 'Seleccionar Edificio'}
                </DialogTitle>
                <p className="text-sm text-slate-600">
                  {step === 'condominium' 
                    ? 'Elige el condominio donde quieres trabajar'
                    : `Elige el edificio de ${tempCondominium?.name || selectedCondominium?.name}`
                  }
                </p>
              </DialogHeader>
              
              <div className="space-y-3 py-4 max-h-80 overflow-y-auto">
                {step === 'condominium' ? (
                  // Condominium selection
                  availableCondominiums.map((condominium) => (
                    <Button
                      key={condominium.id}
                      variant={selectedCondominium?.id === condominium.id ? "default" : "outline"}
                      className="w-full justify-start h-auto p-4 text-left hover:shadow-md transition-all duration-200"
                      onClick={() => handleCondominiumSelect(condominium)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className={`p-2 rounded-lg ${selectedCondominium?.id === condominium.id ? 'bg-white/20' : 'bg-blue-100'}`}>
                          <Building2 className={`h-4 w-4 ${selectedCondominium?.id === condominium.id ? 'text-white' : 'text-blue-600'}`} />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="font-semibold break-words">{condominium.name}</div>
                        </div>
                        {selectedCondominium?.id === condominium.id && (
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                            Activo
                          </Badge>
                        )}
                      </div>
                    </Button>
                  ))
                ) : (
                  // Building selection
                  availableBuildings.map((building) => (
                    <Button
                      key={building.id}
                      variant={selectedBuilding?.id === building.id ? "default" : "outline"}
                      className="w-full justify-start h-auto p-4 text-left hover:shadow-md transition-all duration-200"
                      onClick={() => handleBuildingSelect(building)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className={`p-2 rounded-lg ${selectedBuilding?.id === building.id ? 'bg-white/20' : 'bg-blue-100'}`}>
                          <Building2 className={`h-4 w-4 ${selectedBuilding?.id === building.id ? 'text-white' : 'text-blue-600'}`} />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="font-semibold break-words">{building.name}</div>
                          <div className="text-sm opacity-80 break-words flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {building.address}
                          </div>
                        </div>
                        {selectedBuilding?.id === building.id && (
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                            Activo
                          </Badge>
                        )}
                      </div>
                    </Button>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCondominiumBuildingSelector;