import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePermissions } from '../hooks/usePermissions';
import { SuperUserDashboard } from '../components/Dashboard/SuperUserDashboard';
import { ClinicAdminDashboard } from './Clinic/ClinicAdminDashboard';
import { DoctorDashboard } from './Doctor/DoctorDashboard';
import { NurseDashboard } from './Nurse/NurseDashboard';
import { PharmacyDashboard } from '../components/Dashboard/PharmacyDashboard';

export const Dashboard: React.FC = () => {
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
      case 'Pharmacy':
        return <PharmacyDashboard />;
      default:
        return <PharmacyDashboard />;
    }
  };

  return renderDashboard();
};