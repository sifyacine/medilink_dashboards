import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/tables/DataTable';
import { Modal } from '../../components/common/Modal';
import { Tag, Package, TrendingUp } from 'lucide-react';

interface PharmacyCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  parentId?: string;
  parentName?: string;
  productCount: number;
  isActive: boolean;
  sortOrder: number;
  imageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export const Categories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PharmacyCategory | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data - will be replaced with API calls
  const categories: PharmacyCategory[] = [
    {
      id: '1',
      name: 'Pain Relief',
      description: 'Over-the-counter and prescription pain relief medications',
      slug: 'pain-relief',
      productCount: 45,
      isActive: true,
      sortOrder: 1,
      imageUrl: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      seoTitle: 'Pain Relief Medications - Fast Acting Solutions',
      seoDescription: 'Browse our comprehensive selection of pain relief medications including tablets, gels, and sprays.',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-10'
    },
    {
      id: '2',
      name: 'Vitamins & Supplements',
      description: 'Essential vitamins, minerals, and dietary supplements',
      slug: 'vitamins-supplements',
      productCount: 78,
      isActive: true,
      sortOrder: 2,
      imageUrl: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      seoTitle: 'Vitamins & Supplements - Health & Wellness',
      seoDescription: 'High-quality vitamins and supplements to support your health and wellness goals.',
      createdAt: '2024-01-16',
      updatedAt: '2024-02-08'
    },
    {
      id: '3',
      name: 'Medical Devices',
      description: 'Medical equipment and diagnostic devices',
      slug: 'medical-devices',
      productCount: 23,
      isActive: true,
      sortOrder: 3,
      imageUrl: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=300',
      seoTitle: 'Medical Devices - Professional Healthcare Equipment',
      seoDescription: 'Professional medical devices and equipment for healthcare professionals and home use.',
      createdAt: '2024-01-18',
      updatedAt: '2024-02-05'
    },
    {
      id: '4',
      name: 'First Aid',
      description: 'First aid supplies and emergency medical items',
      slug: 'first-aid',
      productCount: 34,
      isActive: true,
      sortOrder: 4,
      createdAt: '2024-01-20',
      updatedAt: '2024-02-01'
    },
    {
      id: '5',
      name: 'Personal Care',
      description: 'Personal hygiene and care products',
      slug: 'personal-care',
      productCount: 56,
      isActive: true,
      sortOrder: 5,
      createdAt: '2024-01-22',
      updatedAt: '2024-01-30'
    },
    {
      id: '6',
      name: 'Prescription Medications',
      description: 'Prescription-only medicines',
      slug: 'prescription-medications',
      productCount: 89,
      isActive: false,
      sortOrder: 6,
      createdAt: '2024-01-25',
      updatedAt: '2024-02-12'
    }
  ];

  const columns = [
    {
      key: 'name',
      label: 'Category',
      sortable: true,
      render: (value: string, row: PharmacyCategory) => (
        <div className="flex items-center space-x-3">
          {row.imageUrl && (
            <img
              src={row.imageUrl}
              alt={value}
              className="w-10 h-10 rounded-lg object-cover"
            />
          )}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{row.slug}</p>
          </div>
        </div>
      )
    },
    {
      key: 'description',
      label: 'Description',
      sortable: false,
      render: (value: string) => (
        <span className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{value}</span>
      )
    },
    {
      key: 'productCount',
      label: 'Products',
      sortable: true,
      render: (value: number) => (
        <span className="font-medium text-gray-900 dark:text-white">{value}</span>
      )
    },
    { key: 'sortOrder', label: 'Order', sortable: true },
    {
      key: 'isActive',
      label: 'Status',
      sortable: true,
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${value ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
          'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
          }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'updatedAt',
      label: 'Last Updated',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
  ];

  const handleView = (category: PharmacyCategory) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleEdit = (category: PharmacyCategory) => {
    setSelectedCategory(category);
    setShowAddModal(true);
  };

  const handleDelete = (category: PharmacyCategory) => {
    console.log('Delete category:', category);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setShowAddModal(true);
  };

  const activeCategories = categories.filter(c => c.isActive);
  const totalProducts = categories.reduce((sum, c) => sum + c.productCount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Category Management"
        description="Organize your products with categories and subcategories"
        action={{ label: 'Add New Category', onClick: handleAddCategory }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
            </div>
            <Tag size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Categories</p>
              <p className="text-2xl font-bold text-green-600">{activeCategories.length}</p>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-purple-600">{totalProducts}</p>
            </div>
            <Package size={24} className="text-purple-600" />
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <DataTable
        data={categories}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search categories..."
      />

      {/* Category Details Modal */}
      {selectedCategory && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Category Details - ${selectedCategory.name}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              {selectedCategory.imageUrl && (
                <img
                  src={selectedCategory.imageUrl}
                  alt={selectedCategory.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedCategory.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedCategory.description}</p>
                <div className="flex items-center space-x-4 mt-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedCategory.productCount} products
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedCategory.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                    }`}>
                    {selectedCategory.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Category Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Slug:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedCategory.slug}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Sort Order:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedCategory.sortOrder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Product Count:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedCategory.productCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Created:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedCategory.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last Updated:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedCategory.updatedAt}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">SEO Information</h4>
                <div className="space-y-2">
                  {selectedCategory.seoTitle && (
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">SEO Title:</span>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedCategory.seoTitle}</p>
                    </div>
                  )}
                  {selectedCategory.seoDescription && (
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">SEO Description:</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{selectedCategory.seoDescription}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add/Edit Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={selectedCategory ? 'Edit Category' : 'Add New Category'}
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Name
              </label>
              <input
                type="text"
                defaultValue={selectedCategory?.name}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slug
              </label>
              <input
                type="text"
                defaultValue={selectedCategory?.slug}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="category-slug"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Parent Category
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">No Parent (Top Level)</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort Order
              </label>
              <input
                type="number"
                defaultValue={selectedCategory?.sortOrder}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              defaultValue={selectedCategory?.description}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter category description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image URL
            </label>
            <input
              type="url"
              defaultValue={selectedCategory?.imageUrl}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                SEO Title
              </label>
              <input
                type="text"
                defaultValue={selectedCategory?.seoTitle}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="SEO optimized title"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked={selectedCategory?.isActive}
                  className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              SEO Description
            </label>
            <textarea
              rows={2}
              defaultValue={selectedCategory?.seoDescription}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="SEO meta description"
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
              {selectedCategory ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};