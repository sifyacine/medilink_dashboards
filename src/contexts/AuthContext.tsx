import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Mock authentication - in real app, this would be an API call
    const mockUsers = [
      {
        id: '1',
        email: 'superuser@clinic.com',
        password: 'super123',
        role: UserRole.SUPER_USER,
        name: 'Dr. Sarah Johnson',
        permissions: ['all']
      },
      {
        id: '2',
        email: 'clinicadmin@clinic.com',
        password: 'clinic123',
        role: UserRole.CLINIC_ADMIN,
        name: 'John Smith',
        clinicId: '1',
        permissions: ['clinic_management', 'staff_management', 'patient_management']
      },
      {
        id: '3',
        email: 'doctor@clinic.com',
        password: 'doctor123',
        role: UserRole.DOCTOR,
        name: 'Dr. Michael Chen',
        clinicId: '1',
        permissions: ['patient_care', 'appointments', 'prescriptions']
      },
      {
        id: '4',
        email: 'nurse@clinic.com',
        password: 'nurse123',
        role: UserRole.NURSE,
        name: 'Maria Rodriguez',
        clinicId: '1',
        permissions: ['patient_care', 'appointments', 'medications']
      },
      {
        id: '5',
        email: 'pharmacy@clinic.com',
        password: 'pharmacy123',
        role: UserRole.PHARMACY,
        name: 'Alex Pharmacy Manager',
        clinicId: '1',
        permissions: ['pharmacy_management', 'product_management', 'order_management', 'inventory_management']
      },
    ];

    const foundUser = mockUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const user: User = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name,
        clinicId: foundUser.clinicId,
        permissions: foundUser.permissions,
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};