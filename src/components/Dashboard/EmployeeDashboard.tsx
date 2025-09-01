import React from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  Activity,
  Phone,
  FileText,
  CheckCircle
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';

export const EmployeeDashboard: React.FC = () => {
  const stats = [
    { name: 'Appointments Scheduled', value: '23', change: '+5', icon: Calendar, color: 'bg-blue-500' },
    { name: 'Calls Handled', value: '67', change: '+12', icon: Phone, color: 'bg-green-500' },
    { name: 'Tasks Completed', value: '18', change: '+3', icon: CheckCircle, color: 'bg-purple-500' },
    { name: 'Hours Worked', value: '7.5', change: '+0.5', icon: Clock, color: 'bg-yellow-500' },
  ];

  const appointmentData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Appointments Scheduled',
        data: [4, 6, 3, 8, 5],
        backgroundColor: 'rgba(6, 182, 212, 0.8)',
        borderColor: 'rgb(6, 182, 212)',
        borderWidth: 1,
      },
    ],
  };

  const todaySchedule = [
    { id: 1, time: '09:00 AM', task: 'Front desk duty', status: 'Completed' },
    { id: 2, time: '11:00 AM', task: 'Patient registration', status: 'In Progress' },
    { id: 3, time: '02:00 PM', task: 'Appointment confirmations', status: 'Pending' },
    { id: 4, time: '04:00 PM', task: 'File organization', status: 'Pending' },
  ];

  const recentTasks = [
    { id: 1, task: 'Updated patient contact information', time: '1 hour ago', status: 'Completed' },
    { id: 2, task: 'Scheduled follow-up appointment', time: '2 hours ago', status: 'Completed' },
    { id: 3, task: 'Processed insurance verification', time: '3 hours ago', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your daily tasks and support clinic operations.</p>
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

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Appointments Scheduled</h3>
        <Bar data={appointmentData} options={{ responsive: true }} />
      </div>

      {/* Today's Schedule and Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Clock size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Schedule</h3>
          </div>
          <div className="space-y-3">
            {todaySchedule.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.task}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{item.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  item.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                  item.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Activity size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Tasks</h3>
          </div>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{task.task}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{task.time}</p>
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
            <Calendar size={24} className="text-blue-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Schedule Appointment</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Book patient appointments</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Phone size={24} className="text-green-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Patient Calls</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Handle patient inquiries</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <FileText size={24} className="text-purple-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Update Records</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Maintain patient information</p>
          </button>
        </div>
      </div>
    </div>
  );
};