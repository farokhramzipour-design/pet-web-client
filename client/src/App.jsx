import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import PetsList from './pages/PetsList';
import PetForm from './pages/PetForm';
import SitterSearch from './pages/SitterSearch';
import BookingForm from './pages/BookingForm';
import CampaignsList from './pages/CampaignsList';
import CampaignForm from './pages/CampaignForm';
import CampaignDetails from './pages/CampaignDetails';
import Wallet from './pages/Wallet';
import SitterDashboard from './pages/SitterDashboard';
import Navbar from './components/Navbar';

// Theme & i18n imports
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { useTranslation } from 'react-i18next';
import { createWagyTheme } from './theme';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create LTR cache
const cacheLtr = createCache({
  key: 'muiltr',
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Navbar />
      <div style={{ paddingBottom: '40px' }}>
        {children}
      </div>
    </>
  );
};

function Dashboard() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: 20 }}>
      <h1>{t('dashboard')}</h1>
      <p>{t('welcome_back')}</p>
    </div>
  );
}

function AppContent() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';
  const theme = createWagyTheme(isRtl ? 'rtl' : 'ltr');

  useEffect(() => {
    document.dir = isRtl ? 'rtl' : 'ltr';
  }, [isRtl]);

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pets" 
              element={
                <ProtectedRoute>
                  <PetsList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pets/add" 
              element={
                <ProtectedRoute>
                  <PetForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pets/:id/edit" 
              element={
                <ProtectedRoute>
                  <PetForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/sitters" 
              element={
                <ProtectedRoute>
                  <SitterSearch />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/book/:sitterId" 
              element={
                <ProtectedRoute>
                  <BookingForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/campaigns" 
              element={
                <ProtectedRoute>
                  <CampaignsList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/campaigns/create" 
              element={
                <ProtectedRoute>
                  <CampaignForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/campaigns/:id" 
              element={
                <ProtectedRoute>
                  <CampaignDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/wallet" 
              element={
                <ProtectedRoute>
                  <Wallet />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/sitter-dashboard" 
              element={
                <ProtectedRoute>
                  <SitterDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
