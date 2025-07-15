
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Lock, Plus, X, Camera, Upload } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatarUrl: '',
  });
  const [additionalEmails, setAdditionalEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);

  const handleSaveProfile = () => {
    if (!profileData.name.trim() || !profileData.email.trim()) {
      toast({
        title: "Error",
        description: "El nombre y correo principal son obligatorios",
        variant: "destructive",
      });
      return;
    }

    // Aquí se guardarían los cambios en el backend
    toast({
      title: "Perfil actualizado",
      description: "Los cambios se han guardado exitosamente",
    });
    setIsEditing(false);
  };

  const handleAddEmail = () => {
    if (!newEmail.trim()) return;
    
    if (additionalEmails.includes(newEmail) || newEmail === profileData.email) {
      toast({
        title: "Error",
        description: "Este correo ya está registrado",
        variant: "destructive",
      });
      return;
    }

    setAdditionalEmails(prev => [...prev, newEmail]);
    setNewEmail('');
    toast({
      title: "Correo agregado",
      description: "El correo adicional se ha agregado exitosamente",
    });
  };

  const handleRemoveEmail = (email: string) => {
    setAdditionalEmails(prev => prev.filter(e => e !== email));
    toast({
      title: "Correo eliminado",
      description: "El correo adicional se ha eliminado",
    });
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    // Aquí se cambiaría la contraseña en el backend
    toast({
      title: "Contraseña actualizada",
      description: "La contraseña se ha cambiado exitosamente",
    });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordDialog(false);
  };

  const handleAvatarChange = (newAvatarUrl: string) => {
    setProfileData(prev => ({ ...prev, avatarUrl: newAvatarUrl }));
    setShowAvatarDialog(false);
    toast({
      title: "Avatar actualizado",
      description: "La imagen de perfil se ha actualizado exitosamente",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleAvatarChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const avatarOptions = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=6',
  ];

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <User className="h-6 w-6 md:h-8 md:w-8 text-codomi-navy" />
        <h1 className="text-2xl md:text-3xl font-bold text-codomi-navy">Mi Perfil</h1>
      </div>

      <div className="grid gap-4 md:gap-6">
        {/* Información Personal */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <User className="h-4 w-4 md:h-5 md:w-5" />
                Información Personal
              </CardTitle>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                className="w-full sm:w-auto"
              >
                {isEditing ? 'Guardar' : 'Editar'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 md:gap-6">
              <div className="flex justify-center sm:justify-start">
                <div className="relative">
                  <Avatar className="h-20 w-20 md:h-24 md:w-24">
                    <AvatarImage src={profileData.avatarUrl} alt={profileData.name} />
                    <AvatarFallback className="text-lg md:text-xl">
                      {profileData.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-md">
                      <DialogHeader>
                        <DialogTitle>Cambiar Avatar</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        {/* Subir foto personalizada */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Subir foto personalizada</Label>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                              <div className="flex flex-col items-center justify-center pt-2 pb-2">
                                <Upload className="w-6 h-6 mb-1 text-gray-500" />
                                <p className="text-xs text-gray-500">Subir imagen</p>
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileUpload}
                              />
                            </label>
                          </div>
                        </div>
                        
                        {/* Avatares predefinidos */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">O selecciona un avatar predefinido</Label>
                          <div className="grid grid-cols-3 gap-3">
                            {avatarOptions.map((avatarUrl, index) => (
                              <button
                                key={index}
                                onClick={() => handleAvatarChange(avatarUrl)}
                                className="flex justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <Avatar className="h-12 w-12 md:h-16 md:w-16">
                                  <AvatarImage src={avatarUrl} alt={`Avatar ${index + 1}`} />
                                  <AvatarFallback>A{index + 1}</AvatarFallback>
                                </Avatar>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm md:text-base">Nombre completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm md:text-base">Correo electrónico principal</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Correos Adicionales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Mail className="h-4 w-4 md:h-5 md:w-5" />
              Correos Electrónicos Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Agregar correo adicional"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                type="email"
                className="flex-1"
              />
              <Button onClick={handleAddEmail} size="sm" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-1" />
                Agregar
              </Button>
            </div>
            {additionalEmails.length > 0 && (
              <div className="space-y-2">
                {additionalEmails.map((email, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm break-all pr-2">{email}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveEmail(email)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700 flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cambiar Contraseña */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Lock className="h-4 w-4 md:h-5 md:w-5" />
              Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  Cambiar Contraseña
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md">
                <DialogHeader>
                  <DialogTitle>Cambiar Contraseña</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="current-password">Contraseña actual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">Nueva contraseña</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setShowPasswordDialog(false)} className="w-full sm:w-auto">
                      Cancelar
                    </Button>
                    <Button onClick={handleChangePassword} className="w-full sm:w-auto">
                      Cambiar Contraseña
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
