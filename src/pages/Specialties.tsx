import React, { useState } from 'react';
import { PageHeader } from '../components/Common/PageHeader';
import { DataTable } from '../components/Common/DataTable';
import { Modal } from '../components/Common/Modal';
import { Users, Stethoscope } from 'lucide-react';

interface Specialty {
  id: string;
  name: string;
  description: string;
  doctorCount: number;
  clinicCount: number;
  createdDate: string;
}

export const Specialties: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const specialties: Specialty[] = [
    {
      id: '1',
      name: 'Cardiology',
      description: 'Diagnosis and treatment of heart and blood vessel disorders',
      doctorCount: 15,
      clinicCount: 8,
      createdDate: '2023-01-15',
    },
    {
      id: '2',
      name: 'Neurology',
      description: 'Treatment of disorders of the nervous system',
      doctorCount: 12,
      clinicCount: 6,
      createdDate: '2023-02-10',
    },
    {
      id: '3',
      name: 'Pediatrics',
      description: 'Medical care for infants, children, and adolescents',
      doctorCount: 20,
      clinicCount: 10,
      createdDate: '2023-01-20',
    },
    {
      id: '4',
      name: 'Dermatology',
      description: 'Treatment of skin, hair, and nail disorders',
      doctorCount: 8,
      clinicCount: 5,
      createdDate: '2023-03-05',
    },
    {
      id: '5',
      name: 'Orthopedics',
      description: 'Treatment of musculoskeletal system disorders',
      doctorCount: 18,
      clinicCount: 7,
      createdDate: '2023-02-28',
    },
  ];

  const columns = [
    { key: 'name', label: 'Specialty Name', sortable: true },
    { key: 'description', label: 'Description', sortable: false },
    { key: 'doctorCount', label: 'Doctors', sortable: true },
    { key: 'clinicCount', label: 'Clinics', sortable: true },
    { key: 'createdDate', label: 'Created Date', sortable: true },
  ];

  const handleView = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    setShowModal(true);
  };

  const handleEdit = (specialty: Specialty) => {
    console.log('Edit specialty:', specialty);
  };

  const handleDelete = (specialty: Specialty) => {
    console.log('Delete specialty:', specialty);
  };

  const handleAddSpecialty = () => {
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Specialties Management" 
        description="Manage medical specialties and track associated doctors"
        action={{ label: 'Add New Specialty', onClick: handleAddSpecialty }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Specialties</p>
              <p className="text-2xl font-bold text-gray-900">{specialties.length}</p>
            </div>
            <Stethoscope size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Doctors</p>
              <p className="text-2xl font-bold text-green-600">
                {specialties.reduce((sum, s) => sum + s.doctorCount, 0)}
              </p>
            </div>
            <Users size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average per Specialty</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(specialties.reduce((sum, s) => sum + s.doctorCount, 0) / specialties.length)}
              </p>
            </div>
            <div className="text-purple-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Specialties Table */}
      <DataTable
        data={specialties}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search specialties..."
      />

      {/* Specialty Details Modal */}
      {selectedSpecialty && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Specialty Details - ${selectedSpecialty.name}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Specialty Name:</span>
                    <span className="text-sm font-medium">{selectedSpecialty.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Created Date:</span>
                    <span className="text-sm font-medium">{selectedSpecialty.createdDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Associated Doctors:</span>
                    <span className="text-sm font-medium">{selectedSpecialty.doctorCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Associated Clinics:</span>
                    <span className="text-sm font-medium">{selectedSpecialty.clinicCount}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Statistics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Doctors per Clinic:</span>
                    <span className="text-sm font-medium">
                      {(selectedSpecialty.doctorCount / selectedSpecialty.clinicCount).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Market Share:</span>
                    <span className="text-sm font-medium">
                      {((selectedSpecialty.doctorCount / specialties.reduce((sum, s) => sum + s.doctorCount, 0)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Description</h4>
              <p className="text-sm text-gray-700">{selectedSpecialty.description}</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Specialty Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Specialty"
        size="lg"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialty Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter specialty name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter specialty description"
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
              Add Specialty
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};