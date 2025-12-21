import React, { useEffect, useState } from 'react';
import {
  Users,
  UserCog,
  Calendar,
  TrendingUp,
  Activity,
  DollarSign
} from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { clinicService } from '../../services/clinicService';
import { ClinicStats, ActivityLog, ClinicTask } from '../../types/models';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const ClinicAdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<ClinicStats | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [tasks, setTasks] = useState<ClinicTask[]>([]);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [specialtyData, setSpecialtyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          statsData,
          activityData,
          tasksData,
          appointments,
          specialty
        ] = await Promise.all([
          clinicService.getStats(),
          clinicService.getRecentActivity(),
          clinicService.getTasks(),
          clinicService.getWeeklyAppointments(),
          clinicService.getSpecialtyDistribution()
        ]);

        setStats(statsData);
        setActivityLogs(activityData);
        setTasks(tasksData);

        setAppointmentData({
          labels: appointments.labels,
          datasets: [{
            label: 'Appointments',
            data: appointments.data,
            backgroundColor: 'rgba(6, 182, 212, 0.8)',
            borderColor: 'rgb(6, 182, 212)',
            borderWidth: 1,
          }]
        });

        setSpecialtyData({
          labels: specialty.labels,
          datasets: [{
            data: specialty.data,
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
            ],
            borderWidth: 0,
          }]
        });

      } catch (error) {
        console.error("Failed to fetch clinic dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 flex justify-center text-gray-500">Loading dashboard...</div>;
  }

  const statCards = [
    { name: 'Total Doctors', value: stats?.totalDoctors || 0, change: '+2', icon: Users, color: 'bg-blue-500' },
    { name: 'Total Nurses', value: stats?.totalNurses || 0, change: '+3', icon: UserCog, color: 'bg-green-500' },
    { name: 'Today\'s Appointments', value: stats?.appointmentsToday || 0, change: '+8', icon: Calendar, color: 'bg-purple-500' },
    { name: 'Monthly Revenue', value: `$${(stats?.monthlyRevenue || 0) / 1000}K`, change: '+15%', icon: DollarSign, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clinic Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your clinic operations and staff efficiently.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Appointments</h3>
          {appointmentData && <Bar data={appointmentData} options={{ responsive: true }} />}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Specialty Distribution</h3>
          {specialtyData && <Doughnut data={specialtyData} options={{ responsive: true }} />}
        </div>
      </div>

      {/* Activity and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Activity size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {activityLogs.map((activity) => (
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

        {/* Upcoming Tasks */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Tasks</h3>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{task.task}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{task.due}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${task.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                  }`}>
                  {task.priority}
                </span>
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
            <Users size={24} className="text-blue-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Patient Management</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage patient folders and records</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Calendar size={24} className="text-green-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Appointment Management</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Review appointment requests</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Activity size={24} className="text-purple-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Staff Management</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage clinic staff and resources</p>
          </button>
        </div>
      </div>
    </div>
  );
};
