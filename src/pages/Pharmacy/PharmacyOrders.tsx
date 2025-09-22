import React, { useState } from 'react';
import { PageHeader } from '../../components/Common/PageHeader';
import { DataTable } from '../../components/Common/DataTable';
import { Modal } from '../../components/Common/Modal';
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard
} from 'lucide-react';

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

interface PharmacyOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  paymentMethod: string;
  notes?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export const PharmacyOrders: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<PharmacyOrder | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Mock data - will be replaced with API calls
  const orders: PharmacyOrder[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      customerId: '1',
      customerName: 'John Smith',
      customerEmail: 'john.smith@email.com',
      customerPhone: '+1 (555) 123-4567',
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      billingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      items: [
        {
          id: '1',
          productId: '1',
          productName: 'Paracetamol 500mg',
          productImage: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
          quantity: 2,
          price: 12.99,
          total: 25.98
        },
        {
          id: '2',
          productId: '3',
          productName: 'Digital Thermometer',
          productImage: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=300',
          quantity: 1,
          price: 29.99,
          total: 29.99
        }
      ],
      subtotal: 55.97,
      tax: 4.48,
      shipping: 5.99,
      discount: 0,
      total: 66.44,
      status: 'Processing',
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card',
      notes: 'Please deliver after 6 PM',
      createdAt: '2024-02-15T10:30:00Z',
      updatedAt: '2024-02-15T14:20:00Z',
      estimatedDelivery: '2024-02-18'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      customerId: '2',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.johnson@email.com',
      customerPhone: '+1 (555) 234-5678',
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      billingAddress: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      items: [
        {
          id: '3',
          productId: '2',
          productName: 'Vitamin D3 1000 IU',
          productImage: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
          quantity: 3,
          price: 24.99,
          total: 74.97
        }
      ],
      subtotal: 74.97,
      tax: 6.00,
      shipping: 0,
      discount: 7.50,
      total: 73.47,
      status: 'Shipped',
      paymentStatus: 'Paid',
      paymentMethod: 'PayPal',
      trackingNumber: 'TRK123456789',
      createdAt: '2024-02-14T15:45:00Z',
      updatedAt: '2024-02-16T09:15:00Z',
      estimatedDelivery: '2024-02-17'
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      customerId: '3',
      customerName: 'Mike Wilson',
      customerEmail: 'mike.wilson@email.com',
      customerPhone: '+1 (555) 345-6789',
      shippingAddress: {
        street: '789 Pine Rd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      },
      billingAddress: {
        street: '789 Pine Rd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      },
      items: [
        {
          id: '4',
          productId: '1',
          productName: 'Paracetamol 500mg',
          productImage: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
          quantity: 1,
          price: 12.99,
          total: 12.99
        }
      ],
      subtotal: 12.99,
      tax: 1.04,
      shipping: 5.99,
      discount: 0,
      total: 20.02,
      status: 'Pending',
      paymentStatus: 'Pending',
      paymentMethod: 'Credit Card',
      createdAt: '2024-02-16T08:20:00Z',
      updatedAt: '2024-02-16T08:20:00Z',
      estimatedDelivery: '2024-02-20'
    }
  ];

  const columns = [
    { 
      key: 'orderNumber', 
      label: 'Order #', 
      sortable: true,
      render: (value: string, row: PharmacyOrder) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{row.customerName}</p>
        </div>
      )
    },
    { 
      key: 'items', 
      label: 'Items', 
      sortable: false,
      render: (value: OrderItem[]) => `${value.length} item${value.length > 1 ? 's' : ''}`
    },
    { 
      key: 'total', 
      label: 'Total', 
      sortable: true,
      render: (value: number) => `$${value.toFixed(2)}`
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
          value === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
          value === 'Processing' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' :
          value === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
          value === 'Cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
          'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'paymentStatus', 
      label: 'Payment', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
          value === 'Failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
          value === 'Refunded' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300' :
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'createdAt', 
      label: 'Date', 
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
  ];

  const handleView = (order: PharmacyOrder) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleEdit = (order: PharmacyOrder) => {
    setSelectedOrder(order);
    setShowUpdateModal(true);
  };

  const handleDelete = (order: PharmacyOrder) => {
    console.log('Cancel order:', order);
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update order status:', selectedOrder?.id);
    setShowUpdateModal(false);
  };

  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const processingOrders = orders.filter(o => o.status === 'Processing');
  const shippedOrders = orders.filter(o => o.status === 'Shipped');
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Order Management" 
        description="Manage customer orders and track fulfillment"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
            </div>
            <ShoppingCart size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingOrders.length}</p>
            </div>
            <Clock size={24} className="text-yellow-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Processing</p>
              <p className="text-2xl font-bold text-purple-600">{processingOrders.length}</p>
            </div>
            <Package size={24} className="text-purple-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
            </div>
            <CheckCircle size={24} className="text-green-600" />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <DataTable
        data={orders}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search orders..."
      />

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Order Details - ${selectedOrder.orderNumber}`}
          size="xl"
        >
          <div className="space-y-6">
            {/* Order Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedOrder.orderNumber}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                  selectedOrder.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                  selectedOrder.status === 'Processing' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' :
                  selectedOrder.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                }`}>
                  {selectedOrder.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedOrder.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                  selectedOrder.paymentStatus === 'Failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                }`}>
                  {selectedOrder.paymentStatus}
                </span>
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Customer Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{selectedOrder.customerPhone}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Shipping Address</h4>
                <div className="flex items-start space-x-2">
                  <MapPin size={16} className="text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Order Items</h4>
              <div className="space-y-3">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <img 
                      src={item.productImage} 
                      alt={item.productName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{item.productName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">${item.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tax:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">${selectedOrder.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Shipping:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">${selectedOrder.shipping.toFixed(2)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Discount:</span>
                    <span className="text-sm font-medium text-green-600">-${selectedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">Total:</span>
                    <span className="font-bold text-gray-900 dark:text-white">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Payment Information</h4>
                <div className="flex items-center space-x-2">
                  <CreditCard size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{selectedOrder.paymentMethod}</span>
                </div>
              </div>
              {selectedOrder.trackingNumber && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tracking Information</h4>
                  <div className="flex items-center space-x-2">
                    <Truck size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{selectedOrder.trackingNumber}</span>
                  </div>
                </div>
              )}
            </div>

            {selectedOrder.notes && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Order Notes</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  {selectedOrder.notes}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Update Order Status Modal */}
      {selectedOrder && (
        <Modal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          title={`Update Order - ${selectedOrder.orderNumber}`}
          size="md"
        >
          <form onSubmit={handleUpdateStatus} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Order Status
              </label>
              <select 
                defaultValue={selectedOrder.status}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Payment Status
              </label>
              <select 
                defaultValue={selectedOrder.paymentStatus}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tracking Number
              </label>
              <input
                type="text"
                defaultValue={selectedOrder.trackingNumber}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter tracking number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes
              </label>
              <textarea
                rows={3}
                defaultValue={selectedOrder.notes}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Add notes about this order..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
              >
                Update Order
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};