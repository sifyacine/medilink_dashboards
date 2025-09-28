import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Pill,
  Heart,
  Thermometer,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Syringe,
  Clipboard,
  Phone,
  MessageCircle,
  Plus
} from 'lucide-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

export const NurseDashboard: React.FC = () => {
  const [selectedShift, setSelectedShift] = useState('day');

  const stats = [
    { name: 'Assigned Patients', value: '45', change: '+3', trend: 'up', icon: Users, color: 'bg-blue-500' },
    { name: 'Today\'s Tasks', value: '12', change: '+1', trend: 'up', icon: Activity, color: 'bg-green-500' },
    { name: 'Medications Due', value: '8', change: '-2', trend: 'down', icon: Pill, color: 'bg-yellow-500' },
    { name: 'Vital Signs Pending', value: '6', change: '+1', trend: 'up', icon: Heart, color: 'bg-red-500' },
    { name: 'Completed Rounds', value: '3', change: '+1', trend: 'up', icon: CheckCircle, color: 'bg-emerald-500' },
    { name: 'Emergency Calls', value: '2', change: '0', trend: 'stable', icon: Phone, color: 'bg-orange-500' },
  ];

  const vitalSignsData = {
    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
    datasets: [
      {
        label: 'Vital Signs Recorded',
        data: [8, 12, 15, 18, 14, 10],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Medications Administered',
        data: [6, 10, 12, 15, 11, 8],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const taskDistribution = {
    labels: ['Medication', 'Vital Signs', 'Patient Care', 'Documentation', 'Emergency Response'],
    datasets: [
      {
        data: [30, 25, 25, 15, 5],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const wardActivity = {
    labels: ['Ward A', 'Ward B', 'Ward C', 'ICU', 'Emergency'],
    datasets: [
      {
        label: 'Patient Count',
        data: [12, 15, 10, 8, 5],
        backgroundColor: 'rgba(6, 182, 212, 0.8)',
        borderColor: 'rgb(6, 182, 212)',
        borderWidth: 1,
      },
    ],
  };

  const todayTasks = [
    { 
      id: 1, 
      task: 'Administer insulin to Room 205', 
      patient: 'Sarah Johnson',
      priority: 'High', 
      time: '10:00 AM',
      status: 'Pending',
      type: 'Medication'
    },
    { 
      id: 2, 
      task: 'Check vital signs - Ward A', 
      patient: 'Multiple Patients',
      priority: 'Medium', 
      time: '11:30 AM',
      status: 'In Progress',
      type: 'Vital Signs'
    },
    { 
      id: 3, 
      task: 'Patient discharge preparation', 
      patient: 'John Smith',
      priority: 'Low', 
      time: '02:00 PM',
      status: 'Pending',
      type: 'Patient Care'
    },
    { 
      id: 4, 
      task: 'Update patient charts', 
      patient: 'Multiple Patients',
      priority: 'Medium', 
      time: '04:00 PM',
      status: 'Pending',
      type: 'Documentation'
    },
    { 
      id: 5, 
      task: 'Pre-surgery preparation', 
      patient: 'Mike Wilson',
      priority: 'High', 
      time: '06:00 PM',
      status: 'Scheduled',
      type: 'Surgery Prep'
    },
  ];

  const patientAlerts = [
    { 
      id: 1, 
      patient: 'John Doe', 
      room: 'Room 205',
      alert: 'Blood pressure reading 180/110 - requires immediate attention', 
      severity: 'Critical', 
      time: '15 min ago',
      vitalSigns: { bp: '180/110', hr: '95', temp: '99.2°F' }
    },
    { 
      id: 2, 
      patient: 'Mary Smith', 
      room: 'Room 208',
      alert: 'Pain medication due in 15 minutes', 
      severity: 'Medium', 
      time: '30 min ago',
      vitalSigns: { bp: '125/80', hr: '72', temp: '98.6°F' }
    },
    { 
      id: 3, 
      patient: 'Robert Johnson', 
      room: 'Room 210',
      alert: 'Scheduled vital signs check overdue', 
      severity: 'Low', 
      time: '1 hour ago',
      vitalSigns: { bp: '120/75', hr: '68', temp: '98.4°F' }
    },
  ];

  const medicationSchedule = [
    { time: '08:00 AM', patient: 'Sarah Johnson', medication: 'Insulin 10 units', status: 'Completed' },
    { time: '10:00 AM', patient: 'John Smith', medication: 'Lisinopril 10mg', status: 'Due' },
    { time: '12:00 PM', patient: 'Mary Wilson', medication: 'Metformin 500mg', status: 'Due' },
    { time: '02:00 PM', patient: 'Robert Lee', medication: 'Aspirin 81mg', status: 'Scheduled' },
    { time: '06:00 PM', patient: 'Lisa Brown', medication: 'Warfarin 5mg', status: 'Scheduled' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nurse Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Coordinate patient care and manage daily nursing responsibilities.</p>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="day">Day Shift</option>
            <option value="night">Night Shift</option>
            <option value="all">All Shifts</option>
          </select>
        </div>
      </div>

      {/* Critical Alerts */}
      {patientAlerts.filter(alert => alert.severity === 'Critical').length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle size={20} className="text-red-600" />
            <h3 className="font-medium text-red-800 dark:text-red-300">Critical Patient Alerts</h3>
          </div>
          <div className="space-y-2">
            {patientAlerts.filter(alert => alert.severity === 'Critical').map((alert) => (
              <div key={alert.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.patient} - {alert.room}</p>
                  <p className="text-sm text-red-700 dark:text-red-300">{alert.alert}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    BP: {alert.vitalSigns.bp} | HR: {alert.vitalSigns.hr} | Temp: {alert.vitalSigns.temp}
                  </p>
                </div>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                  Respond
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
          const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : Activity;
          return (
            <div key={stat.name} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className={`text-sm flex items-center ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Activity Tracking</h3>
          <Line data={vitalSignsData} options={{ 
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Distribution</h3>
          <Doughnut data={taskDistribution} options={{ 
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom' as const,
              }
            }
          }} />
        </div>
      </div>

      {/* Ward Activity Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ward Patient Distribution</h3>
        <Bar data={wardActivity} options={{ 
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Patients'
              }
            }
          }
        }} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Clock size={20} className="text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Tasks</h3>
            </div>
            <button className="bg-cyan-600 text-white px-3 py-1 rounded text-sm hover:bg-cyan-700 flex items-center space-x-1">
              <Plus size={16} />
              <span>Add Task</span>
            </button>
          </div>
          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div key={task.id} className={`p-4 rounded-lg border-l-4 ${
                task.priority === 'High' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                task.priority === 'Medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                'border-green-500 bg-green-50 dark:bg-green-900/20'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{task.time}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{task.patient}</span>
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{task.task}</h4>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        task.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full">
                        {task.type}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                        task.status === 'Scheduled' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg" title="Mark Complete">
                      <CheckCircle size={16} />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg" title="View Details">
                      <FileText size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medication Schedule */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Pill size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Medication Schedule</h3>
          </div>
          <div className="space-y-3">
            {medicationSchedule.map((med, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{med.time}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    med.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                    med.status === 'Due' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                  }`}>
                    {med.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{med.patient}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{med.medication}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Alerts */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Activity size={20} className="text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Patient Alerts & Monitoring</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {patientAlerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border ${
              alert.severity === 'Critical' ? 'border-red-300 bg-red-50 dark:bg-red-900/20' :
              alert.severity === 'High' ? 'border-orange-300 bg-orange-50 dark:bg-orange-900/20' :
              alert.severity === 'Medium' ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20' :
              'border-green-300 bg-green-50 dark:bg-green-900/20'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{alert.patient}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{alert.room}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  alert.severity === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                  alert.severity === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' :
                  alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                }`}>
                  {alert.severity}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{alert.alert}</p>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
                <div>BP: {alert.vitalSigns.bp}</div>
                <div>HR: {alert.vitalSigns.hr}</div>
                <div>Temp: {alert.vitalSigns.temp}</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-500">{alert.time}</span>
                <div className="flex space-x-1">
                  <button className="p-1 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded" title="View Patient">
                    <FileText size={14} />
                  </button>
                  <button className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded" title="Call">
                    <Phone size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
            <Thermometer size={24} className="text-red-600 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-medium text-gray-900 dark:text-white">Record Vital Signs</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update patient vital signs and measurements</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
            <Syringe size={24} className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-medium text-gray-900 dark:text-white">Medication Round</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Administer scheduled medications</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
            <Users size={24} className="text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-medium text-gray-900 dark:text-white">Patient Care Plans</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Review and update care plans</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
            <Clipboard size={24} className="text-green-600 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-medium text-gray-900 dark:text-white">Shift Reports</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Complete and handover shift reports</p>
          </button>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Task Completion Rate</h4>
            <p className="text-2xl font-bold text-green-600 mb-1">94%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Excellent task completion rate this week. Keep up the great work!
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart size={24} className="text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Patient Care Quality</h4>
            <p className="text-2xl font-bold text-blue-600 mb-1">4.9/5</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Outstanding patient care ratings from recent feedback surveys.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity size={24} className="text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Response Time</h4>
            <p className="text-2xl font-bold text-purple-600 mb-1">2.3 min</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Average response time to patient calls and alerts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};