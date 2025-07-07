
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Megaphone, Calendar, Pin } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isPinned: boolean;
  author: string;
}

const AdminAnnouncements: React.FC = () => {
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
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    isPinned: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement: Announcement = {
        id: Date.now().toString(),
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        date: new Date().toISOString().split('T')[0],
        isPinned: newAnnouncement.isPinned,
        author: 'Ana García'
      };
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: '', content: '', isPinned: false });
    }
  };

  const togglePin = (id: string) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === id ? { ...ann, isPinned: !ann.isPinned } : ann
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-codomi-navy">Gestión de Anuncios</h1>
      </div>

      {/* Formulario para nuevo anuncio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Crear Nuevo Anuncio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Título del anuncio"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                className="text-base"
              />
            </div>
            <div>
              <Textarea
                placeholder="Contenido del anuncio"
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                rows={4}
                className="text-base"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="pinned"
                checked={newAnnouncement.isPinned}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, isPinned: e.target.checked})}
                className="h-4 w-4"
              />
              <label htmlFor="pinned" className="text-sm">Fijar anuncio</label>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Publicar Anuncio
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de anuncios */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className={announcement.isPinned ? 'border-codomi-navy' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    {announcement.isPinned && (
                      <Badge variant="secondary" className="bg-codomi-navy text-white">
                        <Pin className="h-3 w-3 mr-1" />
                        Fijado
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {announcement.date}
                    </span>
                    <span>Por: {announcement.author}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePin(announcement.id)}
                >
                  {announcement.isPinned ? 'Desfijar' : 'Fijar'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminAnnouncements;
