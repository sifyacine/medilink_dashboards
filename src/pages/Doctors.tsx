import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePermissions } from '../hooks/usePermissions';
import { SuperUserDashboard } from '../components/Dashboard/SuperUserDashboard';
import { ClinicAdminDashboard } from '../components/Dashboard/ClinicAdminDashboard';
import { DoctorDashboard } from '../components/Dashboard/DoctorDashboard';
import { NurseDashboard } from '../components/Dashboard/NurseDashboard';
import { EmployeeDashboard } from '../components/Dashboard/EmployeeDashboard';

export const Doctors: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'Super User':
        return <SuperUserDashboard />;
      case 'Clinic Admin':
        return <ClinicAdminDashboard />;
      case 'Doctor':
        return <DoctorDashboard />;
      case 'Nurse':
        return <NurseDashboard />;
      case 'Employee':
        return <EmployeeDashboard />;
      default:
        return <EmployeeDashboard />;
    }
  };

  return renderDashboard();
};