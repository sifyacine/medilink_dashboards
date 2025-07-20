import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Clinics } from './pages/Clinics';
import { Specialties } from './pages/Specialties';
import { Medicines } from './pages/Medicines';
import { Nurses } from './pages/Nurses';
import { Doctors } from './pages/Doctors';
import { Coupons } from './pages/Coupons';
import { FAQs } from './pages/FAQs';
import { Products } from './pages/Products';
import { Chat } from './pages/Chat';
import { MainLayout } from './components/Layout/MainLayout';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-600"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="clinics" element={<Clinics />} />
              <Route path="specialties" element={<Specialties />} />
              <Route path="medicines" element={<Medicines />} />
              <Route path="nurses" element={<Nurses />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="coupons" element={<Coupons />} />
              <Route path="faqs" element={<FAQs />} />
              <Route path="products" element={<Products />} />
              <Route path="chat" element={<Chat />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;