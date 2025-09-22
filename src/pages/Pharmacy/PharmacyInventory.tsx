import React, { useState } from 'react';
import { PageHeader } from '../../components/Common/PageHeader';
import { DataTable } from '../../components/Common/DataTable';
import { Modal } from '../../components/Common/Modal';
import { Package, AlertTriangle, TrendingUp, TrendingDown, Plus, Minus } from 'lucide-react';

interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reservedStock: number;
  availableStock: number;
  unitCost: number;
  totalValue: number;
  lastRestocked: string;
  supplier: string;
  location: string;
  expiryDate?: string;
  batchNumber?: string;
}

interface StockMovement {
  id: string;
  productId: string;
  type: 'In' | 'Out' | 'Adjustment';
  quantity: number;
  reason: string;
  reference?: string;
  createdAt: string;
  createdBy: string;
}

export const PharmacyInventory: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockAction, setStockAction] = useState<'add' | 'remove'>('add');

  // Mock data - will be replaced with API calls
  const inventory: InventoryItem[] = [
    {
      id: '1',
      productId: '1',
      productName: 'Paracetamol 500mg',
      sku: 'PC-PAR-500',
      category: 'Pain Relief',
      currentStock: 150,
      minStock: 50,
      maxStock: 500,
      reservedStock: 25,
      availableStock: 125,
      unitCost: 8.50,
      totalValue: 1275.00,
      lastRestocked: '2024-02-10',
      supplier: 'PharmaCorp',
      location: 'A1-B2',
      expiryDate: '2025-12-31',
      batchNumber: 'PC240210'
    },
    {
      id: '2',
      productId: '2',
      productName: 'Vitamin D3 1000 IU',
      sku: 'HP-VD3-1000',
      category: 'Vitamins',
      currentStock: 75,
      minStock: 30,
      maxStock: 200,
      reservedStock: 10,
      availableStock: 65,
      unitCost: 15.00,
      totalValue: 1125.00,
      lastRestocked: '2024-02-05',
      supplier: 'HealthPlus',
      location: 'B2-C3',
      expiryDate: '2025-08-15',
      batchNumber: 'HP240205'
    },
    {
      id: '3',
      productId: '3',
      productName: 'Digital Thermometer',
      sku: 'MT-THERM-001',
      category: 'Medical Devices',
      currentStock: 25,
      minStock: 20,
      maxStock: 100,
      reservedStock: 5,
      availableStock: 20,
      unitCost: 18.00,
      totalValue: 450.00,
      lastRestocked: '2024-02-15',
      supplier: 'MediTech',
      location: 'C1-D2'
    },
    {
      id: '4',
      productId: '4',
      productName: 'Surgical Masks (50 pack)',
      sku: 'SG-MASK-50',
      category: 'PPE',
      currentStock: 8,
      minStock: 25,
      maxStock: 200,
      reservedStock: 3,
      availableStock: 5,
      unitCost: 12.00,
      totalValue: 96.00,
      lastRestocked: '2024-01-20',
      supplier: 'SafeGuard',
      location: 'D1-E2',
      expiryDate: '2026-01-20',
      batchNumber: 'SG240120'
    }
  ];

  const stockMovements: StockMovement[] = [
    {
      id: '1',
      productId: '1',
      type: 'In',
      quantity: 100,
      reason: 'Purchase Order',
      reference: 'PO-2024-001',
      createdAt: '2024-02-10T10:30:00Z',
      createdBy: 'Alex Pharmacy Manager'
    },
    {
      id: '2',
      productId: '1',
      type: 'Out',
      quantity: 25,
      reason: 'Sale',
      reference: 'ORD-2024-001',
      createdAt: '2024-02-15T14:20:00Z',
      createdBy: 'System'
    },
    {
      id: '3',
      productId: '4',
      type: 'Adjustment',
      quantity: -5,
      reason: 'Damaged goods',
      createdAt: '2024-02-16T09:15:00Z',
      createdBy: 'Alex Pharmacy Manager'
    }
  ];

  const columns = [
    { 
      key: 'productName', 
      label: 'Product', 
      sortable: true,
      render: (value: string, row: InventoryItem) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{row.sku}</p>
        </div>
      )
    },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { 
      key: 'currentStock', 
      label: 'Current Stock', 
      sortable: true,
      render: (value: number, row: InventoryItem) => (
        <span className={`font-medium ${
          value <= row.minStock ? 'text-red-600' : 
          value <= row.minStock * 1.5 ? 'text-yellow-600' : 'text-green-600'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'availableStock', 
      label: 'Available', 
      sortable: true,
      render: (value: number) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
      )
    },
    { 
      key: 'totalValue', 
      label: 'Value', 
      sortable: true,
      render: (value: number) => `$${value.toFixed(2)}`
    },
    { 
      key: 'expiryDate', 
      label: 'Expiry', 
      sortable: true,
      render: (value: string | undefined) => {
        if (!value) return '-';
        const isExpiring = new Date(value) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
        return (
          <span className={isExpiring ? 'text-red-600 font-medium' : 'text-gray-700 dark:text-gray-300'}>
            {value}
          </span>
        );
      }
    },
  ];

  const handleView = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleEdit = (item: InventoryItem) => {
    console.log('Edit inventory item:', item);
  };

  const handleDelete = (item: InventoryItem) => {
    console.log('Delete inventory item:', item);
  };

  const handleStockAdjustment = (item: InventoryItem, action: 'add' | 'remove') => {
    setSelectedItem(item);
    setStockAction(action);
    setShowStockModal(true);
  };

  const handleStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Stock adjustment:', selectedItem?.id, stockAction);
    setShowStockModal(false);
  };

  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock);
  const expiringItems = inventory.filter(item => 
    item.expiryDate && new Date(item.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
  );
  const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const totalItems = inventory.reduce((sum, item) => sum + item.currentStock, 0);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Inventory Management" 
        description="Track stock levels, manage inventory, and monitor product movements"
      />

      {/* Alerts */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle size={20} className="text-red-600" />
            <h3 className="font-medium text-red-800 dark:text-red-300">Low Stock Alert</h3>
          </div>
          <p className="text-red-700 dark:text-red-300 text-sm">
            {lowStockItems.length} item(s) are running low: {' '}
            {lowStockItems.map(item => item.productName).join(', ')}
          </p>
        </div>
      )}

      {expiringItems.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle size={20} className="text-yellow-600" />
            <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Expiry Warning</h3>
          </div>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            {expiringItems.length} item(s) expiring within 90 days: {' '}
            {expiringItems.map(item => item.productName).join(', ')}
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalItems}</p>
            </div>
            <Package size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock</p>
              <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
            </div>
            <AlertTriangle size={24} className="text-red-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expiring Soon</p>
              <p className="text-2xl font-bold text-yellow-600">{expiringItems.length}</p>
            </div>
            <div className="text-yellow-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
              <p className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</p>
            </div>
            <TrendingUp size={24} className="text-green-600" />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Inventory Items</h3>
        </div>
        <DataTable
          data={inventory}
          columns={[
            ...columns,
            {
              key: 'actions',
              label: 'Stock Actions',
              sortable: false,
              render: (_, row: InventoryItem) => (
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleStockAdjustment(row, 'add')}
                    className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                    title="Add Stock"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => handleStockAdjustment(row, 'remove')}
                    className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    title="Remove Stock"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              )
            }
          ]}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Search inventory..."
        />
      </div>

      {/* Recent Stock Movements */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Stock Movements</h3>
        <div className="space-y-3">
          {stockMovements.map((movement) => {
            const product = inventory.find(item => item.productId === movement.productId);
            return (
              <div key={movement.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    movement.type === 'In' ? 'bg-green-100 dark:bg-green-900/20' :
                    movement.type === 'Out' ? 'bg-red-100 dark:bg-red-900/20' :
                    'bg-yellow-100 dark:bg-yellow-900/20'
                  }`}>
                    {movement.type === 'In' ? (
                      <TrendingUp size={16} className="text-green-600" />
                    ) : movement.type === 'Out' ? (
                      <TrendingDown size={16} className="text-red-600" />
                    ) : (
                      <Package size={16} className="text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{product?.productName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{movement.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    movement.type === 'In' ? 'text-green-600' :
                    movement.type === 'Out' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                    {movement.type === 'In' ? '+' : movement.type === 'Out' ? '-' : ''}
                    {Math.abs(movement.quantity)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {new Date(movement.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inventory Details Modal */}
      {selectedItem && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Inventory Details - ${selectedItem.productName}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Product Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">SKU:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedItem.sku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedItem.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Supplier:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedItem.supplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Location:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedItem.location}</span>
                  </div>
                  {selectedItem.batchNumber && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Batch:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedItem.batchNumber}</span>
                    </div>
                  )}
                  {selectedItem.expiryDate && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Expiry:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedItem.expiryDate}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Stock Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current Stock:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedItem.currentStock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Reserved:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedItem.reservedStock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Available:</span>
                    <span className="text-sm font-medium text-green-600">{selectedItem.availableStock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Min Stock:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedItem.minStock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Max Stock:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedItem.maxStock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Unit Cost:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">${selectedItem.unitCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Value:</span>
                    <span className="text-sm font-bold text-green-600">${selectedItem.totalValue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Stock Level Status</h4>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${
                    selectedItem.currentStock <= selectedItem.minStock ? 'bg-red-500' :
                    selectedItem.currentStock <= selectedItem.minStock * 1.5 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((selectedItem.currentStock / selectedItem.maxStock) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span>0</span>
                <span>Min: {selectedItem.minStock}</span>
                <span>Max: {selectedItem.maxStock}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last restocked on {selectedItem.lastRestocked}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Stock Adjustment Modal */}
      {selectedItem && (
        <Modal
          isOpen={showStockModal}
          onClose={() => setShowStockModal(false)}
          title={`${stockAction === 'add' ? 'Add' : 'Remove'} Stock - ${selectedItem.productName}`}
          size="md"
        >
          <form onSubmit={handleStockSubmit} className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Current Stock Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Current Stock:</span>
                  <span className="font-medium text-gray-900 dark:text-white ml-2">{selectedItem.currentStock}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Available:</span>
                  <span className="font-medium text-gray-900 dark:text-white ml-2">{selectedItem.availableStock}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Quantity to {stockAction === 'add' ? 'Add' : 'Remove'}
              </label>
              <input
                type="number"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter quantity"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Reason
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {stockAction === 'add' ? (
                  <>
                    <option>Purchase Order</option>
                    <option>Return from Customer</option>
                    <option>Stock Transfer</option>
                    <option>Inventory Adjustment</option>
                  </>
                ) : (
                  <>
                    <option>Sale</option>
                    <option>Damaged Goods</option>
                    <option>Expired</option>
                    <option>Stock Transfer</option>
                    <option>Inventory Adjustment</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Reference (Optional)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., PO-2024-001, ORD-2024-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Additional notes..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowStockModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 text-white rounded-lg ${
                  stockAction === 'add' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {stockAction === 'add' ? 'Add Stock' : 'Remove Stock'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};