import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

export const RouteGuard: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on role
        if (user.role === UserRole.PHARMACY) {
            return <Navigate to="/pharmacy/products" replace />;
        }
        if (user.role === UserRole.CLINIC_ADMIN) {
            return <Navigate to="/clinic-dashboard" replace />;
        }
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};
