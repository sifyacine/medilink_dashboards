import React, { useState } from 'react';
import { PageHeader } from '../components/Common/PageHeader';
import { DataTable } from '../components/Common/DataTable';
import { Modal } from '../components/Common/Modal';
import { AlertTriangle, Package, DollarSign, Calendar } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  stock: number;
  price: number;
  expiryDate: string;
  description: string;
  dosage: string;
  sideEffects: string[];
  warnings: string[];
}

export const Medicines: React.FC = () => {
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const medicines: Medicine[] = [
    {
      id: '1',
      name: 'Paracetamol',
      category: 'Pain Relief',
      manufacturer: 'PharmaCorp',
      stock: 150,
      price: 5.99,
      expiryDate: '2024-12-31',
      description: 'Effective pain relief and fever reducer',
      dosage: '500mg tablets, 1-2 tablets every 4-6 hours',
      sideEffects: ['Nausea', 'Stomach upset'],
      warnings: ['Do not exceed 8 tablets in 24 hours', 'Avoid alcohol'],
    },
    {
      id: '2',
      name: 'Amoxicillin',
      category: 'Antibiotics',
      manufacturer: 'MediLab',
      stock: 25,
      price: 12.50,
      expiryDate: '2024-06-15',
      description: 'Broad-spectrum antibiotic for bacterial infections',
      dosage: '250mg capsules, 3 times daily',
      sideEffects: ['Diarrhea', 'Nausea', 'Skin rash'],
      warnings: ['Complete full course', 'Take with food'],
    },
    {
      id: '3',
      name: 'Lisinopril',
      category: 'Cardiovascular',
      manufacturer: 'CardioMed',
      stock: 80,
      price: 18.75,
      expiryDate: '2025-03-20',
      description: 'ACE inhibitor for high blood pressure',
      dosage: '10mg tablets, once daily',
      sideEffects: ['Dry cough', 'Dizziness'],
      warnings: ['Monitor blood pressure regularly', 'Avoid potassium supplements'],
    },
  ];

  const columns = [
    { key: 'name', label: 'Medicine Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'manufacturer', label: 'Manufacturer', sortable: true },
    { 
      key: 'stock', 
      label: 'Stock', 
      sortable: true,
      render: (value: number) => (
        <span className={`font-medium ${value < 30 ? 'text-red-600' : 'text-green-600'}`}>
          {value}
        </span>
      )
    },
    { 
      key: 'price', 
      label: 'Price', 
      sortable: true,
      render: (value: number) => `$${value.toFixed(2)}`
    },
    { 
      key: 'expiryDate', 
      label: 'Expiry Date', 
      sortable: true,
      render: (value: string) => {
        const isExpiring = new Date(value) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        return (
          <span className={isExpiring ? 'text-red-600 font-medium' : 'text-gray-900'}>
            {value}
          </span>
        );
      }
    },
  ];

  const handleView = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setShowModal(true);
  };

  const handleEdit = (medicine: Medicine) => {
    console.log('Edit medicine:', medicine);
  };

  const handleDelete = (medicine: Medicine) => {
    console.log('Delete medicine:', medicine);
  };

  const handleAddMedicine = () => {
    setShowAddModal(true);
  };

  // Get low stock medicines
  const lowStockMedicines = medicines.filter(m => m.stock < 30);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Medicines Management" 
        description="Manage medicine inventory and track stock levels"
        action={{ label: 'Add New Medicine', onClick: handleAddMedicine }}
      />

      {/* Alerts */}
      {lowStockMedicines.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle size={20} className="text-red-600" />
            <h3 className="font-medium text-red-800">Low Stock Alert</h3>
          </div>
          <p className="text-red-700 text-sm">
            {lowStockMedicines.length} medicine(s) are running low on stock: {' '}
            {lowStockMedicines.map(m => m.name).join(', ')}
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Medicines</p>
              <p className="text-2xl font-bold text-gray-900">{medicines.length}</p>
            </div>
            <Package size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-red-600">{lowStockMedicines.length}</p>
            </div>
            <AlertTriangle size={24} className="text-red-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-green-600">
                ${medicines.reduce((sum, m) => sum + (m.stock * m.price), 0).toFixed(2)}
              </p>
            </div>
            <DollarSign size={24} className="text-green-600" />
          </div>
        </div>
      </div>

      {/* Medicines Table */}
      <DataTable
        data={medicines}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search medicines..."
      />

      {/* Medicine Details Modal */}
      {selectedMedicine && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Medicine Details - ${selectedMedicine.name}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Category:</span>
                    <span className="text-sm font-medium">{selectedMedicine.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Manufacturer:</span>
                    <span className="text-sm font-medium">{selectedMedicine.manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Stock:</span>
                    <span className={`text-sm font-medium ${
                      selectedMedicine.stock < 30 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {selectedMedicine.stock}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="text-sm font-medium">${selectedMedicine.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Expiry Date:</span>
                    <span className="text-sm font-medium">{selectedMedicine.expiryDate}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Dosage Information</h4>
                <p className="text-sm text-gray-700">{selectedMedicine.dosage}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Description</h4>
              <p className="text-sm text-gray-700">{selectedMedicine.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Side Effects</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMedicine.sideEffects.map((effect, index) => (
                  <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    {effect}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Warnings</h4>
              <div className="space-y-2">
                {selectedMedicine.warnings.map((warning, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <AlertTriangle size={16} className="text-red-500 mt-0.5" />
                    <span className="text-sm text-gray-700">{warning}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Medicine Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Medicine"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medicine Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter medicine name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                <option>Pain Relief</option>
                <option>Antibiotics</option>
                <option>Cardiovascular</option>
                <option>Respiratory</option>
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
                Stock Quantity
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter stock quantity"
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
                Expiry Date
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
              placeholder="Enter medicine description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dosage Instructions
            </label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter dosage instructions"
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
              Add Medicine
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};