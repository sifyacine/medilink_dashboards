import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Calendar,
    MessageSquare,
    LogOut,
    Pill,
    Stethoscope,
    Activity,
    FileText,
    ShoppingBag,
    Box,
    Tags,
    BarChart2,
    HelpCircle,
    Ticket
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getNavigationForRole = (role: string) => {
        switch (role) {
            case 'Clinic Admin':
                return [
                    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
                    { name: 'Doctors', icon: Stethoscope, path: '/doctors' },
                    { name: 'Patients', icon: Users, path: '/patients' },
                    { name: 'Appointments', icon: Calendar, path: '/appointments' },
                    { name: 'Medicines', icon: Pill, path: '/medicines' },
                    { name: 'Storage', icon: Box, path: '/products' },
                    { name: 'Coupons', icon: Ticket, path: '/coupons' },
                    { name: 'Chat', icon: MessageSquare, path: '/chat' },
                    { name: 'FAQs', icon: HelpCircle, path: '/faqs' },
                ];
            case 'Doctor':
                return [
                    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
                    { name: 'My Patients', icon: Users, path: '/my-patients' },
                    { name: 'Appointments', icon: Calendar, path: '/my-appointments' },
                    { name: 'Prescriptions', icon: FileText, path: '/prescriptions' },
                    { name: 'Chat', icon: MessageSquare, path: '/chat' },
                ];
            case 'Pharmacy':
                return [
                    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
                    { name: 'Products', icon: ShoppingBag, path: '/pharmacy/products' },
                    { name: 'Orders', icon: FileText, path: '/pharmacy/orders' },
                    { name: 'Inventory', icon: Box, path: '/pharmacy/inventory' },
                    { name: 'Categories', icon: Tags, path: '/pharmacy/categories' },
                    { name: 'Customers', icon: Users, path: '/pharmacy/customers' },
                    { name: 'Analytics', icon: BarChart2, path: '/pharmacy/analytics' },
                ];
            default:
                return [];
        }
    };

    const navigation = user ? getNavigationForRole(user.role) : [];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar View */}
            <div className={`
                fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
                transform transition-transform duration-300 ease-in-out flex flex-col
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700 shrink-0">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
                            <Activity className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                            Medilink
                        </span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1 px-3">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => onClose()} // Close sidebar on interaction on mobile
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                            ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                                        }`
                                    }
                                >
                                    <Icon
                                        size={20}
                                        className={`mr-3 transition-colors duration-200 ${isActive
                                            ? 'text-cyan-600 dark:text-cyan-400'
                                            : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                                            }`}
                                    />
                                    <span className="font-medium">{item.name}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-3 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-all duration-200 group"
                    >
                        <LogOut
                            size={20}
                            className="mr-3 text-gray-400 dark:text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200"
                        />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </div>
        </>
    );
};
