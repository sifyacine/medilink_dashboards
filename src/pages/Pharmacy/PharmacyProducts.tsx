import React, { useState } from 'react';
import { PageHeader } from '../../components/Common/PageHeader';
import { DataTable } from '../../components/Common/DataTable';
import { Modal } from '../../components/Common/Modal';
import { Package, DollarSign, AlertTriangle, TrendingUp, Star, Eye } from 'lucide-react';

interface PharmacyProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  sku: string;
  price: number;
  comparePrice?: number;
  cost: number;
  stock: number;
  minStock: number;
  maxStock: number;
  weight?: number;
  dimensions?: string;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  soldCount: number;
  rating: number;
  reviewCount: number;
}

export const PharmacyProducts: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<PharmacyProduct | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data - will be replaced with API calls
  const products: PharmacyProduct[] = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      description: 'Effective pain relief and fever reducer tablets',
      category: 'Pain Relief',
      brand: 'PharmaCorp',
      sku: 'PC-PAR-500',
      price: 12.99,
      comparePrice: 15.99,
      cost: 8.50,
      stock: 150,
      minStock: 50,
      maxStock: 500,
      weight: 0.1,
      dimensions: '10x5x2 cm',
      images: ['https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'],
      isActive: true,
      isFeatured: true,
      tags: ['pain relief', 'fever', 'headache'],
      seoTitle: 'Paracetamol 500mg - Fast Pain Relief',
      seoDescription: 'Effective paracetamol tablets for pain relief and fever reduction',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-10',
      soldCount: 245,
      rating: 4.5,
      reviewCount: 89
    },
    {
      id: '2',
      name: 'Vitamin D3 1000 IU',
      description: 'Essential vitamin D supplement for bone health',
      category: 'Vitamins',
      brand: 'HealthPlus',
      sku: 'HP-VD3-1000',
      price: 24.99,
      cost: 15.00,
      stock: 75,
      minStock: 30,
      maxStock: 200,
      weight: 0.05,
      images: ['https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'],
      isActive: true,
      isFeatured: false,
      tags: ['vitamin', 'bone health', 'supplement'],
      createdAt: '2024-01-20',
      updatedAt: '2024-02-05',
      soldCount: 189,
      rating: 4.7,
      reviewCount: 56
    },
    {
      id: '3',
      name: 'Digital Thermometer',
      description: 'Accurate digital thermometer with fever alarm',
      category: 'Medical Devices',
      brand: 'MediTech',
      sku: 'MT-THERM-001',
      price: 29.99,
      comparePrice: 34.99,
      cost: 18.00,
      stock: 25,
      minStock: 20,
      maxStock: 100,
      weight: 0.2,
      dimensions: '15x3x2 cm',
      images: ['https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=300'],
      isActive: true,
      isFeatured: true,
      tags: ['thermometer', 'fever', 'medical device'],
      createdAt: '2024-02-01',
      updatedAt: '2024-02-15',
      soldCount: 67,
      rating: 4.3,
      reviewCount: 23
    }
  ];

  const columns = [
    { 
      key: 'name', 
      label: 'Product', 
      sortable: true,
      render: (value: string, row: PharmacyProduct) => (
        <div className="flex items-center space-x-3">
          <img 
            src={row.images[0]} 
            alt={value} 
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{row.sku}</p>
          </div>
        </div>
      )
    },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'brand', label: 'Brand', sortable: true },
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
      render: (value: number, row: PharmacyProduct) => (
        <span className={`font-medium ${
          value <= row.minStock ? 'text-red-600' : 
          value <= row.minStock * 1.5 ? 'text-yellow-600' : 'text-green-600'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'rating', 
      label: 'Rating', 
      sortable: true,
      render: (value: number, row: PharmacyProduct) => (
        <div className="flex items-center space-x-1">
          <Star size={16} className="text-yellow-500 fill-current" />
          <span className="text-sm">{value}</span>
          <span className="text-xs text-gray-500">({row.reviewCount})</span>
        </div>
      )
    },
    { 
      key: 'isActive', 
      label: 'Status', 
      sortable: true,
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 
          'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
  ];

  const handleView = (product: PharmacyProduct) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleEdit = (product: PharmacyProduct) => {
    setSelectedProduct(product);
    setShowAddModal(true);
  };

  const handleDelete = (product: PharmacyProduct) => {
    console.log('Delete product:', product);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowAddModal(true);
  };

  const activeProducts = products.filter(p => p.isActive);
  const lowStockProducts = products.filter(p => p.stock <= p.minStock);
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const totalProfit = products.reduce((sum, p) => sum + ((p.price - p.cost) * p.soldCount), 0);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Product Management" 
        description="Manage your pharmacy products, inventory, and pricing"
        action={{ label: 'Add New Product', onClick: handleAddProduct }}
      />

      {/* Alerts */}
      {lowStockProducts.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle size={20} className="text-red-600" />
            <h3 className="font-medium text-red-800 dark:text-red-300">Low Stock Alert</h3>
          </div>
          <p className="text-red-700 dark:text-red-300 text-sm">
            {lowStockProducts.length} product(s) are running low: {' '}
            {lowStockProducts.map(p => p.name).join(', ')}
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</p>
            </div>
            <Package size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Products</p>
              <p className="text-2xl font-bold text-green-600">{activeProducts.length}</p>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inventory Value</p>
              <p className="text-2xl font-bold text-purple-600">${totalValue.toFixed(2)}</p>
            </div>
            <DollarSign size={24} className="text-purple-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Profit</p>
              <p className="text-2xl font-bold text-emerald-600">${totalProfit.toFixed(2)}</p>
            </div>
            <TrendingUp size={24} className="text-emerald-600" />
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
          size="xl"
        >
          <div className="space-y-6">
            <div className="flex items-start space-x-6">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedProduct.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedProduct.description}</p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{selectedProduct.rating}</span>
                    <span className="text-sm text-gray-500">({selectedProduct.reviewCount} reviews)</span>
                  </div>
                  <span className="text-sm text-gray-500">Sold: {selectedProduct.soldCount}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Product Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">SKU:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedProduct.sku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedProduct.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Brand:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedProduct.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Weight:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedProduct.weight}kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Dimensions:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedProduct.dimensions}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Pricing & Inventory</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Price:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">${selectedProduct.price.toFixed(2)}</span>
                  </div>
                  {selectedProduct.comparePrice && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Compare Price:</span>
                      <span className="text-sm text-gray-500 line-through">${selectedProduct.comparePrice.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Cost:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">${selectedProduct.cost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Profit Margin:</span>
                    <span className="text-sm font-medium text-green-600">
                      {(((selectedProduct.price - selectedProduct.cost) / selectedProduct.price) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Stock:</span>
                    <span className={`text-sm font-medium ${
                      selectedProduct.stock <= selectedProduct.minStock ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {selectedProduct.stock}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Min Stock:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedProduct.minStock}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-300 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {selectedProduct.seoTitle && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">SEO Information</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">SEO Title:</span>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedProduct.seoTitle}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">SEO Description:</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{selectedProduct.seoDescription}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={selectedProduct ? 'Edit Product' : 'Add New Product'}
        size="xl"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Product Name
              </label>
              <input
                type="text"
                defaultValue={selectedProduct?.name}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                SKU
              </label>
              <input
                type="text"
                defaultValue={selectedProduct?.sku}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter SKU"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select 
                defaultValue={selectedProduct?.category}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option>Pain Relief</option>
                <option>Vitamins</option>
                <option>Medical Devices</option>
                <option>Antibiotics</option>
                <option>First Aid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Brand
              </label>
              <input
                type="text"
                defaultValue={selectedProduct?.brand}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={selectedProduct?.price}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Compare Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={selectedProduct?.comparePrice}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cost ($)
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={selectedProduct?.cost}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                defaultValue={selectedProduct?.stock}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Minimum Stock
              </label>
              <input
                type="number"
                defaultValue={selectedProduct?.minStock}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={selectedProduct?.weight}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              defaultValue={selectedProduct?.description}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              defaultValue={selectedProduct?.tags.join(', ')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., pain relief, fever, headache"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                SEO Title
              </label>
              <input
                type="text"
                defaultValue={selectedProduct?.seoTitle}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="SEO optimized title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image URL
              </label>
              <input
                type="url"
                defaultValue={selectedProduct?.images[0]}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              SEO Description
            </label>
            <textarea
              rows={2}
              defaultValue={selectedProduct?.seoDescription}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="SEO meta description"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={selectedProduct?.isActive}
                className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={selectedProduct?.isFeatured}
                className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Featured</span>
            </label>
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
              {selectedProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};