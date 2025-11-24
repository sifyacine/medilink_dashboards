import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ProtectedRoute } from '../components/common/ProtectedRouteWrapper';
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
import { UserRole } from '../types/auth';

function AppRoutes() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Main Layout Routes */}
            <Route path="/*" element={
              <ProtectedRoute allowedRoles={[UserRole.CLINIC_ADMIN, UserRole.DOCTOR, UserRole.PHARMACY, UserRole.NURSE, UserRole.SUPER_USER]}>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              {/* Doctor & Clinic Admin Routes */}
              <Route element={
                <ProtectedRoute allowedRoles={[UserRole.CLINIC_ADMIN, UserRole.DOCTOR]}>
                  <Outlet />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<DoctorDashboard />} />
                <Route path="patients" element={<Patients />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="chat" element={<Chat />} />
              </Route>

              {/* Doctor Only Routes */}
              <Route element={
                <ProtectedRoute allowedRoles={[UserRole.DOCTOR]}>
                  <Outlet />
                </ProtectedRoute>
              }>
                <Route path="my-patients" element={<Patients />} />
                <Route path="my-appointments" element={<Appointments />} />
                <Route path="prescriptions" element={<Prescriptions />} />
              </Route>

              {/* Pharmacy Routes */}
              <Route path="pharmacy" element={
                <ProtectedRoute allowedRoles={[UserRole.PHARMACY]}>
                  <Outlet />
                </ProtectedRoute>
              }>
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="categories" element={<Categories />} />
                <Route path="customers" element={<Customers />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default AppRoutes;