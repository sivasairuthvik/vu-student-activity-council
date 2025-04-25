
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'student' | 'faculty' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function (in a real app, this would connect to a backend)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // For demo purposes, we'll use mock data
    // In a real app, this would be an API call
    try {
      // Mock delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock users
      if (email === 'student@vignan.ac.in' && password === 'password') {
        const user = {
          id: 'student1',
          name: 'Demo Student',
          email: 'student@vignan.ac.in',
          role: 'student' as UserRole
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoading(false);
        return true;
      } else if (email === 'faculty@vignan.ac.in' && password === 'password') {
        const user = {
          id: 'faculty1',
          name: 'Demo Faculty',
          email: 'faculty@vignan.ac.in',
          role: 'faculty' as UserRole
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoading(false);
        return true;
      } else if (email === 'admin@vignan.ac.in' && password === 'password') {
        const user = {
          id: 'admin1',
          name: 'Demo Admin',
          email: 'admin@vignan.ac.in',
          role: 'admin' as UserRole
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
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
