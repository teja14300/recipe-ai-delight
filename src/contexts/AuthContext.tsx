
import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Mock login function - in a real app, this would make an API call
  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, accept any non-empty email and password
    if (email && password) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Create a mock user
      const mockUser = {
        id: "user1",
        email,
        name: email.split("@")[0],
      };
      
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
