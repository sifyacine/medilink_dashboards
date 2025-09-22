import React, { useState } from 'react';
import { PageHeader } from '../../components/Common/PageHeader';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  BarChart3
} from 'lucide-react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

export const PharmacyAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');

  // Mock analytics data
  const stats = [
    { 
      name: 'Total Revenue', 
      value: '$45,230', 
      change: '+23%', 
      trend: 'up',
      icon: DollarSign, 
      color: 'bg-green-500' 
    },
    { 
      name: 'Total Orders', 
      value: '1,247', 
      change: '+18%', 
      trend: 'up',
      icon: ShoppingCart, 
      color: 'bg-blue-500' 
    },
    { 
      name: 'New Customers', 
      value: '89', 
      change: '+12%', 
      trend: 'up',
      icon: Users, 
      color: 'bg-purple-500' 
    },
    { 
      name: 'Products Sold', 
      value: '3,456', 
      change: '-5%', 
      trend: 'down',
      icon: Package, 
      color: 'bg-orange-500' 
    },
  ];

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [28000, 32000, 35000, 38000, 42000, 45000, 48000, 52000, 49000, 53000, 56000, 58000],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Orders',
        data: [850, 920, 980, 1050, 1120, 1200, 1280, 1350, 1300, 1400, 1450, 1500],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y1',
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Month'
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Revenue ($)'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Orders'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const categoryData = {
    labels: ['Pain Relief', 'Vitamins', 'Medical Devices', 'First Aid', 'Personal Care', 'Prescription'],
    datasets: [
      {
        label: 'Revenue by Category',
        data: [12500, 8900, 6700, 4500, 7800, 15600],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const topProductsData = {
    labels: ['Paracetamol 500mg', 'Vitamin D3', 'Digital Thermometer', 'Surgical Masks', 'Hand Sanitizer'],
    datasets: [
      {
        label: 'Units Sold',
        data: [245, 189, 167, 143, 128],
        backgroundColor: 'rgba(6, 182, 212, 0.8)',
        borderColor: 'rgb(6, 182, 212)',
        borderWidth: 1,
      },
    ],
  };

  const customerSegmentData = {
    labels: ['New Customers', 'Returning Customers', 'VIP Customers', 'Inactive Customers'],
    datasets: [
      {
        data: [25, 45, 20, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const performanceData = {
    labels: ['Sales', 'Customer Satisfaction', 'Inventory Turnover', 'Order Fulfillment', 'Profit Margin', 'Market Share'],
    datasets: [
      {
        label: 'Current Period',
        data: [85, 92, 78, 95, 82, 68],
        borderColor: 'rgb(6, 182, 212)',
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        pointBackgroundColor: 'rgb(6, 182, 212)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(6, 182, 212)',
      },
      {
        label: 'Previous Period',
        data: [78, 88, 72, 89, 75, 62],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.2)',
        pointBackgroundColor: 'rgb(156, 163, 175)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(156, 163, 175)',
      },
    ],
  };

  const topCustomers = [
    { name: 'John Smith', orders: 45, spent: '$1,234.50', growth: '+15%' },
    { name: 'Sarah Johnson', orders: 38, spent: '$987.25', growth: '+8%' },
    { name: 'Mike Wilson', orders: 32, spent: '$756.80', growth: '+22%' },
    { name: 'Lisa Brown', orders: 29, spent: '$645.30', growth: '-5%' },
    { name: 'David Lee', orders: 25, spent: '$589.75', growth: '+12%' },
  ];

  const recentActivity = [
    { action: 'Large order placed', detail: 'Order #ORD-2024-156 - $450.00', time: '2 hours ago', type: 'order' },
    { action: 'New customer registered', detail: 'Emily Davis joined', time: '4 hours ago', type: 'customer' },
    { action: 'Low stock alert', detail: 'Paracetamol below minimum', time: '6 hours ago', type: 'inventory' },
    { action: 'Product review received', detail: '5-star review for Vitamin D3', time: '8 hours ago', type: 'review' },
    { action: 'Payment processed', detail: 'Order #ORD-2024-155 paid', time: '10 hours ago', type: 'payment' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Analytics Dashboard" 
          description="Track your pharmacy's performance and business insights"
        />
        <div className="flex items-center space-x-2">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
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

      {/* Revenue and Orders Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue & Orders Trend</h3>
        <Line data={revenueData} options={revenueOptions} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue by Category</h3>
          <Doughnut data={categoryData} options={{ responsive: true }} />
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Selling Products</h3>
          <Bar data={topProductsData} options={{ responsive: true }} />
        </div>

        {/* Customer Segments */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Segments</h3>
          <Doughnut data={customerSegmentData} options={{ responsive: true }} />
        </div>

        {/* Performance Radar */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
          <Radar data={performanceData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Top Customers and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Users size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Customers</h3>
          </div>
          <div className="space-y-3">
            {topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{customer.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">{customer.spent}</p>
                  <p className={`text-sm ${
                    customer.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {customer.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'order' ? 'bg-blue-500' :
                  activity.type === 'customer' ? 'bg-green-500' :
                  activity.type === 'inventory' ? 'bg-red-500' :
                  activity.type === 'review' ? 'bg-yellow-500' :
                  'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.detail}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp size={24} className="text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Revenue Growth</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your revenue has increased by 23% compared to last month, driven by higher order values and new customer acquisition.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users size={24} className="text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Customer Retention</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Customer retention rate is at 78%, with VIP customers showing the highest loyalty and repeat purchase behavior.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package size={24} className="text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Inventory Optimization</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pain relief and vitamin categories are your top performers. Consider expanding inventory in these areas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};