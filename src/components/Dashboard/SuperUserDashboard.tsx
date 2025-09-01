import React from 'react';
import { 
  Building2, 
  Users, 
  UserCog, 
  Pill, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  Activity,
  DollarSign
} from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const SuperUserDashboard: React.FC = () => {
  const stats = [
    { name: 'Total Clinics', value: '24', change: '+12%', icon: Building2, color: 'bg-blue-500' },
    { name: 'Active Doctors', value: '186', change: '+8%', icon: Users, color: 'bg-green-500' },
    { name: 'Active Nurses', value: '342', change: '+15%', icon: UserCog, color: 'bg-purple-500' },
    { name: 'Total Revenue', value: '$2.4M', change: '+23%', icon: DollarSign, color: 'bg-emerald-500' },
    { name: 'Medicines', value: '1,247', change: '+3%', icon: Pill, color: 'bg-yellow-500' },
    { name: 'Appointments', value: '8,432', change: '+18%', icon: Calendar, color: 'bg-indigo-500' },
  ];

  const clinicRegistrations = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Clinics',
        data: [2, 4, 3, 6, 5, 8],
        backgroundColor: 'rgba(6, 182, 212, 0.8)',
        borderColor: 'rgb(6, 182, 212)',
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [45000, 52000, 48000, 61000],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const recentActivity = [
    { id: 1, action: 'New clinic application', detail: 'MediCare Center submitted application', time: '2 hours ago' },
    { id: 2, action: 'Doctor registered', detail: 'Dr. Smith joined Cardiology department', time: '4 hours ago' },
    { id: 3, action: 'Low stock alert', detail: 'Paracetamol stock below threshold', time: '6 hours ago' },
    { id: 4, action: 'New specialty added', detail: 'Dermatology specialty created', time: '1 day ago' },
  ];

  const pendingApprovals = [
    { id: 1, type: 'Clinic', name: 'HealthFirst Medical Center', status: 'Pending Review' },
    { id: 2, type: 'Doctor', name: 'Dr. Emily Johnson', status: 'Verification Required' },
    { id: 3, type: 'Clinic', name: 'City General Hospital', status: 'Pending Review' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Super User Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Complete system overview and management controls.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp size={16} className="mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Clinic Registrations</h3>
          <Bar data={clinicRegistrations} options={{ responsive: true }} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Trends</h3>
          <Line data={revenueData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Recent Activity and Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Activity size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.detail}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle size={20} className="text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Approvals</h3>
          </div>
          <div className="space-y-4">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{approval.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{approval.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-yellow-700 dark:text-yellow-300 bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded">
                    {approval.status}
                  </span>
                  <button className="text-cyan-600 hover:text-cyan-800 text-sm font-medium">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Building2 size={24} className="text-cyan-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Add New Clinic</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Register a new clinic in the system</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Users size={24} className="text-green-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Add Doctor</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Register a new doctor profile</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Pill size={24} className="text-purple-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Add Medicine</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Add new medicine to inventory</p>
          </button>
        </div>
      </div>
    </div>
  );
};