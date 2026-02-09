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

const API_URL = "http://localhost:3000";

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
    console.log("AuthProvider mounted, checking localStorage...");
    const storedToken = localStorage.getItem("token");
    console.log("Stored token found:", storedToken ? "Yes" : "No");
    
    if (storedToken) {
      console.log("Token length:", storedToken.length);
      console.log("Token preview:", storedToken.substring(0, 20) + "...");
      
      setToken(storedToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      
      // Fetch user data
      console.log("Fetching user data with token...");
      api.get("/auth/me")
        .then(res => {
          console.log("User data fetched successfully:", res.data);
          setUser(res.data);
        })
        .catch(error => {
          console.error("Failed to fetch user:", error.response?.data || error.message);
          console.log("Clearing invalid token...");
          localStorage.removeItem("token");
          delete api.defaults.headers.common['Authorization'];
          setToken(null);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("No token found in localStorage");
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    console.log("Login attempt for:", email);
    try {
      const res = await api.post("/auth/login", { email, password });
      
      console.log("Login response:", res.data);
      
      const { access_token, user: userData } = res.data;
      
      if (!access_token) {
        throw new Error("No access token received");
      }

      console.log("Access token received, saving to localStorage...");
      console.log("Token to save:", access_token.substring(0, 20) + "...");
      
      localStorage.setItem("token", access_token);
      
      // Verify it was saved
      const savedToken = localStorage.getItem("token");
      console.log("Token saved successfully:", savedToken ? "Yes" : "No");
      if (savedToken) {
        console.log("Saved token matches:", savedToken === access_token);
      }
      
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      setToken(access_token);
      setUser(userData);
      
      console.log("Login completed successfully");
      
    } catch (error: any) {
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
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
    console.log("Logout called, clearing token");
    localStorage.removeItem("token");
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  if (loading) {
    console.log("AuthProvider still loading...");
    return <div className="min-h-screen flex items-center justify-center">Loading authentication...</div>;
  }

  console.log("AuthProvider rendering with:", { 
    user: user?.email, 
    hasToken: !!token,
    loading 
  });

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};