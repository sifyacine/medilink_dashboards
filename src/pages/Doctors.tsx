import React, { useState } from 'react';
import { PageHeader } from '../components/Common/PageHeader';
import { DataTable } from '../components/Common/DataTable';
import { Modal } from '../components/Common/Modal';
import { Phone, Mail, MapPin, Stethoscope, GraduationCap } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  clinic: string;
  licenseNumber: string;
  experience: number;
  joinDate: string;
  qualifications: string[];
  consultationFee: number;
  address: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  availability: string[];
}

export const Doctors: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@clinic.com',
      phone: '+1 (555) 123-4567',
      specialty: 'Cardiology',
      clinic: 'Central Medical Center',
      licenseNumber: 'MD123456',
      experience: 15,
      joinDate: '2020-01-15',
      qualifications: ['MD', 'FACC', 'Board Certified'],
      consultationFee: 250,
      address: '123 Medical Plaza, City, State 12345',
      status: 'Active',
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@clinic.com',
      phone: '+1 (555) 234-5678',
      specialty: 'Neurology',
      clinic: 'HealthFirst Clinic',
      licenseNumber: 'MD234567',
      experience: 12,
      joinDate: '2021-03-20',
      qualifications: ['MD', 'PhD', 'Board Certified'],
      consultationFee: 300,
      address: '456 Health Ave, City, State 12345',
      status: 'Active',
      availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@clinic.com',
      phone: '+1 (555) 345-6789',
      specialty: 'Pediatrics',
      clinic: 'City General Hospital',
      licenseNumber: 'MD345678',
      experience: 8,
      joinDate: '2022-06-10',
      qualifications: ['MD', 'FAAP', 'Board Certified'],
      consultationFee: 200,
      address: '789 Children Blvd, City, State 12345',
      status: 'On Leave',
      availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    },
  ];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'specialty', label: 'Specialty', sortable: true },
    { key: 'clinic', label: 'Clinic', sortable: true },
    { key: 'licenseNumber', label: 'License', sortable: true },
    { key: 'experience', label: 'Experience (Years)', sortable: true },
    { 
      key: 'consultationFee', 
      label: 'Consultation Fee', 
      sortable: true,
      render: (value: number) => `$${value}`
    },
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

  const handleView = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleEdit = (doctor: Doctor) => {
    console.log('Edit doctor:', doctor);
  };

  const handleDelete = (doctor: Doctor) => {
    console.log('Delete doctor:', doctor);
  };

  const handleAddDoctor = () => {
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Doctors Management" 
        description="Manage doctor profiles and track their information"
        action={{ label: 'Add New Doctor', onClick: handleAddDoctor }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
            </div>
            <Stethoscope size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Doctors</p>
              <p className="text-2xl font-bold text-green-600">
                {doctors.filter(d => d.status === 'Active').length}
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
              <p className="text-sm font-medium text-gray-600">Avg Experience</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(doctors.reduce((sum, d) => sum + d.experience, 0) / doctors.length)} years
              </p>
            </div>
            <GraduationCap size={24} className="text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Consultation Fee</p>
              <p className="text-2xl font-bold text-green-600">
                ${Math.round(doctors.reduce((sum, d) => sum + d.consultationFee, 0) / doctors.length)}
              </p>
            </div>
            <div className="text-green-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Table */}
      <DataTable
        data={doctors}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search doctors..."
      />

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Doctor Profile - ${selectedDoctor.name}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedDoctor.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedDoctor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedDoctor.address}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Professional Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Specialty:</span>
                    <span className="text-sm font-medium">{selectedDoctor.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Clinic:</span>
                    <span className="text-sm font-medium">{selectedDoctor.clinic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">License:</span>
                    <span className="text-sm font-medium">{selectedDoctor.licenseNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Experience:</span>
                    <span className="text-sm font-medium">{selectedDoctor.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Join Date:</span>
                    <span className="text-sm font-medium">{selectedDoctor.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Consultation Fee:</span>
                    <span className="text-sm font-medium">${selectedDoctor.consultationFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`text-sm font-medium ${
                      selectedDoctor.status === 'Active' ? 'text-green-600' : 
                      selectedDoctor.status === 'On Leave' ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {selectedDoctor.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Qualifications</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDoctor.qualifications.map((qualification) => (
                  <span key={qualification} className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">
                    {qualification}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDoctor.availability.map((day) => (
                  <span key={day} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Doctor Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Doctor"
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
                placeholder="Dr. John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="john.doe@clinic.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="MD123456"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
                <option>Orthopedics</option>
                <option>Dermatology</option>
              </select>
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
                Experience (Years)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consultation Fee
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="250"
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
              placeholder="123 Medical Plaza, City, State 12345"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Qualifications (comma-separated)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="MD, FACC, Board Certified"
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
              Add Doctor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};