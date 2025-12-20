import React, { createContext, useState, useContext, useEffect } from 'react';
import { adminApi } from '../api'; // We might need a separate auth api for admin or reuse the client one if endpoints are same

// Assuming admin uses same auth endpoints but we store token separately
import axios from 'axios';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdmin({ token });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Using the same login endpoint as client
      const response = await axios.post('/api/auth/login', credentials);
      // In a real app, you should check if the user has ADMIN role here
      // For now, we'll assume the backend handles role verification or we check it
      
      const token = response.data.access_token || response.data.token;
      localStorage.setItem('adminToken', token);
      setAdmin({ token });
      return true;
    } catch (error) {
      console.error("Admin Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
