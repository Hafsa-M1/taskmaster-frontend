import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// IMPORTANT: Check if your backend is running on 3001
const API_URL = "http://localhost:3000"; // Change from 3000 to 3001

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    
    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      
      // Fetch user data
      api.get("/auth/me")
        .then(res => {
          setUser(res.data);
        })
        .catch(error => {
          console.error("Failed to fetch user:", error);
          // Token is invalid or expired
          localStorage.removeItem("token");
          delete api.defaults.headers.common['Authorization'];
          setToken(null);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      
      // CRITICAL: Check the actual response structure
      console.log("Login response:", res.data); // Add this for debugging
      
      const { access_token, user: userData } = res.data;
      
      if (!access_token) {
        throw new Error("No access token received");
      }

      localStorage.setItem("token", access_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      setToken(access_token);
      setUser(userData);
      
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      const message = error.response?.data?.message || 
                     error.response?.data?.error || 
                     "Login failed";
      throw new Error(message);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      await api.post("/auth/register", { email, password, name });
      await login(email, password); // Auto-login after registration
    } catch (error: any) {
      const message = error.response?.data?.message || 
                     error.response?.data?.error || 
                     "Registration failed";
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  // Show a simple loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};