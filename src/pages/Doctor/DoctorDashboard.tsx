import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Activity,
  Pill,
  FileText,
  Heart,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  MessageCircle,
  Phone
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

export const DoctorDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const stats = [
    { name: 'My Patients', value: '127', change: '+5', trend: 'up', icon: Users, color: 'bg-blue-500' },
    { name: 'Today\'s Appointments', value: '8', change: '+2', trend: 'up', icon: Calendar, color: 'bg-green-500' },
    { name: 'Pending Reviews', value: '12', change: '-3', trend: 'down', icon: FileText, color: 'bg-yellow-500' },
    { name: 'Active Prescriptions', value: '34', change: '+7', trend: 'up', icon: Pill, color: 'bg-purple-500' },
    { name: 'Consultations This Week', value: '42', change: '+12%', trend: 'up', icon: Stethoscope, color: 'bg-cyan-500' },
    { name: 'Patient Satisfaction', value: '4.8', change: '+0.2', trend: 'up', icon: Heart, color: 'bg-pink-500' },
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

  const consultationTypes = {
    labels: ['Follow-up', 'New Patient', 'Emergency', 'Routine Check', 'Specialist Referral'],
    datasets: [
      {
        label: 'Consultations',
        data: [45, 32, 12, 28, 18],
        backgroundColor: 'rgba(6, 182, 212, 0.8)',
        borderColor: 'rgb(6, 182, 212)',
        borderWidth: 1,
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
      status: 'Confirmed',
      duration: 30,
      room: 'Room 205'
    },
    { 
      id: 2, 
      time: '10:30 AM', 
      patient: 'Sarah Johnson', 
      type: 'New Patient', 
      condition: 'Diabetes Consultation',
      status: 'Confirmed',
      duration: 45,
      room: 'Room 207'
    },
    { 
      id: 3, 
      time: '02:00 PM', 
      patient: 'Mike Wilson', 
      type: 'Routine Check', 
      condition: 'Annual Physical',
      status: 'Pending',
      duration: 60,
      room: 'Room 205'
    },
    { 
      id: 4, 
      time: '03:30 PM', 
      patient: 'Lisa Brown', 
      type: 'Emergency', 
      condition: 'Chest Pain',
      status: 'Urgent',
      duration: 30,
      room: 'ER-1'
    },
  ];

  const recentPatients = [
    { 
      id: 1, 
      name: 'Emma Davis', 
      age: 45,
      lastVisit: '2024-02-15', 
      condition: 'Hypertension', 
      status: 'Stable',
      nextAppointment: '2024-03-15',
      riskLevel: 'Low'
    },
    { 
      id: 2, 
      name: 'Robert Taylor', 
      age: 62,
      lastVisit: '2024-02-10', 
      condition: 'Type 2 Diabetes', 
      status: 'Monitoring',
      nextAppointment: '2024-02-24',
      riskLevel: 'Medium'
    },
    { 
      id: 3, 
      name: 'Jennifer Lee', 
      age: 34,
      lastVisit: '2024-02-12', 
      condition: 'Migraine', 
      status: 'Improved',
      nextAppointment: '2024-03-12',
      riskLevel: 'Low'
    },
    { 
      id: 4, 
      name: 'David Wilson', 
      age: 58,
      lastVisit: '2024-02-08', 
      condition: 'Heart Disease', 
      status: 'Critical',
      nextAppointment: '2024-02-22',
      riskLevel: 'High'
    },
  ];

  const pendingTasks = [
    { 
      id: 1, 
      task: 'Review lab results for Emma Davis', 
      priority: 'High', 
      dueTime: '11:00 AM',
      category: 'Lab Review',
      patient: 'Emma Davis'
    },
    { 
      id: 2, 
      task: 'Update prescription for Robert Taylor', 
      priority: 'Medium', 
      dueTime: '02:00 PM',
      category: 'Prescription',
      patient: 'Robert Taylor'
    },
    { 
      id: 3, 
      task: 'Call patient about test results', 
      priority: 'High', 
      dueTime: '04:00 PM',
      category: 'Follow-up',
      patient: 'Jennifer Lee'
    },
    { 
      id: 4, 
      task: 'Complete medical records', 
      priority: 'Low', 
      dueTime: 'End of day',
      category: 'Documentation',
      patient: 'Multiple'
    },
  ];

  const criticalAlerts = [
    { 
      id: 1, 
      patient: 'David Wilson', 
      alert: 'Abnormal ECG results - requires immediate attention', 
      severity: 'Critical', 
      time: '15 min ago',
      action: 'Review Results'
    },
    { 
      id: 2, 
      patient: 'Mary Johnson', 
      alert: 'Blood pressure reading above normal range', 
      severity: 'High', 
      time: '45 min ago',
      action: 'Schedule Follow-up'
    },
    { 
      id: 3, 
      patient: 'Robert Taylor', 
      alert: 'Medication interaction detected', 
      severity: 'Medium', 
      time: '1 hour ago',
      action: 'Review Prescription'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Doctor Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your patients, appointments, and medical practice efficiently.</p>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.filter(alert => alert.severity === 'Critical').length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <AlertCircle size={20} className="text-red-600" />
            <h3 className="font-medium text-red-800 dark:text-red-300">Critical Patient Alerts</h3>
          </div>
          <div className="space-y-2">
            {criticalAlerts.filter(alert => alert.severity === 'Critical').map((alert) => (
              <div key={alert.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.patient}</p>
                  <p className="text-sm text-red-700 dark:text-red-300">{alert.alert}</p>
                </div>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                  {alert.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingUp;
          return (
            <div key={stat.name} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className={`text-sm flex items-center ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon size={16} className="mr-1" />
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appointment & Consultation Trends</h3>
          <Line data={appointmentTrends} options={{ 
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Count'
                }
              }
            }
          }} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Patient Conditions Distribution</h3>
          <Doughnut data={patientConditions} options={{ 
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom' as const,
              }
            }
          }} />
        </div>
      </div>

      {/* Consultation Types Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Consultation Types This Month</h3>
        <Bar data={consultationTypes} options={{ 
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Consultations'
              }
            }
          }
        }} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Schedule</h3>
            </div>
            <button className="bg-cyan-600 text-white px-3 py-1 rounded text-sm hover:bg-cyan-700 flex items-center space-x-1">
              <Plus size={16} />
              <span>Add Appointment</span>
            </button>
          </div>
          <div className="space-y-3">
            {todaySchedule.map((appointment) => (
              <div key={appointment.id} className={`p-4 rounded-lg border-l-4 ${
                appointment.status === 'Urgent' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                appointment.status === 'Confirmed' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{appointment.time}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{appointment.duration} min</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{appointment.room}</span>
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{appointment.patient}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.condition}</p>
                    <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
                      {appointment.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg" title="View Patient">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg" title="Call Patient">
                      <Phone size={16} />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg" title="Send Message">
                      <MessageCircle size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Clock size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Tasks</h3>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{task.task}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{task.patient}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-500">{task.dueTime}</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">
                    {task.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Patients and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Heart size={20} className="text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Patients</h3>
            </div>
            <button className="text-cyan-600 hover:text-cyan-800 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{patient.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{patient.age} years • {patient.condition}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Last visit: {patient.lastVisit}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    patient.status === 'Stable' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                    patient.status === 'Improved' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                    patient.status === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                  }`}>
                    {patient.status}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Risk: {patient.riskLevel}
                  </p>
                </div>
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
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'Critical' ? 'bg-red-500' :
                    alert.severity === 'High' ? 'bg-orange-500' :
                    alert.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.patient}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        alert.severity === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                        alert.severity === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{alert.alert}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-500">{alert.time}</p>
                      <button className="text-xs text-cyan-600 hover:text-cyan-800 font-medium">
                        {alert.action}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
            <Users size={24} className="text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-medium text-gray-900 dark:text-white">Patient Folders</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Access patient records and medical history</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
            <Calendar size={24} className="text-green-600 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-medium text-gray-900 dark:text-white">Appointment Requests</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Review and approve patient appointments</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
            <Pill size={24} className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-medium text-gray-900 dark:text-white">Write Prescription</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Create and manage prescriptions</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
            <FileText size={24} className="text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-medium text-gray-900 dark:text-white">Medical Records</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update and review medical records</p>
          </button>
        </div>
      </div>
    </div>
  );
};