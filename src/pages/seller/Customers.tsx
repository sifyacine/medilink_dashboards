import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/tables/DataTable';
import { Modal } from '../../components/common/Modal';
import {
  Users,
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  DollarSign,
  Calendar,
  Star,
  TrendingUp
} from 'lucide-react';

interface PharmacyCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  registrationDate: string;
  lastOrderDate?: string;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  status: 'Active' | 'Inactive' | 'Blocked';
  loyaltyPoints: number;
  preferredPaymentMethod?: string;
  notes?: string;
  tags: string[];
}

interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: string;
  itemCount: number;
}

export const Customers: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<PharmacyCustomer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - will be replaced with API calls
  const customers: PharmacyCustomer[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1985-03-15',
      gender: 'Male',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      registrationDate: '2023-06-15',
      lastOrderDate: '2024-02-15',
      totalOrders: 45,
      totalSpent: 1234.50,
      averageOrderValue: 27.43,
      status: 'Active',
      loyaltyPoints: 2468,
      preferredPaymentMethod: 'Credit Card',
      notes: 'VIP customer, prefers express delivery',
      tags: ['VIP', 'Regular Customer', 'Express Delivery']
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      dateOfBirth: '1992-07-22',
      gender: 'Female',
      address: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      registrationDate: '2023-08-20',
      lastOrderDate: '2024-02-14',
      totalOrders: 38,
      totalSpent: 987.25,
      averageOrderValue: 25.98,
      status: 'Active',
      loyaltyPoints: 1974,
      preferredPaymentMethod: 'PayPal',
      tags: ['Regular Customer', 'Vitamins']
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Wilson',
      email: 'mike.wilson@email.com',
      phone: '+1 (555) 345-6789',
      dateOfBirth: '1978-11-08',
      gender: 'Male',
      address: {
        street: '789 Pine Rd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      },
      registrationDate: '2023-12-10',
      lastOrderDate: '2024-02-16',
      totalOrders: 12,
      totalSpent: 345.80,
      averageOrderValue: 28.82,
      status: 'Active',
      loyaltyPoints: 691,
      preferredPaymentMethod: 'Credit Card',
      tags: ['New Customer']
    },
    {
      id: '4',
      firstName: 'Lisa',
      lastName: 'Brown',
      email: 'lisa.brown@email.com',
      phone: '+1 (555) 456-7890',
      address: {
        street: '321 Elm St',
        city: 'Miami',
        state: 'FL',
        zipCode: '33101',
        country: 'USA'
      },
      registrationDate: '2022-03-05',
      lastOrderDate: '2023-11-20',
      totalOrders: 67,
      totalSpent: 2156.75,
      averageOrderValue: 32.19,
      status: 'Inactive',
      loyaltyPoints: 4313,
      preferredPaymentMethod: 'Credit Card',
      notes: 'Has not ordered in several months',
      tags: ['VIP', 'Inactive', 'High Value']
    }
  ];

  // Mock customer orders
  const customerOrders: CustomerOrder[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-02-15',
      total: 66.44,
      status: 'Delivered',
      itemCount: 3
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-02-10',
      total: 45.99,
      status: 'Delivered',
      itemCount: 2
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-02-05',
      total: 23.50,
      status: 'Delivered',
      itemCount: 1
    }
  ];

  const columns = [
    {
      key: 'firstName',
      label: 'Customer',
      sortable: true,
      render: (value: string, row: PharmacyCustomer) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{row.firstName} {row.lastName}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{row.email}</p>
        </div>
      )
    },
    { key: 'phone', label: 'Phone', sortable: false },
    {
      key: 'totalOrders',
      label: 'Orders',
      sortable: true,
      render: (value: number) => (
        <span className="font-medium text-gray-900 dark:text-white">{value}</span>
      )
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      sortable: true,
      render: (value: number) => `$${value.toFixed(2)}`
    },
    {
      key: 'averageOrderValue',
      label: 'Avg Order',
      sortable: true,
      render: (value: number) => `$${value.toFixed(2)}`
    },
    {
      key: 'loyaltyPoints',
      label: 'Points',
      sortable: true,
      render: (value: number) => (
        <span className="text-purple-600 font-medium">{value.toLocaleString()}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
          value === 'Inactive' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
          }`}>
          {value}
        </span>
      )
    },
    {
      key: 'lastOrderDate',
      label: 'Last Order',
      sortable: true,
      render: (value: string | undefined) => value ? new Date(value).toLocaleDateString() : 'Never'
    },
  ];

  const handleView = (customer: PharmacyCustomer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
    setActiveTab('overview');
  };

  const handleEdit = (customer: PharmacyCustomer) => {
    setSelectedCustomer(customer);
    setShowAddModal(true);
  };

  const handleDelete = (customer: PharmacyCustomer) => {
    console.log('Delete customer:', customer);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setShowAddModal(true);
  };

  const activeCustomers = customers.filter(c => c.status === 'Active');
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const averageOrderValue = customers.reduce((sum, c) => sum + c.averageOrderValue, 0) / customers.length;
  const totalLoyaltyPoints = customers.reduce((sum, c) => sum + c.loyaltyPoints, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Management"
        description="Manage customer relationships and track purchase history"
        action={{ label: 'Add New Customer', onClick: handleAddCustomer }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{customers.length}</p>
            </div>
            <Users size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Customers</p>
              <p className="text-2xl font-bold text-green-600">{activeCustomers.length}</p>
            </div>
            <div className="text-green-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-purple-600">${totalRevenue.toFixed(2)}</p>
            </div>
            <DollarSign size={24} className="text-purple-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Order Value</p>
              <p className="text-2xl font-bold text-emerald-600">${averageOrderValue.toFixed(2)}</p>
            </div>
            <TrendingUp size={24} className="text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <DataTable
        data={customers}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search customers..."
      />

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Customer Details - ${selectedCustomer.firstName} ${selectedCustomer.lastName}`}
          size="xl"
        >
          <div className="flex h-[70vh]">
            {/* Sidebar */}
            <div className="w-1/4 border-r border-gray-200 dark:border-gray-600 pr-4 overflow-y-auto">
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'orders', label: 'Order History', icon: ShoppingCart },
                  { id: 'loyalty', label: 'Loyalty Points', icon: Star },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === tab.id
                        ? 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                      <Icon size={20} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 pl-6 overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Personal Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <User size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {selectedCustomer.firstName} {selectedCustomer.lastName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{selectedCustomer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{selectedCustomer.phone}</span>
                        </div>
                        {selectedCustomer.dateOfBirth && (
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              Born {selectedCustomer.dateOfBirth} ({new Date().getFullYear() - new Date(selectedCustomer.dateOfBirth).getFullYear()} years old)
                            </span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {selectedCustomer.address.street}, {selectedCustomer.address.city}, {selectedCustomer.address.state}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Customer Statistics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Registration Date:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedCustomer.registrationDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Total Orders:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedCustomer.totalOrders}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Total Spent:</span>
                          <span className="text-sm font-medium text-green-600">${selectedCustomer.totalSpent.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Average Order:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">${selectedCustomer.averageOrderValue.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Loyalty Points:</span>
                          <span className="text-sm font-medium text-purple-600">{selectedCustomer.loyaltyPoints.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                          <span className={`text-sm font-medium ${selectedCustomer.status === 'Active' ? 'text-green-600' :
                            selectedCustomer.status === 'Inactive' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                            {selectedCustomer.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedCustomer.tags.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCustomer.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-300 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCustomer.notes && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Notes</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        {selectedCustomer.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Order History</h4>
                  <div className="space-y-3">
                    {customerOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">{order.orderNumber}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{order.itemCount} items</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded text-xs">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-500">{order.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'loyalty' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Loyalty Program</h4>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                    <div className="text-center">
                      <Star size={48} className="text-purple-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-purple-600 mb-2">
                        {selectedCustomer.loyaltyPoints.toLocaleString()} Points
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">Available for redemption</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Points earned from purchases</span>
                      <span className="text-sm font-medium text-green-600">+{Math.floor(selectedCustomer.totalSpent * 2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Bonus points (referrals, reviews)</span>
                      <span className="text-sm font-medium text-green-600">+{selectedCustomer.loyaltyPoints - Math.floor(selectedCustomer.totalSpent * 2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Add/Edit Customer Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={selectedCustomer ? 'Edit Customer' : 'Add New Customer'}
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                defaultValue={selectedCustomer?.firstName}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                defaultValue={selectedCustomer?.lastName}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue={selectedCustomer?.email}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                defaultValue={selectedCustomer?.phone}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                defaultValue={selectedCustomer?.dateOfBirth}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gender
              </label>
              <select
                defaultValue={selectedCustomer?.gender}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Address
            </label>
            <input
              type="text"
              defaultValue={selectedCustomer?.address.street}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter full address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                City
              </label>
              <input
                type="text"
                defaultValue={selectedCustomer?.address.city}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter city"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                State
              </label>
              <input
                type="text"
                defaultValue={selectedCustomer?.address.state}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter state"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Zip Code
              </label>
              <input
                type="text"
                defaultValue={selectedCustomer?.address.zipCode}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter zip code"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              defaultValue={selectedCustomer?.tags.join(', ')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., VIP, Regular Customer, Express Delivery"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              rows={3}
              defaultValue={selectedCustomer?.notes}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Customer notes..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              {selectedCustomer ? 'Update Customer' : 'Add Customer'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};