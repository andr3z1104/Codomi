
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'owner' | 'junta';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  apartment?: string; // Only for owners
  isBoardMember?: boolean; // Only for owners - Parte de la Junta de Condominio
  buildingId?: string; // For junta members - assigned building
}

export interface Building {
  id: string;
  name: string;
  address: string;
  condominiumId: string;
}

export interface Condominium {
  id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  selectedBuilding: Building | null;
  selectedCondominium: Condominium | null;
  buildings: Building[];
  condominiums: Condominium[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  selectBuilding: (building: Building) => void;
  selectCondominium: (condominium: Condominium) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock condominiums for demo purposes
const mockCondominiums: Condominium[] = [
  { id: '1', name: 'Condominio Los Almendros' },
  { id: '2', name: 'Condominio Vista Hermosa' }
];

// Mock buildings for demo purposes
const mockBuildings: Building[] = [
  { id: '1', name: 'Torre Norte', address: 'Av. Principal 123', condominiumId: '1' },
  { id: '2', name: 'Torre Sur', address: 'Av. Secundaria 456', condominiumId: '1' },
  { id: '3', name: 'Edificio Central', address: 'Calle Central 789', condominiumId: '2' }
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
  },
  {
    id: '4',
    name: 'Roberto Silva',
    email: 'roberto@email.com',
    role: 'junta',
    buildingId: '1'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedCondominium, setSelectedCondominium] = useState<Condominium | null>(null);
  const [buildings] = useState<Building[]>(mockBuildings);
  const [condominiums] = useState<Condominium[]>(mockCondominiums);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('codomi_user');
    const savedBuilding = localStorage.getItem('codomi_selected_building');
    const savedCondominium = localStorage.getItem('codomi_selected_condominium');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedBuilding) {
      setSelectedBuilding(JSON.parse(savedBuilding));
    }
    if (savedCondominium) {
      setSelectedCondominium(JSON.parse(savedCondominium));
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
      
      // Clear selections for admin users to force fresh selection
      if (foundUser.role === 'admin') {
        setSelectedCondominium(null);
        setSelectedBuilding(null);
        localStorage.removeItem('codomi_selected_condominium');
        localStorage.removeItem('codomi_selected_building');
      }
      
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    setSelectedBuilding(null);
    setSelectedCondominium(null);
    localStorage.removeItem('codomi_user');
    localStorage.removeItem('codomi_selected_building');
    localStorage.removeItem('codomi_selected_condominium');
  };

  const selectBuilding = (building: Building | null) => {
    setSelectedBuilding(building);
    if (building) {
      localStorage.setItem('codomi_selected_building', JSON.stringify(building));
    } else {
      localStorage.removeItem('codomi_selected_building');
    }
  };

  const selectCondominium = (condominium: Condominium | null) => {
    setSelectedCondominium(condominium);
    setSelectedBuilding(null); // Reset building selection when changing condominium
    if (condominium) {
      localStorage.setItem('codomi_selected_condominium', JSON.stringify(condominium));
    } else {
      localStorage.removeItem('codomi_selected_condominium');
    }
    localStorage.removeItem('codomi_selected_building');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      selectedBuilding, 
      selectedCondominium,
      buildings, 
      condominiums,
      login, 
      logout, 
      selectBuilding,
      selectCondominium, 
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
