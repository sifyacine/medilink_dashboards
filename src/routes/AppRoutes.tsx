import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { SignIn } from '../pages/auth/SignIn';
import { DoctorDashboard } from '../pages/Doctor/Dashboard';
import { Patients } from '../pages/Doctor/Patients';
import { Appointments } from '../pages/Doctor/Appointments';
import { Prescriptions } from '../pages/Doctor/Prescriptions';
import { Chat } from '../pages/Doctor/Chat';
import { Products } from '../pages/seller/Products';
import { Orders } from '../pages/seller/Orders';
import { Inventory } from '../pages/seller/Inventory';
import { Categories } from '../pages/seller/Categories';
import { Customers } from '../pages/seller/Customers';
import { Analytics } from '../pages/seller/Analytics';
import { DashboardLayout } from '../layouts/DashboardLayout';

function AppRoutes() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/*" element={
              <ProtectedRoute allowedRoles={['Clinic Admin', 'Doctor', 'Pharmacy']}>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<DoctorDashboard />} />

              {/* Shared Routes */}
              <Route path="patients" element={
                <ProtectedRoute allowedRoles={['Clinic Admin', 'Doctor']}>
                  <Patients />
                </ProtectedRoute>
              } />
              <Route path="appointments" element={
                <ProtectedRoute allowedRoles={['Clinic Admin', 'Doctor']}>
                  <Appointments />
                </ProtectedRoute>
              } />
              <Route path="chat" element={
                <ProtectedRoute allowedRoles={['Clinic Admin', 'Doctor']}>
                  <Chat />
                </ProtectedRoute>
              } />

              {/* Doctor Specific Routes */}
              <Route path="my-patients" element={
                <ProtectedRoute allowedRoles={['Doctor']}>
                  <Patients />
                </ProtectedRoute>
              } />
              <Route path="my-appointments" element={
                <ProtectedRoute allowedRoles={['Doctor']}>
                  <Appointments />
                </ProtectedRoute>
              } />
              <Route path="prescriptions" element={
                <ProtectedRoute allowedRoles={['Doctor']}>
                  <Prescriptions />
                </ProtectedRoute>
              } />

              {/* Pharmacy Routes */}
              <Route path="pharmacy/products" element={
                <ProtectedRoute allowedRoles={['Pharmacy']}>
                  <Products />
                </ProtectedRoute>
              } />
              <Route path="pharmacy/orders" element={
                <ProtectedRoute allowedRoles={['Pharmacy']}>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="pharmacy/inventory" element={
                <ProtectedRoute allowedRoles={['Pharmacy']}>
                  <Inventory />
                </ProtectedRoute>
              } />
              <Route path="pharmacy/categories" element={
                <ProtectedRoute allowedRoles={['Pharmacy']}>
                  <Categories />
                </ProtectedRoute>
              } />
              <Route path="pharmacy/customers" element={
                <ProtectedRoute allowedRoles={['Pharmacy']}>
                  <Customers />
                </ProtectedRoute>
              } />
              <Route path="pharmacy/analytics" element={
                <ProtectedRoute allowedRoles={['Pharmacy']}>
                  <Analytics />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default AppRoutes;