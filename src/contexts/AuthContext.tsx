
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'owner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  apartment?: string; // Only for owners
  isBoardMember?: boolean; // Only for owners - Parte de la Junta de Condominio
}

export interface Building {
  id: string;
  name: string;
  address: string;
}

interface AuthContextType {
  user: User | null;
  selectedBuilding: Building | null;
  buildings: Building[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  selectBuilding: (building: Building) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock buildings for demo purposes
const mockBuildings: Building[] = [
  { id: '1', name: 'Torre Norte', address: 'Av. Principal 123' },
  { id: '2', name: 'Torre Sur', address: 'Av. Secundaria 456' },
  { id: '3', name: 'Edificio Central', address: 'Calle Central 789' }
];

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana García',
    email: 'admin@codomi.com',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    email: 'carlos@email.com',
    role: 'owner',
    apartment: 'Apt 301',
    isBoardMember: true
  },
  {
    id: '3',
    name: 'María López',
    email: 'maria@email.com',
    role: 'owner',
    apartment: 'Apt 205',
    isBoardMember: false
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [buildings] = useState<Building[]>(mockBuildings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('codomi_user');
    const savedBuilding = localStorage.getItem('codomi_selected_building');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedBuilding) {
      setSelectedBuilding(JSON.parse(savedBuilding));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === '123456') {
      setUser(foundUser);
      localStorage.setItem('codomi_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    setSelectedBuilding(null);
    localStorage.removeItem('codomi_user');
    localStorage.removeItem('codomi_selected_building');
  };

  const selectBuilding = (building: Building) => {
    setSelectedBuilding(building);
    localStorage.setItem('codomi_selected_building', JSON.stringify(building));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      selectedBuilding, 
      buildings, 
      login, 
      logout, 
      selectBuilding, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
