import { useAuth } from '../contexts/AuthContext';

export const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    return user.permissions.includes(permission);
  };

  const canAccess = (feature: string): boolean => {
    const rolePermissions = {
      'Super User': ['all'],
      'Clinic Admin': [
        'clinic_management', 'staff_management', 'patient_management',
        'appointments', 'billing', 'reports'
      ],
      'Doctor': [
        'patient_care', 'appointments', 'prescriptions', 'medical_records'
      ],
      'Nurse': [
        'patient_care', 'appointments', 'medications', 'vital_signs'
      ],
      'Pharmacy': [
        'pharmacy_management', 'product_management', 'order_management', 
        'inventory_management', 'customer_management', 'analytics_view'
      ]
    };

    const userPermissions = rolePermissions[user?.role as keyof typeof rolePermissions] || [];
    return userPermissions.includes('all') || userPermissions.includes(feature);
  };

  return { hasPermission, canAccess, userRole: user?.role };
};