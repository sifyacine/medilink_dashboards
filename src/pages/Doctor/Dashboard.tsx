import React, { useEffect, useState } from 'react';
import { Users, Calendar, DollarSign, Clock, Activity } from 'lucide-react';
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
import StatCard from '../../components/doctor/StatCard';
import AppointmentTable from '../../components/doctor/AppointmentTable';
import { doctorService } from '../../services/doctorService';
import { CabinetStats, Appointment } from '../../types/models';

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
  const [stats, setStats] = useState<CabinetStats | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, appointmentsData] = await Promise.all([
          doctorService.getStats(),
          doctorService.getAppointments()
        ]);
        setStats(statsData);
        setAppointments(appointmentsData.slice(0, 5)); // Show only recent 5
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
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
    {
      title: 'Total Patients',
      value: stats?.totalPatients || 0,
      icon: Users,
      color: 'primary',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Appointments Today',
      value: stats?.appointmentsToday || 0,
      icon: Calendar,
      color: 'green',
      trend: { value: 5, isPositive: true }
    },
    {
      title: 'Revenue Today',
      value: `${stats?.revenueToday.toLocaleString()} DZD`,
      icon: DollarSign,
      color: 'purple',
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Pending Request',
      value: stats?.pendingAppointments || 0,
      icon: Clock,
      color: 'orange',
      trend: { value: 2, isPositive: false }
    }
  ];

  // Dummy chart data for visualization
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Patients Visited',
        data: [12, 19, 3, 5, 2, 3, 7],
        borderColor: '#199A8E',
        backgroundColor: 'rgba(25, 154, 142, 0.5)',
        tension: 0.4
      },
    ],
  };

  const doughnutData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [55, 45],
        backgroundColor: ['#199A8E', 'rgba(255, 99, 132, 0.8)'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Dr. Sarah Connor</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50 font-medium">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary font-medium shadow-sm transition-colors">
            + New Appointment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-400" />
            Weekly Activity
          </h3>
          <div className="h-64">
            <Line options={{ responsive: true, maintainAspectRatio: false }} data={lineChartData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Patient Demographics</h3>
          <div className="h-48 flex justify-center">
            <Doughnut options={{ responsive: true, maintainAspectRatio: false }} data={doughnutData} />
          </div>
          <div className="mt-6 flex justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-primary"></div> Male (55%)</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-pink-500"></div> Female (45%)</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Appointments</h3>
          <button className="text-sm text-primary hover:text-secondary font-medium">View All</button>
        </div>
        <AppointmentTable appointments={appointments} />
      </div>
    </div>
  );
};

export default DoctorDashboard; // Export default for lazy loading if needed, but keeping named export as well