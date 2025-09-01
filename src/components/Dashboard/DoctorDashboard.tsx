import React from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Activity,
  Pill,
  FileText,
  Heart
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';

export const DoctorDashboard: React.FC = () => {
  const stats = [
    { name: 'My Patients', value: '127', change: '+5', icon: Users, color: 'bg-blue-500' },
    { name: 'Today\'s Appointments', value: '8', change: '+2', icon: Calendar, color: 'bg-green-500' },
    { name: 'Pending Reviews', value: '12', change: '-3', icon: FileText, color: 'bg-yellow-500' },
    { name: 'Prescriptions', value: '34', change: '+7', icon: Pill, color: 'bg-purple-500' },
  ];

  const appointmentData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Appointments',
        data: [6, 8, 5, 9, 7],
        borderColor: 'rgb(6, 182, 212)',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const patientAgeGroups = {
    labels: ['0-18', '19-35', '36-50', '51-65', '65+'],
    datasets: [
      {
        label: 'Patients',
        data: [15, 32, 28, 35, 17],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const todayAppointments = [
    { id: 1, patient: 'John Smith', time: '09:00 AM', type: 'Consultation', status: 'Confirmed' },
    { id: 2, patient: 'Sarah Johnson', time: '10:30 AM', type: 'Follow-up', status: 'Confirmed' },
    { id: 3, patient: 'Mike Wilson', time: '02:00 PM', type: 'Check-up', status: 'Pending' },
    { id: 4, patient: 'Lisa Brown', time: '03:30 PM', type: 'Consultation', status: 'Confirmed' },
  ];

  const recentPatients = [
    { id: 1, name: 'Emma Davis', lastVisit: '2 days ago', condition: 'Hypertension', status: 'Stable' },
    { id: 2, name: 'Robert Taylor', lastVisit: '1 week ago', condition: 'Diabetes', status: 'Monitoring' },
    { id: 3, name: 'Jennifer Lee', lastVisit: '3 days ago', condition: 'Migraine', status: 'Improved' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Doctor Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your patients and appointments efficiently.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Appointments</h3>
          <Line data={appointmentData} options={{ responsive: true }} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Patient Age Groups</h3>
          <Bar data={patientAgeGroups} options={{ responsive: true }} />
        </div>
      </div>

      {/* Today's Schedule and Recent Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Appointments</h3>
          </div>
          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{appointment.patient}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{appointment.time}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Heart size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Patients</h3>
          </div>
          <div className="space-y-3">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{patient.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{patient.condition}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600 dark:text-gray-400">{patient.lastVisit}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    patient.status === 'Stable' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                    patient.status === 'Improved' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                  }`}>
                    {patient.status}
                  </span>
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
            <Users size={24} className="text-blue-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">View My Patients</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Access patient records and history</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Calendar size={24} className="text-green-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Schedule Appointment</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Book new patient appointments</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Pill size={24} className="text-purple-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Write Prescription</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Create new prescriptions</p>
          </button>
        </div>
      </div>
    </div>
  );
};