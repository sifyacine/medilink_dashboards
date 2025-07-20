import React, { useState } from 'react';
import { PageHeader } from '../components/Common/PageHeader';
import { DataTable } from '../components/Common/DataTable';
import { Modal } from '../components/Common/Modal';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';

interface Nurse {
  id: string;
  name: string;
  email: string;
  phone: string;
  clinic: string;
  licenseNumber: string;
  department: string;
  experience: number;
  joinDate: string;
  qualifications: string[];
  address: string;
  status: 'Active' | 'Inactive' | 'On Leave';
}

export const Nurses: React.FC = () => {
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const nurses: Nurse[] = [
    {
      id: '1',
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@clinic.com',
      phone: '+1 (555) 123-4567',
      clinic: 'Central Medical Center',
      licenseNumber: 'RN123456',
      department: 'Emergency',
      experience: 5,
      joinDate: '2021-03-15',
      qualifications: ['BSN', 'ACLS', 'PALS'],
      address: '123 Main St, City, State 12345',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Jennifer Smith',
      email: 'jennifer.smith@clinic.com',
      phone: '+1 (555) 234-5678',
      clinic: 'HealthFirst Clinic',
      licenseNumber: 'RN234567',
      department: 'Pediatrics',
      experience: 8,
      joinDate: '2019-08-20',
      qualifications: ['BSN', 'CPN', 'PALS'],
      address: '456 Oak Ave, City, State 12345',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Amanda Johnson',
      email: 'amanda.johnson@clinic.com',
      phone: '+1 (555) 345-6789',
      clinic: 'City General Hospital',
      licenseNumber: 'RN345678',
      department: 'ICU',
      experience: 12,
      joinDate: '2017-01-10',
      qualifications: ['BSN', 'CCRN', 'ACLS'],
      address: '789 Pine Rd, City, State 12345',
      status: 'On Leave',
    },
  ];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'clinic', label: 'Clinic', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'licenseNumber', label: 'License', sortable: true },
    { key: 'experience', label: 'Experience (Years)', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : value === 'On Leave'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
  ];

  const handleView = (nurse: Nurse) => {
    setSelectedNurse(nurse);
    setShowModal(true);
  };

  const handleEdit = (nurse: Nurse) => {
    console.log('Edit nurse:', nurse);
  };

  const handleDelete = (nurse: Nurse) => {
    console.log('Delete nurse:', nurse);
  };

  const handleAddNurse = () => {
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Nurses Management" 
        description="Manage nurse profiles and track their information"
        action={{ label: 'Add New Nurse', onClick: handleAddNurse }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Nurses</p>
              <p className="text-2xl font-bold text-gray-900">{nurses.length}</p>
            </div>
            <div className="text-blue-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Nurses</p>
              <p className="text-2xl font-bold text-green-600">
                {nurses.filter(n => n.status === 'Active').length}
              </p>
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
              <p className="text-sm font-medium text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-yellow-600">
                {nurses.filter(n => n.status === 'On Leave').length}
              </p>
            </div>
            <div className="text-yellow-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Experience</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(nurses.reduce((sum, n) => sum + n.experience, 0) / nurses.length)} years
              </p>
            </div>
            <div className="text-purple-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Nurses Table */}
      <DataTable
        data={nurses}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search nurses..."
      />

      {/* Nurse Details Modal */}
      {selectedNurse && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Nurse Details - ${selectedNurse.name}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedNurse.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedNurse.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedNurse.address}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Professional Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Clinic:</span>
                    <span className="text-sm font-medium">{selectedNurse.clinic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Department:</span>
                    <span className="text-sm font-medium">{selectedNurse.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">License:</span>
                    <span className="text-sm font-medium">{selectedNurse.licenseNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Experience:</span>
                    <span className="text-sm font-medium">{selectedNurse.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Join Date:</span>
                    <span className="text-sm font-medium">{selectedNurse.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`text-sm font-medium ${
                      selectedNurse.status === 'Active' ? 'text-green-600' : 
                      selectedNurse.status === 'On Leave' ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {selectedNurse.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Qualifications</h4>
              <div className="flex flex-wrap gap-2">
                {selectedNurse.qualifications.map((qualification) => (
                  <span key={qualification} className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">
                    {qualification}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Nurse Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Nurse"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter full name"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter license number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Clinic
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                <option>Central Medical Center</option>
                <option>HealthFirst Clinic</option>
                <option>City General Hospital</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                <option>Emergency</option>
                <option>ICU</option>
                <option>Pediatrics</option>
                <option>Surgery</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience (Years)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter years of experience"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Join Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter full address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Qualifications (comma-separated)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="e.g., BSN, ACLS, PALS"
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
              Add Nurse
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};