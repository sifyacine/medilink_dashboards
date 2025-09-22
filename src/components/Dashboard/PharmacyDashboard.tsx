import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  DollarSign,
  AlertTriangle,
  Calendar,
  Activity,
  Eye,
  Star
} from 'lucide-react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

export const PharmacyDashboard: React.FC = () => {
  const stats = [
    { name: 'Total Products', value: '1,247', change: '+12%', icon: Package, color: 'bg-blue-500' },
    { name: 'Pending Orders', value: '23', change: '+5%', icon: ShoppingCart, color: 'bg-yellow-500' },
    { name: 'Total Customers', value: '892', change: '+18%', icon: Users, color: 'bg-green-500' },
    { name: 'Monthly Revenue', value: '$45,230', change: '+23%', icon: DollarSign, color: 'bg-emerald-500' },
    { name: 'Low Stock Items', value: '15', change: '-8%', icon: AlertTriangle, color: 'bg-red-500' },
    { name: 'Today\'s Orders', value: '67', change: '+15%', icon: Calendar, color: 'bg-purple-500' },
  ];

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [32000, 38000, 35000, 42000, 39000, 45000],
        borderColor: 'rgb(6, 182, 212)',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const orderStatusData = {
    labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [
      {
        data: [23, 45, 67, 234, 12],
        backgroundColor: [
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const topProductsData = {
    labels: ['Paracetamol', 'Vitamin D', 'Aspirin', 'Ibuprofen', 'Amoxicillin'],
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

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Smith', items: 3, total: '$45.99', status: 'Pending', time: '10 min ago' },
    { id: 'ORD-002', customer: 'Sarah Johnson', items: 1, total: '$12.50', status: 'Processing', time: '25 min ago' },
    { id: 'ORD-003', customer: 'Mike Wilson', items: 5, total: '$89.75', status: 'Shipped', time: '1 hour ago' },
    { id: 'ORD-004', customer: 'Lisa Brown', items: 2, total: '$34.20', status: 'Delivered', time: '2 hours ago' },
  ];

  const lowStockItems = [
    { name: 'Surgical Masks', stock: 5, minStock: 50, category: 'PPE' },
    { name: 'Hand Sanitizer', stock: 8, minStock: 30, category: 'Hygiene' },
    { name: 'Thermometer', stock: 3, minStock: 20, category: 'Devices' },
  ];

  const topCustomers = [
    { name: 'John Smith', orders: 45, spent: '$1,234.50', rating: 4.8 },
    { name: 'Sarah Johnson', orders: 38, spent: '$987.25', rating: 4.9 },
    { name: 'Mike Wilson', orders: 32, spent: '$756.80', rating: 4.7 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pharmacy Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your pharmacy operations and track business performance.</p>
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Sales</h3>
          <Line data={salesData} options={{ responsive: true }} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Status Distribution</h3>
          <Doughnut data={orderStatusData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Top Products Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Selling Products</h3>
        <Bar data={topProductsData} options={{ responsive: true }} />
      </div>

      {/* Recent Orders and Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <ShoppingCart size={20} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{order.id}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{order.customer} • {order.items} items</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{order.total}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                      order.status === 'Processing' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">{order.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle size={20} className="text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Low Stock Alert</h3>
          </div>
          <div className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">{item.stock} left</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Min: {item.minStock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Users size={20} className="text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Customers</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topCustomers.map((customer, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white">{customer.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{customer.orders} orders</p>
              <p className="text-sm font-medium text-green-600">{customer.spent}</p>
              <div className="flex items-center mt-2">
                <Star size={14} className="text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{customer.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Package size={24} className="text-blue-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Add New Product</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Add products to your inventory</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <ShoppingCart size={24} className="text-green-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Process Orders</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage pending orders</p>
          </button>
          <button className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Activity size={24} className="text-purple-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">View Analytics</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Check business performance</p>
          </button>
        </div>
      </div>
    </div>
  );
};