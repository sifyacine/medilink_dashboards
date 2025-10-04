import React, { useState } from 'react';
import { PageHeader } from '../../components/Common/PageHeader';
import { DataTable } from '../../components/Common/DataTable';
import { Modal } from '../../components/Common/Modal';
import { Phone, Mail, MapPin, Calendar, Stethoscope, Award } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  clinic: string;
  specialty: string;
  licenseNumber: string;
  experience: number;
  joinDate: string;
  qualifications: string[];
  address: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  consultationFee: number;
  rating: number;
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
      clinic: 'Central Medical Center',
      specialty: 'Cardiology',
      licenseNumber: 'MD123456',
      experience: 12,
      joinDate: '2020-03-15',
      qualifications: ['MD', 'FACC', 'Board Certified'],
      address: '123 Medical Plaza, City, State 12345',
      status: 'Active',
      consultationFee: 200,
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@clinic.com',
      phone: '+1 (555) 234-5678',
      clinic: 'HealthFirst Clinic',
      specialty: 'Neurology',
      licenseNumber: 'MD234567',
      experience: 15,
      joinDate: '2018-08-20',
      qualifications: ['MD', 'PhD', 'FAAN'],
      address: '456 Health Ave, City, State 12345',
      status: 'Active',
      consultationFee: 250,
      rating: 4.9,
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@clinic.com',
      phone: '+1 (555) 345-6789',
      clinic: 'City General Hospital',
      specialty: 'Pediatrics',
      licenseNumber: 'MD345678',
      experience: 8,
      joinDate: '2021-01-10',
      qualifications: ['MD', 'FAAP', 'Board Certified'],
      address: '789 Children Way, City, State 12345',
      status: 'On Leave',
      consultationFee: 180,
      rating: 4.7,
    },
    {
      id: '4',
      name: 'Dr. Robert Taylor',
      email: 'robert.taylor@clinic.com',
      phone: '+1 (555) 456-7890',
      clinic: 'Central Medical Center',
      specialty: 'Dermatology',
      licenseNumber: 'MD456789',
      experience: 10,
      joinDate: '2019-06-12',
      qualifications: ['MD', 'FAAD', 'Mohs Surgery'],
      address: '321 Skin Care Blvd, City, State 12345',
      status: 'Active',
      consultationFee: 220,
      rating: 4.6,
    },
  ];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'specialty', label: 'Specialty', sortable: true },
    { key: 'clinic', label: 'Clinic', sortable: true },
    { key: 'experience', label: 'Experience (Years)', sortable: true },
    { 
      key: 'consultationFee', 
      label: 'Consultation Fee', 
      sortable: true,
      render: (value: number) => `$${value}`
    },
    { 
      key: 'rating', 
      label: 'Rating', 
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-1">
          <span className="text-yellow-500">★</span>
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
            : value === 'On Leave'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
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

  const activeDoctors = doctors.filter(d => d.status === 'Active');
  const avgRating = doctors.reduce((sum, d) => sum + d.rating, 0) / doctors.length;
  const avgExperience = doctors.reduce((sum, d) => sum + d.experience, 0) / doctors.length;

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Doctors Management" 
        description="Manage doctor profiles and track their information"
        action={{ label: 'Add New Doctor', onClick: handleAddDoctor }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{doctors.length}</p>
            </div>
            <Stethoscope size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Doctors</p>
              <p className="text-2xl font-bold text-green-600">{activeDoctors.length}</p>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Rating</p>
              <p className="text-2xl font-bold text-yellow-600">{avgRating.toFixed(1)}</p>
            </div>
            <Award size={24} className="text-yellow-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Experience</p>
              <p className="text-2xl font-bold text-purple-600">{Math.round(avgExperience)} years</p>
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
          title={`Doctor Details - ${selectedDoctor.name}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{selectedDoctor.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{selectedDoctor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{selectedDoctor.address}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Professional Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Clinic:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedDoctor.clinic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Specialty:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedDoctor.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">License:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedDoctor.licenseNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Experience:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedDoctor.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Join Date:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedDoctor.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Consultation Fee:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">${selectedDoctor.consultationFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedDoctor.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
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
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Qualifications</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDoctor.qualifications.map((qualification) => (
                  <span key={qualification} className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-300 rounded-full text-sm">
                    {qualification}
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                License Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter license number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Specialty
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
                <option>Dermatology</option>
                <option>Orthopedics</option>
                <option>General Medicine</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Clinic
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>Central Medical Center</option>
                <option>HealthFirst Clinic</option>
                <option>City General Hospital</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Experience (Years)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter years of experience"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Consultation Fee
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter consultation fee"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Join Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Address
            </label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter full address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Qualifications (comma-separated)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., MD, FACC, Board Certified"
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
              Add Doctor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};