import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Megaphone, Calendar, Pin, Plus, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isPinned: boolean;
  author: string;
}

const AdminAnnouncements: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Mantenimiento de Ascensores',
      content: 'Se realizará mantenimiento preventivo de ascensores el próximo sábado de 9:00 AM a 2:00 PM.',
      date: '2024-01-15',
      isPinned: true,
      author: 'Ana García'
    },
    {
      id: '2',
      title: 'Reunión de Consorcio',
      content: 'Reunión mensual de consorcio programada para el 20 de enero a las 7:00 PM en el salón comunal.',
      date: '2024-01-10',
      isPinned: false,
      author: 'Ana García'
    },
    {
      id: '3',
      title: 'Nuevas Normas de Convivencia',
      content: 'Se han actualizado las normas de convivencia del edificio. Por favor, revisar el documento completo en la administración.',
      date: '2024-01-05',
      isPinned: false,
      author: 'Ana García'
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    isPinned: false
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    const announcement: Announcement = {
      id: Date.now().toString(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      date: new Date().toISOString().split('T')[0],
      isPinned: newAnnouncement.isPinned,
      author: user?.name || 'Administrador'
    };

    setAnnouncements(prev => [announcement, ...prev]);
    setNewAnnouncement({ title: '', content: '', isPinned: false });
    setIsDialogOpen(false);
    
    toast({
      title: "Anuncio creado",
      description: "El anuncio ha sido publicado exitosamente",
    });
  };

  const togglePin = (id: string) => {
    setAnnouncements(prev => prev.map(ann => 
      ann.id === id ? { ...ann, isPinned: !ann.isPinned } : ann
    ));
    
    const announcement = announcements.find(ann => ann.id === id);
    toast({
      title: announcement?.isPinned ? "Anuncio desfijado" : "Anuncio fijado",
      description: announcement?.isPinned ? "El anuncio ya no está fijado" : "El anuncio ha sido fijado como importante",
    });
  };

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Megaphone className="h-6 w-6 md:h-8 md:w-8 text-codomi-navy" />
          <h1 className="text-2xl md:text-3xl font-bold text-codomi-navy">Anuncios</h1>
        </div>
        
        <div className="w-full md:w-auto">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                className="w-full md:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium bg-codomi-navy hover:bg-codomi-navy-dark transition-all duration-200 shadow-md hover:shadow-lg rounded-lg"
              >
                <Plus className="h-4 w-4 md:h-5 md:w-5" />
                <span>Crear Anuncio</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-codomi-navy">Crear Nuevo Anuncio</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">Título</Label>
                  <Input
                    id="title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Escribe el título del anuncio"
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-medium">Contenido</Label>
                  <Textarea
                    id="content"
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Describe el contenido del anuncio..."
                    rows={4}
                    className="text-base resize-none"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-amber-600" />
                    <div>
                      <Label htmlFor="pinned" className="text-sm font-medium text-amber-800 cursor-pointer">
                        Marcar como importante
                      </Label>
                      <p className="text-xs text-amber-700 mt-1">
                        Aparecerá destacado al inicio
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="pinned"
                      checked={newAnnouncement.isPinned}
                      onChange={(e) => setNewAnnouncement(prev => ({ ...prev, isPinned: e.target.checked }))}
                      className="sr-only"
                    />
                    <label 
                      htmlFor="pinned" 
                      className={`
                        flex items-center justify-center w-6 h-6 border-2 rounded 
                        cursor-pointer transition-all duration-200
                        ${newAnnouncement.isPinned 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'bg-transparent border-gray-300 hover:border-green-400'
                        }
                      `}
                    >
                      {newAnnouncement.isPinned && (
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </label>
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="w-full sm:w-auto"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleCreateAnnouncement}
                    className="w-full sm:w-auto bg-codomi-navy hover:bg-codomi-navy-dark"
                  >
                    Publicar Anuncio
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        {sortedAnnouncements.map((announcement) => (
          <Card key={announcement.id} className={announcement.isPinned ? 'border-codomi-navy shadow-md' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    {announcement.isPinned && (
                      <Badge 
                        variant="pinned"
                        className="cursor-default"
                      >
                        <Pin className="h-3 w-3 mr-1" />
                        Importante
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {announcement.date}
                    </span>
                    <span>{announcement.author}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePin(announcement.id)}
                  className="flex items-center gap-1"
                >
                  <Pin className="h-3 w-3" />
                  {announcement.isPinned ? 'Desfijar' : 'Fijar'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminAnnouncements;