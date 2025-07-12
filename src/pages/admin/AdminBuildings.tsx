import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Camera, Save, Edit2 } from 'lucide-react';

const AdminBuildings: React.FC = () => {
  const { toast } = useToast();
  const { selectedBuilding } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [buildingData, setBuildingData] = useState({
    name: selectedBuilding?.name || 'Torres del Parque',
    address: 'Av. Principal 123, Caracas, Venezuela',
    rif: 'J-12345678-9',
    photo: '/placeholder.svg'
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Cambios guardados",
      description: "La información del edificio ha sido actualizada exitosamente",
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBuildingData(prev => ({ ...prev, photo: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
      toast({
        title: "Imagen cargada",
        description: "La foto del edificio ha sido actualizada",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-codomi-navy">Gestión de Edificio</h1>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              Guardar Cambios
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4" />
              Editar Información
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-codomi-navy">Información del Edificio</CardTitle>
          <CardDescription>
            Gestiona la información básica y la imagen del edificio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Foto del edificio */}
          <div className="space-y-4">
            <Label htmlFor="building-photo" className="text-sm font-medium">
              Foto del edificio
            </Label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={buildingData.photo}
                  alt="Foto del edificio"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                />
                {isEditing && (
                  <label
                    htmlFor="photo-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <Camera className="h-6 w-6 text-white" />
                  </label>
                )}
              </div>
              {isEditing && (
                <div className="space-y-2">
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('photo-upload')?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Cambiar Foto
                  </Button>
                  <p className="text-xs text-gray-500">
                    Formatos: JPG, PNG, GIF (máx. 5MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Nombre del edificio */}
          <div className="space-y-2">
            <Label htmlFor="building-name" className="text-sm font-medium">
              Nombre del edificio
            </Label>
            <Input
              id="building-name"
              value={buildingData.name}
              onChange={(e) => setBuildingData(prev => ({ ...prev, name: e.target.value }))}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>

          {/* Dirección */}
          <div className="space-y-2">
            <Label htmlFor="building-address" className="text-sm font-medium">
              Dirección
            </Label>
            <Input
              id="building-address"
              value={buildingData.address}
              onChange={(e) => setBuildingData(prev => ({ ...prev, address: e.target.value }))}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>

          {/* RIF */}
          <div className="space-y-2">
            <Label htmlFor="building-rif" className="text-sm font-medium">
              RIF
            </Label>
            <Input
              id="building-rif"
              value={buildingData.rif}
              onChange={(e) => setBuildingData(prev => ({ ...prev, rif: e.target.value }))}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
              placeholder="Ej: J-12345678-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle className="text-codomi-navy">Estadísticas del Edificio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-codomi-navy">45</div>
              <div className="text-sm text-gray-600">Total de Unidades</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-codomi-navy">42</div>
              <div className="text-sm text-gray-600">Unidades Ocupadas</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-codomi-navy">3</div>
              <div className="text-sm text-gray-600">Unidades Disponibles</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBuildings;