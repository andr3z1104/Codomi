
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Megaphone, Calendar, Pin, Plus } from 'lucide-react';
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

const OwnerAnnouncements: React.FC = () => {
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
      author: user?.name || 'Propietario'
    };

    setAnnouncements(prev => [announcement, ...prev]);
    setNewAnnouncement({ title: '', content: '', isPinned: false });
    setIsDialogOpen(false);
    
    toast({
      title: "Anuncio creado",
      description: "El anuncio ha sido publicado exitosamente",
    });
  };

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Megaphone className="h-6 w-6 md:h-8 md:w-8 text-codomi-navy" />
          <h1 className="text-2xl md:text-3xl font-bold text-codomi-navy">Anuncios</h1>
        </div>
        
        {user?.isBoardMember && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Crear Anuncio
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Anuncio</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Título del anuncio"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Contenido</Label>
                  <Textarea
                    id="content"
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Describe el anuncio..."
                    rows={4}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="pinned"
                    checked={newAnnouncement.isPinned}
                    onCheckedChange={(checked) => setNewAnnouncement(prev => ({ ...prev, isPinned: checked }))}
                  />
                  <Label htmlFor="pinned">Marcar como importante (fijado)</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateAnnouncement}>
                    Crear Anuncio
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
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
                        variant="secondary" 
                        className="bg-codomi-navy text-white hover:bg-codomi-navy-dark transition-colors cursor-default"
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

export default OwnerAnnouncements;
