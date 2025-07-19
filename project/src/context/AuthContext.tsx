import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'user' | 'merchant' | 'admin';

interface User {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, password: string) => {
    // Admin login
    if (email === 'admin@gmail.com' && password === 'admin123') {
      const adminUser = { name: 'Administrateur', email, role: 'admin' as UserRole };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    }
    // Demo user/merchant login (mock)
    if (email === 'demo@demo.com' && password === 'demo') {
      const demoUser = { name: 'Utilisateur Démo', email, role: 'user' as UserRole };
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
      return true;
    }
    // Check localStorage for registered users (mock)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find((u: User) => u.email === email && u.password === password);
    if (found) {
      setUser({ name: found.name, email: found.email, role: found.role });
      localStorage.setItem('user', JSON.stringify({ name: found.name, email: found.email, role: found.role }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // Save user in localStorage (mock)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ name, email, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    const newUser = { name, email, role };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}; 