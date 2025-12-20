import React from 'react';
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
import Navbar from './components/Navbar';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>Welcome to the Pet Web App!</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
