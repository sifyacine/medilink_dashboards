import React, { useState } from 'react';
import { PageHeader } from '../components/Common/PageHeader';
import { DataTable } from '../components/Common/DataTable';
import { Modal } from '../components/Common/Modal';
import { Package, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  manufacturer: string;
  isActive: boolean;
  createdDate: string;
  lastUpdated: string;
  imageUrl?: string;
}

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const products: Product[] = [
    {
      id: '1',
      name: 'Digital Thermometer',
      category: 'Medical Devices',
      description: 'Accurate digital thermometer with fever alarm',
      price: 24.99,
      stock: 150,
      sku: 'MT-001',
      manufacturer: 'MediTech',
      isActive: true,
      createdDate: '2024-01-15',
      lastUpdated: '2024-02-10',
      imageUrl: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '2',
      name: 'Blood Pressure Monitor',
      category: 'Medical Devices',
      description: 'Automatic blood pressure monitor with large display',
      price: 89.99,
      stock: 45,
      sku: 'BP-002',
      manufacturer: 'HealthTech',
      isActive: true,
      createdDate: '2024-01-20',
      lastUpdated: '2024-02-05',
      imageUrl: 'https://images.pexels.com/photos/4386432/pexels-photo-4386432.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '3',
      name: 'Surgical Mask Pack',
      category: 'Medical Supplies',
      description: '50-pack of disposable surgical masks',
      price: 12.99,
      stock: 8,
      sku: 'SM-003',
      manufacturer: 'SafeGuard',
      isActive: true,
      createdDate: '2024-02-01',
      lastUpdated: '2024-02-15',
      imageUrl: 'https://images.pexels.com/photos/4386405/pexels-photo-4386405.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '4',
      name: 'Wheelchair',
      category: 'Mobility Equipment',
      description: 'Lightweight folding wheelchair with footrests',
      price: 299.99,
      stock: 12,
      sku: 'WC-004',
      manufacturer: 'MobilityPro',
      isActive: true,
      createdDate: '2024-01-10',
      lastUpdated: '2024-01-10',
      imageUrl: 'https://images.pexels.com/photos/4386369/pexels-photo-4386369.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '5',
      name: 'Stethoscope',
      category: 'Medical Equipment',
      description: 'Professional grade stethoscope for medical examination',
      price: 159.99,
      stock: 0,
      sku: 'ST-005',
      manufacturer: 'MedScope',
      isActive: false,
      createdDate: '2024-01-05',
      lastUpdated: '2024-02-01',
      imageUrl: 'https://images.pexels.com/photos/4386443/pexels-photo-4386443.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  ];

  const columns = [
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'sku', label: 'SKU', sortable: true },
    { 
      key: 'price', 
      label: 'Price', 
      sortable: true,
      render: (value: number) => `$${value.toFixed(2)}`
    },
    { 
      key: 'stock', 
      label: 'Stock', 
      sortable: true,
      render: (value: number) => (
        <span className={`font-medium ${value === 0 ? 'text-red-600' : value < 20 ? 'text-yellow-600' : 'text-green-600'}`}>
          {value}
        </span>
      )
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

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    console.log('Edit product:', product);
  };

  const handleDelete = (product: Product) => {
    console.log('Delete product:', product);
  };

  const handleAddProduct = () => {
    setShowAddModal(true);
  };

  const activeProducts = products.filter(p => p.isActive);
  const lowStockProducts = products.filter(p => p.stock < 20 && p.stock > 0);
  const outOfStockProducts = products.filter(p => p.stock === 0);
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Products Management" 
        description="Manage medical products and equipment inventory"
        action={{ label: 'Add New Product', onClick: handleAddProduct }}
      />

      {/* Alerts */}
      {outOfStockProducts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle size={20} className="text-red-600" />
            <h3 className="font-medium text-red-800">Out of Stock Alert</h3>
          </div>
          <p className="text-red-700 text-sm">
            {outOfStockProducts.length} product(s) are out of stock: {' '}
            {outOfStockProducts.map(p => p.name).join(', ')}
          </p>
        </div>
      )}

      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle size={20} className="text-yellow-600" />
            <h3 className="font-medium text-yellow-800">Low Stock Warning</h3>
          </div>
          <p className="text-yellow-700 text-sm">
            {lowStockProducts.length} product(s) are running low: {' '}
            {lowStockProducts.map(p => p.name).join(', ')}
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <Package size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Products</p>
              <p className="text-2xl font-bold text-green-600">{activeProducts.length}</p>
            </div>
            <div className="text-green-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{lowStockProducts.length}</p>
            </div>
            <AlertTriangle size={24} className="text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</p>
            </div>
            <DollarSign size={24} className="text-green-600" />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <DataTable
        data={products}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search products..."
      />

      {/* Product Details Modal */}
      {selectedProduct && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Product Details - ${selectedProduct.name}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              {selectedProduct.imageUrl && (
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{selectedProduct.name}</h3>
                <p className="text-gray-600 mt-1">{selectedProduct.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Product Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">SKU:</span>
                    <span className="text-sm font-medium">{selectedProduct.sku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Category:</span>
                    <span className="text-sm font-medium">{selectedProduct.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Manufacturer:</span>
                    <span className="text-sm font-medium">{selectedProduct.manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="text-sm font-medium">${selectedProduct.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Stock:</span>
                    <span className={`text-sm font-medium ${
                      selectedProduct.stock === 0 ? 'text-red-600' : 
                      selectedProduct.stock < 20 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {selectedProduct.stock}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`text-sm font-medium ${
                      selectedProduct.isActive ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {selectedProduct.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Dates</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Created:</span>
                    <span className="text-sm font-medium">{selectedProduct.createdDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Updated:</span>
                    <span className="text-sm font-medium">{selectedProduct.lastUpdated}</span>
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-900 mt-6 mb-3">Value</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Value:</span>
                    <span className="text-sm font-bold text-green-600">
                      ${(selectedProduct.price * selectedProduct.stock).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter SKU"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                <option>Medical Devices</option>
                <option>Medical Supplies</option>
                <option>Medical Equipment</option>
                <option>Mobility Equipment</option>
                <option>Pharmaceuticals</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manufacturer
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter manufacturer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter stock quantity"
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
              placeholder="Enter product description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter image URL"
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
              Add Product
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};