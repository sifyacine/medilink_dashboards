import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { RouteGuard } from '../components/common/RouteGuard';
import { SignIn } from '../pages/auth/SignIn';
import { SignUp } from '../pages/auth/SignUp';
import { RegistrationStatus } from '../pages/auth/RegistrationStatus';
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
import { ClinicAdminDashboard } from '../pages/Clinic/ClinicAdminDashboard';
import { ClinicDoctors } from '../pages/Clinic/Doctors';
import { ClinicPatients } from '../pages/Clinic/Patients';
import { ClinicAppointments } from '../pages/Clinic/Appointments';
import { ClinicMedicines } from '../pages/Clinic/Medicines';
import { ClinicSettings } from '../pages/Clinic/Settings';
import { ClinicServices } from '../pages/Clinic/Services';
import { ClinicBilling } from '../pages/Clinic/Billing';
import { Analytics } from '../pages/seller/Analytics';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { UserRole } from '../types/auth';

function RootRedirect() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === UserRole.CLINIC_ADMIN) {
    return <Navigate to="/clinic-dashboard" replace />;
  }

  if (user.role === UserRole.PHARMACY) {
    return <Navigate to="/pharmacy/products" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}

function AppRoutes() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/status" element={<RegistrationStatus />} />
            <Route path="/" element={<RootRedirect />} />

            {/* Main Layout Routes */}
            <Route path="/*" element={
              <RouteGuard allowedRoles={[UserRole.CLINIC_ADMIN, UserRole.DOCTOR, UserRole.PHARMACY, UserRole.NURSE, UserRole.SUPER_USER]}>
                <DashboardLayout />
              </RouteGuard>
            }>
              {/* Doctor & Clinic Admin Routes - Separated */}
              <Route element={
                <RouteGuard allowedRoles={[UserRole.CLINIC_ADMIN]}>
                  <Outlet />
                </RouteGuard>
              }>
                <Route path="clinic-dashboard" element={<ClinicAdminDashboard />} />
                <Route path="clinic/doctors" element={<ClinicDoctors />} />
                <Route path="clinic/patients" element={<ClinicPatients />} />
                <Route path="clinic/appointments" element={<ClinicAppointments />} />
                <Route path="clinic/medicines" element={<ClinicMedicines />} />
                <Route path="clinic/settings" element={<ClinicSettings />} />
                <Route path="clinic/services" element={<ClinicServices />} />
                <Route path="clinic/billing" element={<ClinicBilling />} />
              </Route>

              <Route element={
                <RouteGuard allowedRoles={[UserRole.DOCTOR]}>
                  <Outlet />
                </RouteGuard>
              }>
                <Route path="dashboard" element={<DoctorDashboard />} />
                <Route path="patients" element={<Patients />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="chat" element={<Chat />} />
              </Route>

              {/* Doctor Only Routes */}
              <Route element={
                <RouteGuard allowedRoles={[UserRole.DOCTOR]}>
                  <Outlet />
                </RouteGuard>
              }>
                <Route path="my-patients" element={<Patients />} />
                <Route path="my-appointments" element={<Appointments />} />
                <Route path="prescriptions" element={<Prescriptions />} />
              </Route>

              {/* Pharmacy Routes */}
              <Route path="pharmacy" element={
                <RouteGuard allowedRoles={[UserRole.PHARMACY]}>
                  <Outlet />
                </RouteGuard>
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
