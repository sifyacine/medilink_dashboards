import React, { useState } from 'react';
import { PageHeader } from '../components/Common/PageHeader';
import { DataTable } from '../components/Common/DataTable';
import { Modal } from '../components/Common/Modal';
import { Calendar, Percent, Users, TrendingUp } from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  createdDate: string;
  applicableServices: string[];
}

export const Coupons: React.FC = () => {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const coupons: Coupon[] = [
    {
      id: '1',
      code: 'HEALTH20',
      description: 'Get 20% off on all consultations',
      discountType: 'percentage',
      discountValue: 20,
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      usageLimit: 1000,
      usedCount: 245,
      isActive: true,
      createdDate: '2024-01-01',
      applicableServices: ['Consultation', 'Checkup'],
    },
    {
      id: '2',
      code: 'NEWPATIENT',
      description: 'First time patient discount',
      discountType: 'fixed',
      discountValue: 50,
      validFrom: '2024-01-01',
      validTo: '2024-06-30',
      usageLimit: 500,
      usedCount: 125,
      isActive: true,
      createdDate: '2024-01-01',
      applicableServices: ['Consultation'],
    },
    {
      id: '3',
      code: 'FAMILY10',
      description: 'Family package discount',
      discountType: 'percentage',
      discountValue: 10,
      validFrom: '2024-03-01',
      validTo: '2024-05-31',
      usageLimit: 200,
      usedCount: 180,
      isActive: false,
      createdDate: '2024-03-01',
      applicableServices: ['Consultation', 'Checkup', 'Lab Tests'],
    },
  ];

  const columns = [
    { key: 'code', label: 'Coupon Code', sortable: true },
    { key: 'description', label: 'Description', sortable: false },
    { 
      key: 'discountValue', 
      label: 'Discount', 
      sortable: true,
      render: (value: number, row: Coupon) => 
        row.discountType === 'percentage' ? `${value}%` : `$${value}`
    },
    { key: 'validTo', label: 'Valid Until', sortable: true },
    { 
      key: 'usedCount', 
      label: 'Usage', 
      sortable: true,
      render: (value: number, row: Coupon) => `${value}/${row.usageLimit}`
    },
    { 
      key: 'isActive', 
      label: 'Status', 
      sortable: true,
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
  ];

  const handleView = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setShowModal(true);
  };

  const handleEdit = (coupon: Coupon) => {
    console.log('Edit coupon:', coupon);
  };

  const handleDelete = (coupon: Coupon) => {
    console.log('Delete coupon:', coupon);
  };

  const handleAddCoupon = () => {
    setShowAddModal(true);
  };

  const activeCoupons = coupons.filter(c => c.isActive);
  const totalUsage = coupons.reduce((sum, c) => sum + c.usedCount, 0);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Coupons Management" 
        description="Manage promotional coupons and track usage statistics"
        action={{ label: 'Create New Coupon', onClick: handleAddCoupon }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Coupons</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{coupons.length}</p>
            </div>
            <Percent size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Coupons</p>
              <p className="text-2xl font-bold text-green-600">{activeCoupons.length}</p>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Usage</p>
              <p className="text-2xl font-bold text-purple-600">{totalUsage}</p>
            </div>
            <Users size={24} className="text-purple-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Usage Rate</p>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round((totalUsage / coupons.reduce((sum, c) => sum + c.usageLimit, 0)) * 100)}%
              </p>
            </div>
            <TrendingUp size={24} className="text-orange-600" />
          </div>
        </div>
      </div>

      {/* Coupons Table */}
      <DataTable
        data={coupons}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search coupons..."
      />

      {/* Coupon Details Modal */}
      {selectedCoupon && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Coupon Details - ${selectedCoupon.code}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Coupon Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Code:</span>
                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      {selectedCoupon.code}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Discount:</span>
                    <span className="text-sm font-medium">
                      {selectedCoupon.discountType === 'percentage' 
                        ? `${selectedCoupon.discountValue}%` 
                        : `$${selectedCoupon.discountValue}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Valid From:</span>
                    <span className="text-sm font-medium">{selectedCoupon.validFrom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Valid To:</span>
                    <span className="text-sm font-medium">{selectedCoupon.validTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`text-sm font-medium ${
                      selectedCoupon.isActive ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {selectedCoupon.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Usage Statistics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Usage Limit:</span>
                    <span className="text-sm font-medium">{selectedCoupon.usageLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Used Count:</span>
                    <span className="text-sm font-medium">{selectedCoupon.usedCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remaining:</span>
                    <span className="text-sm font-medium">
                      {selectedCoupon.usageLimit - selectedCoupon.usedCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Usage Rate:</span>
                    <span className="text-sm font-medium">
                      {Math.round((selectedCoupon.usedCount / selectedCoupon.usageLimit) * 100)}%
                    </span>
                  </div>
                </div>
                
                {/* Usage Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-cyan-600 h-2 rounded-full" 
                      style={{ width: `${(selectedCoupon.usedCount / selectedCoupon.usageLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Description</h4>
              <p className="text-sm text-gray-700">{selectedCoupon.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Applicable Services</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCoupon.applicableServices.map((service) => (
                  <span key={service} className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Coupon Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create New Coupon"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coupon Code
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="e.g., HEALTH20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Value
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usage Limit
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valid From
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valid To
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter coupon description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applicable Services (comma-separated)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="e.g., Consultation, Checkup, Lab Tests"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              Create Coupon
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};