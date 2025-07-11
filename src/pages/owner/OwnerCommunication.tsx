
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Send, User } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isAdmin: boolean;
  apartment?: string;
}

const OwnerCommunication: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Carlos Mendoza',
      content: 'Buenos días, quisiera reportar un problema con el agua caliente en mi apartamento.',
      timestamp: '2024-01-15 09:30',
      isAdmin: false,
      apartment: 'Apt 301'
    },
    {
      id: '2',
      sender: 'Ana García',
      content: 'Buenos días Carlos, gracias por reportar el problema. Voy a coordinar con el técnico para que revise el sistema de agua caliente.',
      timestamp: '2024-01-15 10:15',
      isAdmin: true
    },
    {
      id: '3',
      sender: 'María Rodriguez',
      content: 'Hola, quería consultar sobre el horario de funcionamiento del gimnasio.',
      timestamp: '2024-01-15 14:22',
      isAdmin: false,
      apartment: 'Apt 205'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'Carlos Mendoza',
        content: newMessage,
        timestamp: new Date().toLocaleString('es-ES', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isAdmin: false,
        apartment: 'Apt 301'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-codomi-navy" />
        <h1 className="text-2xl md:text-3xl font-bold text-codomi-navy">Comunicación</h1>
      </div>

      <Card className="flex flex-col h-[600px]">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="text-lg">Chat Comunitario</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4 min-h-0">
          {/* Área de mensajes con scroll fijo */}
          <div className="flex-1 overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50 space-y-4 min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex gap-3 max-w-[70%] ${message.isAdmin ? 'flex-row' : 'flex-row-reverse'}`}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={message.isAdmin ? 'bg-codomi-navy text-white' : 'bg-gray-300'}>
                      {message.isAdmin ? 'AD' : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`space-y-1 ${message.isAdmin ? 'text-left' : 'text-right'}`}>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="font-medium">{message.sender}</span>
                      {message.apartment && <span>({message.apartment})</span>}
                      <span>{message.timestamp}</span>
                    </div>
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        message.isAdmin
                          ? 'bg-white border shadow-sm'
                          : 'bg-codomi-navy text-white'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Formulario de envío fijo */}
          <form onSubmit={handleSendMessage} className="flex gap-2 flex-shrink-0">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 text-base"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerCommunication;
