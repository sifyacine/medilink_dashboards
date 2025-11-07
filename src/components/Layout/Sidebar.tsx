import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Building2,
  Stethoscope,
  Pill,
  UserCog,
  UserCheck,
  Ticket,
  HelpCircle,
  Package,
  MessageCircle,
  BarChart3,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Users,
  Calendar,
  Activity,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { usePermissions } from '../../hooks/usePermissions';
import { PrescriptionPage } from './components/PrescriptionPage'; // Import the new page

const getNavigationForRole = (role: string) => {
  const baseNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, roles: ['Clinic Admin', 'Doctor', 'Pharmacy'] },
  ];

  const roleSpecificNavigation = [
    // Patient Management - Multiple Roles
    { name: 'Patients', href: '/patients', icon: Users, roles: ['Clinic Admin', 'Doctor'] },

    // Clinic Admin Navigation
    { name: 'Specialties', href: '/specialties', icon: Stethoscope, roles: ['Clinic Admin'] },
    { name: 'Medicines', href: '/medicines', icon: Pill, roles: ['Clinic Admin'] },
    { name: 'Doctors', href: '/doctors', icon: UserCheck, roles: ['Clinic Admin'] },
    { name: 'Products', href: '/products', icon: Package, roles: ['Clinic Admin'] },
    { name: 'Coupons', href: '/coupons', icon: Ticket, roles: ['Clinic Admin'] },
    { name: 'FAQs', href: '/faqs', icon: HelpCircle, roles: ['Clinic Admin'] },

    // Doctor Specific
    { name: 'Prescriptions', href: '/PrescriptionPage', icon: Pill, roles: ['Doctor'] },

    // Common for multiple roles
    { name: 'Appointments', href: '/appointments', icon: Calendar, roles: ['Clinic Admin', 'Doctor'] },
    { name: 'Chat', href: '/chat', icon: MessageCircle, roles: ['Clinic Admin', 'Doctor'] },

    // Pharmacy Specific
    { name: 'Products', href: '/pharmacy/products', icon: Package, roles: ['Pharmacy'] },
    { name: 'Orders', href: '/pharmacy/orders', icon: Calendar, roles: ['Pharmacy'] },
    { name: 'Inventory', href: '/pharmacy/inventory', icon: Package, roles: ['Pharmacy'] },
    { name: 'Categories', href: '/pharmacy/categories', icon: Package, roles: ['Pharmacy'] },
    { name: 'Customers', href: '/pharmacy/customers', icon: Users, roles: ['Pharmacy'] },
    { name: 'Analytics', href: '/pharmacy/analytics', icon: BarChart3, roles: ['Pharmacy'] },
  ];

  return [...baseNavigation, ...roleSpecificNavigation].filter(item =>
    item.roles.includes(role)
  );
};

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const { canAccess } = usePermissions();
  const location = useLocation();

  const navigation = getNavigationForRole(user?.role || 'Employee');

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-slate-800 text-white p-2 rounded-md hover:bg-slate-700 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-slate-800 text-white transform transition-transform duration-200 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 ${isDarkMode ? 'dark' : ''}`}>
        <div className="flex flex-col h-full max-h-screen">
          {/* Logo */}
          <div className="px-6 py-4 border-b border-slate-700 dark:border-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Building2 size={20} />
              </div>
              <span className="text-xl font-bold">ClinicHub</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-cyan-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* User menu */}
          <div className="px-4 py-4 border-t border-slate-700 dark:border-slate-600">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
              >
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-300">{user?.role}</p>
                </div>
                <ChevronDown size={16} className={`transition-transform ${
                  userMenuOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {userMenuOpen && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-slate-700 dark:bg-slate-600 rounded-lg shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-slate-600 dark:hover:bg-slate-500 rounded-lg transition-colors"
                  >
                    <LogOut size={16} />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};