import React from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp, 
  Pill,
  Heart,
  Thermometer,
  Clock
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';

export const NurseDashboard: React.FC = () => {
  const stats = [
    { name: 'Assigned Patients', value: '45', change: '+3', icon: Users, color: 'bg-blue-500' },
    { name: 'Today\'s Tasks', value: '12', change: '+1', icon: Activity, color: 'bg-green-500' },
    { name: 'Medications Due', value: '8', change: '-2', icon: Pill, color: 'bg-yellow-500' },
    { name: 'Vital Signs Pending', value: '6', change: '+1', icon: Heart, color: 'bg-red-500' },
  ];

  const vitalSignsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Vital Signs Recorded',
        data: [15, 18, 12, 20, 16],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const taskDistribution = {
    labels: ['Medication', 'Vital Signs', 'Patient Care', 'Documentation'],
    datasets: [
      {
        data: [30, 25, 35, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const todayTasks = [
    { id: 1, task: 'Administer medication to Room 205', priority: 'High', time: '10:00 AM' },
    { id: 2, task: 'Check vital signs - Ward A', priority: 'Medium', time: '11:30 AM' },
    { id: 3, task: 'Patient discharge preparation', priority: 'Low', time: '02:00 PM' },
    { id: 4, task: 'Update patient records', priority: 'Medium', time: '04:00 PM' },
  ];

  const patientAlerts = [
    { id: 1, patient: 'John Doe', alert: 'High blood pressure reading', severity: 'High', time: '30 min ago' },
    { id: 2, patient: 'Mary Smith', alert: 'Medication due', severity: 'Medium', time: '1 hour ago' },
    { id: 3, patient: 'Robert Johnson', alert: 'Vital signs check needed', severity: 'Low', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nurse Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Coordinate patient care and manage daily nursing tasks.</p>
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Vital Signs</h3>
          <Line data={vitalSignsData} options={{ responsive: true }} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Distribution</h3>
          <Doughnut data={taskDistribution} options={{ responsive: true }} />
        </div>
      </div>

      {/* Today's Tasks and Patient Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Clock size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Tasks</h3>
          </div>
          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{task.task}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{task.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  task.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Alerts */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Activity size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Patient Alerts</h3>
          </div>
          <div className="space-y-3">
            {patientAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'High' ? 'bg-red-500' :
                  alert.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.patient}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{alert.alert}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{alert.time}</p>
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
            <Thermometer size={24} className="text-red-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Record Vital Signs</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update patient vital signs</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Pill size={24} className="text-purple-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Medication Round</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Administer scheduled medications</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Users size={24} className="text-blue-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Patient Folders</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Access patient medical records</p>
          </button>
        </div>
      </div>
    </div>
  );
};