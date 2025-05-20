
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('mindmate_user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('mindmate_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // For demo purposes, simulate a login request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Hardcoded successful login for demo
      if (email && password) {
        const userData = {
          id: '1',
          email,
          name: email.split('@')[0]
        };
        
        setUser(userData);
        localStorage.setItem('mindmate_user', JSON.stringify(userData));
        toast.success('Welcome back!');
        navigate('/chat');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // For demo purposes, simulate a registration request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful registration
      if (name && email && password) {
        const userData = {
          id: '1',
          email,
          name
        };
        
        setUser(userData);
        localStorage.setItem('mindmate_user', JSON.stringify(userData));
        toast.success('Account created successfully!');
        navigate('/chat');
      } else {
        throw new Error('Please fill all required fields');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    
    try {
      // For demo purposes, simulate Google auth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        id: '2',
        email: 'user@example.com',
        name: 'Google User',
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
      };
      
      setUser(userData);
      localStorage.setItem('mindmate_user', JSON.stringify(userData));
      toast.success('Signed in with Google!');
      navigate('/chat');
    } catch (error) {
      toast.error('Google sign-in failed. Please try again.');
      console.error('Google sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mindmate_user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
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
