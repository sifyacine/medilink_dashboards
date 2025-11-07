import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Clinics } from './pages/Clinic/Clinics';
import { Specialties } from './pages/Specialties';
import { Medicines } from './pages/Medicines';
import { Doctors } from './pages/Doctor/Doctors';
import { Patients } from './components/Shared/Patients';
import { Appointments } from './components/Shared/Appointments';
import { PrescriptionPage } from './pages/PrescriptionPage';
import { Coupons } from './pages/Coupons';
import { FAQs } from './pages/FAQs';
import { Products } from './pages/Products';
import { Chat } from './components/Shared/Chat';
import { PharmacyProducts } from './pages/Pharmacy/PharmacyProducts';
import { PharmacyOrders } from './pages/Pharmacy/PharmacyOrders';
import { PharmacyInventory } from './pages/Pharmacy/PharmacyInventory';
import { PharmacyCategories } from './pages/Pharmacy/PharmacyCategories';
import { PharmacyCustomers } from './pages/Pharmacy/PharmacyCustomers';
import { PharmacyAnalytics } from './pages/Pharmacy/PharmacyAnalytics';
import { MainLayout } from './components/Layout/MainLayout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/*" element={
              <ProtectedRoute allowedRoles={['Super User', 'Clinic Admin', 'Doctor', 'Nurse', 'Pharmacy']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Super User Only Routes */}
              <Route path="clinics" element={
                <ProtectedRoute allowedRoles={['Super User']}>
                  <Clinics />
                </ProtectedRoute>
              } />
              <Route path="users" element={
                <ProtectedRoute allowedRoles={['Super User']}>
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Management</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Manage all system users</p>
                  </div>
                </ProtectedRoute>
              } />
              
              {/* Super User & Clinic Admin Routes */}
              <Route path="specialties" element={
                <ProtectedRoute allowedRoles={['Super User', 'Clinic Admin']}>
                  <Specialties />
                </ProtectedRoute>
              } />
              <Route path="nurses" element={
                <ProtectedRoute allowedRoles={['Super User', 'Clinic Admin']}>
                  <Nurses />
                </ProtectedRoute>
              } />
              <Route path="doctors" element={
                <ProtectedRoute allowedRoles={['Super User', 'Clinic Admin']}>
                  <Doctors />
                </ProtectedRoute>
              } />
              <Route path="products" element={
                <ProtectedRoute allowedRoles={['Super User', 'Clinic Admin']}>
                  <Products />
                </ProtectedRoute>
              } />
              <Route path="coupons" element={
                <ProtectedRoute allowedRoles={['Super User', 'Clinic Admin']}>
                  <Coupons />
                </ProtectedRoute>
              } />
              <Route path="faqs" element={
                <ProtectedRoute allowedRoles={['Super User', 'Clinic Admin']}>
                  <FAQs />
                </ProtectedRoute>
              } />
              
              {/* Multiple Role Access Routes */}
              <Route path="patients" element={
                <ProtectedRoute allowedRoles={['Super User', 'Clinic Admin', 'Doctor', 'Nurse']}>
                  <Patients />
                </ProtectedRoute>
              } />
              <Route path="medicines" element={
                <ProtectedRoute allowedRoles={['Super User', 'Clinic Admin', 'Nurse']}>
                  <Medicines />
                </ProtectedRoute>
              } />
              <Route path="medications" element={
                <ProtectedRoute allowedRoles={['Nurse']}>
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Medication Management</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Manage patient medications</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="appointments" element={
                <ProtectedRoute allowedRoles={['Clinic Admin', 'Doctor']}>
                  <Appointments />
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
                <ProtectedRoute allowedRoles={['Doctor']}> {/* Add ProtectedRoute */}
                  <PrescriptionPage />
                </ProtectedRoute>
              } />

              {/* Nurse Specific Routes */}
              <Route path="patient-care" element={
                <ProtectedRoute allowedRoles={['Nurse']}>
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Patient Care</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Coordinate patient care activities</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="vital-signs" element={
                <ProtectedRoute allowedRoles={['Nurse']}>
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Vital Signs</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Record and monitor patient vital signs</p>
                  </div>
                </ProtectedRoute>
              } />
              
              {/* Chat - Multiple Roles */}
              <Route path="chat" element={
                <ProtectedRoute allowedRoles={['Super User', 'Clinic Admin', 'Doctor', 'Nurse']}>
                  <Chat />
                </ProtectedRoute>
              } />
              
              {/* Pharmacy Routes */}
              <Route path="pharmacy/products" element={
                <ProtectedRoute allowedRoles={['Pharmacy']}>
                  <PharmacyProducts />
                </ProtectedRoute>
              } />
              <Route path="pharmacy/orders" element={
                <ProtectedRoute allowedRoles={['Pharmacy']}>
                  <PharmacyOrders />
                </ProtectedRoute>
              } />
              <Route path="pharmacy/inventory" element={
                <ProtectedRoute allowedRoles={['Pharmacy']}>
                  <PharmacyInventory />
                </ProtectedRoute>
              } />
              <Route path="pharmacy/categories" element={
                <ProtectedRoute allowedRoles={['Pharmacy']}>
                  <PharmacyCategories />
                </ProtectedRoute>
              } />
              <Route path="pharmacy/customers" element={
                <ProtectedRoute allowedRoles={['Pharmacy']}>
                  <PharmacyCustomers />
                </ProtectedRoute>
              } />
              <Route path="pharmacy/analytics" element={
                <ProtectedRoute allowedRoles={['Pharmacy']}>
                  <PharmacyAnalytics />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;