// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the shape of the auth context
interface AuthContextType {
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);

    // Simulate an API call (replace with real authentication logic)
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'john@example.com' && password === 'password') {
          setUser({ email });
          navigate('/');
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};