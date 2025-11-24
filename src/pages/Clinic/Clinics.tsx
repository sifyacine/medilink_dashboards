import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/tables/DataTable';
import { Modal } from '../../components/common/Modal';
import { MapPin, Phone, Mail, CheckCircle, Clock } from 'lucide-react';

interface Clinic {
  id: string;
  name: string;
  location: string;
  contact: string;
  email: string;
  status: 'Active' | 'Pending' | 'Inactive';
  registrationDate: string;
  specialties: string[];
  doctors: number;
  nurses: number;
}

export const Clinics: React.FC = () => {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const clinics: Clinic[] = [
    {
      id: '1',
      name: 'Central Medical Center',
      location: 'Downtown District',
      contact: '+1 (555) 123-4567',
      email: 'info@centralmedical.com',
      status: 'Active',
      registrationDate: '2023-01-15',
      specialties: ['Cardiology', 'Neurology', 'Pediatrics'],
      doctors: 12,
      nurses: 18,
    },
    {
      id: '2',
      name: 'HealthFirst Clinic',
      location: 'Suburban Area',
      contact: '+1 (555) 234-5678',
      email: 'contact@healthfirst.com',
      status: 'Pending',
      registrationDate: '2023-12-01',
      specialties: ['General Medicine', 'Dermatology'],
      doctors: 8,
      nurses: 12,
    },
    {
      id: '3',
      name: 'City General Hospital',
      location: 'Medical District',
      contact: '+1 (555) 345-6789',
      email: 'admin@citygeneral.com',
      status: 'Active',
      registrationDate: '2022-08-20',
      specialties: ['Emergency', 'Surgery', 'ICU', 'Maternity'],
      doctors: 25,
      nurses: 45,
    },
  ];

  const columns = [
    { key: 'name', label: 'Clinic Name', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'contact', label: 'Contact', sortable: false },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'Active'
            ? 'bg-green-100 text-green-800'
            : value === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
          {value}
        </span>
      )
    },
    { key: 'doctors', label: 'Doctors', sortable: true },
    { key: 'nurses', label: 'Nurses', sortable: true },
  ];

  const handleView = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setShowModal(true);
  };

  const handleEdit = (clinic: Clinic) => {
    // Handle edit logic
    console.log('Edit clinic:', clinic);
  };

  const handleDelete = (clinic: Clinic) => {
    // Handle delete logic
    console.log('Delete clinic:', clinic);
  };

  const handleAddClinic = () => {
    setShowAddModal(true);
  };

  const handleApprove = (clinic: Clinic) => {
    // Handle approval logic
    console.log('Approve clinic:', clinic);
  };

  const handleReject = (clinic: Clinic) => {
    // Handle rejection logic
    console.log('Reject clinic:', clinic);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clinics Management"
        description="Manage clinic registrations and monitor clinic network"
        action={{ label: 'Add New Clinic', onClick: handleAddClinic }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Clinics</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{clinics.length}</p>
            </div>
            <CheckCircle size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Clinics</p>
              <p className="text-2xl font-bold text-green-600">
                {clinics.filter(c => c.status === 'Active').length}
              </p>
            </div>
            <CheckCircle size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {clinics.filter(c => c.status === 'Pending').length}
              </p>
            </div>
            <Clock size={24} className="text-yellow-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Staff</p>
              <p className="text-2xl font-bold text-purple-600">
                {clinics.reduce((sum, c) => sum + c.doctors + c.nurses, 0)}
              </p>
            </div>
            <CheckCircle size={24} className="text-purple-600" />
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pending Clinic Applications</h3>
        <div className="space-y-4">
          {clinics.filter(c => c.status === 'Pending').map((clinic) => (
            <div key={clinic.id} className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-800 rounded-lg flex items-center justify-center">
                  <Clock size={20} className="text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{clinic.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{clinic.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleView(clinic)}
                  className="text-cyan-600 hover:text-cyan-800 dark:hover:text-cyan-400 text-sm font-medium"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleApprove(clinic)}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(clinic)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinics Table */}
      <DataTable
        data={clinics}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search clinics..."
      />

      {/* Clinic Details Modal */}
      {selectedClinic && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Clinic Details - ${selectedClinic.name}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedClinic.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedClinic.contact}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedClinic.email}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Statistics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Doctors:</span>
                    <span className="text-sm font-medium">{selectedClinic.doctors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Nurses:</span>
                    <span className="text-sm font-medium">{selectedClinic.nurses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Registration Date:</span>
                    <span className="text-sm font-medium">{selectedClinic.registrationDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {selectedClinic.specialties.map((specialty) => (
                  <span key={specialty} className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Clinic Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Clinic"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Clinic Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter clinic name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter contact number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter email address"
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
              placeholder="Enter clinic description"
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
              Add Clinic
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};