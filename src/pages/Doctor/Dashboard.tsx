import React, { useState } from 'react';
import {
  Users,
  Calendar,
  FileText,
  Pill,
  Search,
  Bell
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { StatsCard } from '../../components/common/StatsCard';
import { AppointmentList } from '../../components/tables/AppointmentList';
import { PatientAlerts } from '../../components/common/PatientAlerts';
import { QuickActions } from '../../components/common/QuickActions';
import { RecentPatients } from '../../components/tables/RecentPatients';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const DoctorDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const stats = [
    { name: 'My Patients', value: '127', change: '+5', trend: 'up' as const, icon: Users, color: 'bg-blue-500' },
    { name: 'Today\'s Appointments', value: '8', change: '+2', trend: 'up' as const, icon: Calendar, color: 'bg-green-500' },
    { name: 'Pending Reviews', value: '12', change: '-3', trend: 'down' as const, icon: FileText, color: 'bg-yellow-500' },
    { name: 'Active Prescriptions', value: '34', change: '+7', trend: 'up' as const, icon: Pill, color: 'bg-purple-500' },
  ];

  const appointmentTrends = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Appointments',
        data: [6, 8, 5, 9, 7, 4, 2],
        borderColor: 'rgb(6, 182, 212)',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Consultations',
        data: [4, 6, 3, 7, 5, 3, 1],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const patientConditions = {
    labels: ['Hypertension', 'Diabetes', 'Heart Disease', 'Respiratory', 'Neurological', 'Other'],
    datasets: [
      {
        data: [35, 28, 22, 18, 15, 25],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const todaySchedule = [
    {
      id: 1,
      time: '09:00 AM',
      patient: 'John Smith',
      type: 'Follow-up',
      condition: 'Hypertension',
      status: 'Confirmed' as const,
      duration: 30,
      room: 'Room 205'
    },
    {
      id: 2,
      time: '10:30 AM',
      patient: 'Sarah Johnson',
      type: 'New Patient',
      condition: 'Diabetes Consultation',
      status: 'Confirmed' as const,
      duration: 45,
      room: 'Room 207'
    },
    {
      id: 3,
      time: '02:00 PM',
      patient: 'Mike Wilson',
      type: 'Routine Check',
      condition: 'Annual Physical',
      status: 'Pending' as const,
      duration: 60,
      room: 'Room 205'
    },
    {
      id: 4,
      time: '03:30 PM',
      patient: 'Lisa Brown',
      type: 'Emergency',
      condition: 'Chest Pain',
      status: 'Urgent' as const,
      duration: 30,
      room: 'ER-1'
    },
  ];

  const criticalAlerts = [
    {
      id: 1,
      patient: 'David Wilson',
      alert: 'Abnormal ECG results - requires immediate attention',
      severity: 'Critical' as const,
      time: '15 min ago',
      action: 'Review Results'
    },
    {
      id: 2,
      patient: 'Mary Johnson',
      alert: 'Blood pressure reading above normal range',
      severity: 'High' as const,
      time: '45 min ago',
      action: 'Schedule Follow-up'
    },
    {
      id: 3,
      patient: 'Robert Taylor',
      alert: 'Medication interaction detected',
      severity: 'Medium' as const,
      time: '1 hour ago',
      action: 'Review Prescription'
    },
  ];

  const recentPatients = [
    {
      id: 1,
      name: 'Emma Davis',
      age: 45,
      lastVisit: '2024-02-15',
      condition: 'Hypertension',
      status: 'Stable' as const,
    },
    {
      id: 2,
      name: 'Robert Taylor',
      age: 62,
      lastVisit: '2024-02-10',
      condition: 'Type 2 Diabetes',
      status: 'Monitoring' as const,
    },
    {
      id: 3,
      name: 'Jennifer Lee',
      age: 34,
      lastVisit: '2024-02-12',
      condition: 'Migraine',
      status: 'Improved' as const,
    },
    {
      id: 4,
      name: 'David Wilson',
      age: 58,
      lastVisit: '2024-02-08',
      condition: 'Heart Disease',
      status: 'Critical' as const,
    },
  ];

  return (
    <div className="space-y-8 p-2">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, Dr. Smith
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening with your patients today.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            />
          </div>
          <button className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors relative">
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.name} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white">Activity Overview</h3>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="text-sm border-none bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-1 focus:ring-0"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              <Line data={appointmentTrends} options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, grid: { display: false } },
                  x: { grid: { display: false } }
                }
              }} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-6">Patient Conditions</h3>
              <div className="h-48 flex justify-center">
                <Doughnut data={patientConditions} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } }
                }} />
              </div>
            </div>
          </div>

          <AppointmentList appointments={todaySchedule} />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <QuickActions />
          <PatientAlerts alerts={criticalAlerts} />
          <RecentPatients patients={recentPatients} />
        </div>
      </div>
    </div>
  );
};