import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (e.g., check for token in localStorage)
    // For a real app, you might want to validate the token with an API call here
    const token = localStorage.getItem('token');
    if (token) {
      // Ideally, fetch user profile here
      setUser({ token }); // Placeholder
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      const { access_token, refresh_token } = response.data; // Adjust based on actual API response structure
      // The API docs say "returns tokens", assuming standard JWT response
      // If the response structure is different, this needs adjustment.
      // Based on swagger: 200: Login successful, returns tokens
      
      // Let's assume the response data has access_token. 
      // If it's just returning the token directly or in a different field, we'll need to debug.
      // For now, I'll assume standard { access_token: "..." } or similar.
      
      // Actually, looking at the swagger, it doesn't specify the schema of the response, just "returns tokens".
      // I will assume it returns JSON.
      
      const token = access_token || response.data.token || response.data.access; 
      
      localStorage.setItem('token', token);
      setUser({ token });
      return true;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      await authApi.register(userData);
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    authApi.logout().catch(err => console.error("Logout api failed", err));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
