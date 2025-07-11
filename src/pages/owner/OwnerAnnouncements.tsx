
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const OwnerAnnouncements: React.FC = () => {
  const announcements: Announcement[] = [
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
  ];

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Megaphone className="h-6 w-6 md:h-8 md:w-8 text-codomi-navy" />
        <h1 className="text-2xl md:text-3xl font-bold text-codomi-navy">Anuncios</h1>
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
                    <span>Administración</span>
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
