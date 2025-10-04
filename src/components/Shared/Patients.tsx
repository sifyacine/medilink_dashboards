import React, { useState } from 'react';
import { PageHeader } from '../Common/PageHeader';
import { DataTable } from '../Common/DataTable';
import { Modal } from '../Common/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Heart, 
  FileText, 
  Plus,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Patient, MedicalRecord, Appointment } from '../../types/patient';

export const Patients: React.FC = () => {
  const { user } = useAuth();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showMedicalRecordModal, setShowMedicalRecordModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from API
  const patients: Patient[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1985-03-15',
      gender: 'Male',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+1 (555) 123-4568'
      },
      medicalInfo: {
        bloodType: 'O+',
        allergies: ['Penicillin', 'Peanuts'],
        chronicConditions: ['Hypertension'],
        currentMedications: ['Lisinopril 10mg'],
        insuranceProvider: 'Blue Cross',
        insuranceNumber: 'BC123456789'
      },
      assignedDoctorId: '1',
      assignedNurseId: '1',
      clinicId: '1',
      status: 'Active',
      createdDate: '2024-01-15',
      lastVisit: '2024-02-10',
      nextAppointment: '2024-02-25'
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      dateOfBirth: '1992-07-22',
      gender: 'Female',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      address: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      emergencyContact: {
        name: 'Mike Johnson',
        relationship: 'Brother',
        phone: '+1 (555) 234-5679'
      },
      medicalInfo: {
        bloodType: 'A-',
        allergies: ['Latex'],
        chronicConditions: ['Diabetes Type 1'],
        currentMedications: ['Insulin', 'Metformin'],
        insuranceProvider: 'Aetna',
        insuranceNumber: 'AE987654321'
      },
      assignedDoctorId: '2',
      clinicId: '1',
      status: 'Active',
      createdDate: '2024-01-20',
      lastVisit: '2024-02-08',
      nextAppointment: '2024-02-28'
    }
  ];

  const medicalRecords: MedicalRecord[] = [
    {
      id: '1',
      patientId: '1',
      doctorId: '1',
      nurseId: '1',
      date: '2024-02-10',
      type: 'Consultation',
      diagnosis: 'Hypertension follow-up',
      symptoms: ['Headache', 'Dizziness'],
      treatment: 'Continue current medication, lifestyle modifications',
      prescription: {
        medications: [
          {
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            duration: '30 days'
          }
        ]
      },
      vitalSigns: {
        bloodPressure: '140/90',
        heartRate: 78,
        temperature: 98.6,
        weight: 180,
        height: 70
      },
      notes: 'Patient responding well to treatment. Continue monitoring.',
      followUpRequired: true,
      followUpDate: '2024-03-10'
    }
  ];

  const appointments: Appointment[] = [
    {
      id: '1',
      patientId: '1',
      doctorId: '1',
      clinicId: '1',
      requestedDate: '2024-02-25',
      requestedTime: '10:00',
      approvedDate: '2024-02-25',
      approvedTime: '10:30',
      status: 'Approved',
      type: 'Follow-up',
      reason: 'Blood pressure check',
      requestedAt: '2024-02-15T09:00:00Z',
      respondedAt: '2024-02-15T10:30:00Z',
      respondedBy: 'Dr. Smith',
      duration: 30
    },
    {
      id: '2',
      patientId: '2',
      doctorId: '2',
      clinicId: '1',
      requestedDate: '2024-02-28',
      requestedTime: '14:00',
      status: 'Pending',
      type: 'Consultation',
      reason: 'Diabetes management',
      requestedAt: '2024-02-18T11:00:00Z',
      duration: 45
    }
  ];

  // Filter patients based on user role
  const getFilteredPatients = () => {
    if (user?.role === 'Super User') return patients;
    if (user?.role === 'Clinic Admin') return patients.filter(p => p.clinicId === user.clinicId);
    if (user?.role === 'Doctor') return patients.filter(p => p.assignedDoctorId === user.id);
    if (user?.role === 'Nurse') return patients.filter(p => p.assignedNurseId === user.id);
    return [];
  };

  const filteredPatients = getFilteredPatients();

  const columns = [
    { key: 'firstName', label: 'Name', sortable: true, render: (value: string, row: Patient) => `${row.firstName} ${row.lastName}` },
    { key: 'dateOfBirth', label: 'Age', sortable: true, render: (value: string) => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      return `${age} years`;
    }},
    { key: 'gender', label: 'Gender', sortable: true },
    { key: 'phone', label: 'Phone', sortable: false },
    { key: 'lastVisit', label: 'Last Visit', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
            : value === 'Inactive'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
        }`}>
          {value}
        </span>
      )
    },
  ];

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowPatientModal(true);
    setActiveTab('overview');
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowAddPatientModal(true);
  };

  const handleDeletePatient = (patient: Patient) => {
    console.log('Delete patient:', patient);
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setShowAddPatientModal(true);
  };

  const getPatientMedicalRecords = (patientId: string) => {
    return medicalRecords.filter(record => record.patientId === patientId);
  };

  const getPatientAppointments = (patientId: string) => {
    return appointments.filter(appointment => appointment.patientId === patientId);
  };

  const handleApproveAppointment = (appointmentId: string, date: string, time: string) => {
    console.log('Approve appointment:', appointmentId, date, time);
  };

  const handleRejectAppointment = (appointmentId: string, reason: string) => {
    console.log('Reject appointment:', appointmentId, reason);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Patient Management" 
        description="Manage patient folders, medical records, and appointments"
        action={{ label: 'Add New Patient', onClick: handleAddPatient }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredPatients.length}</p>
            </div>
            <User size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Patients</p>
              <p className="text-2xl font-bold text-green-600">
                {filteredPatients.filter(p => p.status === 'Active').length}
              </p>
            </div>
            <CheckCircle size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Appointments</p>
              <p className="text-2xl font-bold text-yellow-600">
                {appointments.filter(a => a.status === 'Pending').length}
              </p>
            </div>
            <Clock size={24} className="text-yellow-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Appointments</p>
              <p className="text-2xl font-bold text-purple-600">
                {appointments.filter(a => a.approvedDate === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
            <Calendar size={24} className="text-purple-600" />
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <DataTable
        data={filteredPatients}
        columns={columns}
        onView={handleViewPatient}
        onEdit={handleEditPatient}
        onDelete={handleDeletePatient}
        searchPlaceholder="Search patients..."
      />

      {/* Patient Details Modal */}
      {selectedPatient && (
        <Modal
          isOpen={showPatientModal}
          onClose={() => setShowPatientModal(false)}
          title={`Patient Folder - ${selectedPatient.firstName} ${selectedPatient.lastName}`}
          size="xl"
        >
          <div className="flex h-[70vh]">
            {/* Sidebar */}
            <div className="w-1/4 border-r border-gray-200 dark:border-gray-600 pr-4 overflow-y-auto">
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'medical-records', label: 'Medical Records', icon: FileText },
                  { id: 'appointments', label: 'Appointments', icon: Calendar },
                  { id: 'documents', label: 'Documents', icon: FileText },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 pl-6 overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Personal Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <User size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {selectedPatient.firstName} {selectedPatient.lastName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Born {selectedPatient.dateOfBirth} ({new Date().getFullYear() - new Date(selectedPatient.dateOfBirth).getFullYear()} years old)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{selectedPatient.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{selectedPatient.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {selectedPatient.address.street}, {selectedPatient.address.city}, {selectedPatient.address.state}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Medical Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Blood Type:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPatient.medicalInfo.bloodType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Insurance:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPatient.medicalInfo.insuranceProvider}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Allergies:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedPatient.medicalInfo.allergies.map((allergy, index) => (
                              <span key={index} className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full text-xs">
                                {allergy}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Chronic Conditions:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedPatient.medicalInfo.chronicConditions.map((condition, index) => (
                              <span key={index} className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-full text-xs">
                                {condition}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Emergency Contact</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedPatient.emergencyContact.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedPatient.emergencyContact.relationship}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedPatient.emergencyContact.phone}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'medical-records' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900 dark:text-white">Medical Records</h4>
                    <button
                      onClick={() => setShowMedicalRecordModal(true)}
                      className="bg-cyan-600 text-white px-3 py-1 rounded text-sm hover:bg-cyan-700 flex items-center space-x-1"
                    >
                      <Plus size={16} />
                      <span>Add Record</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {getPatientMedicalRecords(selectedPatient.id).map((record) => (
                      <div key={record.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">{record.type}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{record.date}</p>
                          </div>
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded text-xs">
                            {record.diagnosis}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{record.treatment}</p>
                        {record.vitalSigns && (
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <span>BP: {record.vitalSigns.bloodPressure}</span>
                            <span>HR: {record.vitalSigns.heartRate} bpm</span>
                            <span>Temp: {record.vitalSigns.temperature}°F</span>
                            <span>Weight: {record.vitalSigns.weight} lbs</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Appointments</h4>
                  <div className="space-y-3">
                    {getPatientAppointments(selectedPatient.id).map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">{appointment.type}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.reason}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            appointment.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                            appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <p>Requested: {appointment.requestedDate} at {appointment.requestedTime}</p>
                          {appointment.approvedDate && (
                            <p>Approved: {appointment.approvedDate} at {appointment.approvedTime}</p>
                          )}
                        </div>
                        {appointment.status === 'Pending' && (user?.role === 'Doctor' || user?.role === 'Clinic Admin') && (
                          <div className="flex space-x-2 mt-3">
                            <button
                              onClick={() => handleApproveAppointment(appointment.id, appointment.requestedDate, appointment.requestedTime)}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectAppointment(appointment.id, 'Schedule conflict')}
                              className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900 dark:text-white">Documents</h4>
                    <button className="bg-cyan-600 text-white px-3 py-1 rounded text-sm hover:bg-cyan-700 flex items-center space-x-1">
                      <Plus size={16} />
                      <span>Upload Document</span>
                    </button>
                  </div>
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <FileText size={48} className="mx-auto mb-2 opacity-50" />
                    <p>No documents uploaded yet</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Add/Edit Patient Modal */}
      <Modal
        isOpen={showAddPatientModal}
        onClose={() => setShowAddPatientModal(false)}
        title={selectedPatient ? 'Edit Patient' : 'Add New Patient'}
        size="xl"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                defaultValue={selectedPatient?.firstName}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                defaultValue={selectedPatient?.lastName}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                defaultValue={selectedPatient?.dateOfBirth}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gender
              </label>
              <select 
                defaultValue={selectedPatient?.gender}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue={selectedPatient?.email}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                defaultValue={selectedPatient?.phone}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Address
            </label>
            <input
              type="text"
              defaultValue={selectedPatient?.address.street}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter full address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Blood Type
              </label>
              <select 
                defaultValue={selectedPatient?.medicalInfo.bloodType}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Insurance Provider
              </label>
              <input
                type="text"
                defaultValue={selectedPatient?.medicalInfo.insuranceProvider}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter insurance provider"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddPatientModal(false)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              {selectedPatient ? 'Update Patient' : 'Add Patient'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Medical Record Modal */}
      <Modal
        isOpen={showMedicalRecordModal}
        onClose={() => setShowMedicalRecordModal(false)}
        title="Add Medical Record"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Record Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>Consultation</option>
                <option>Follow-up</option>
                <option>Emergency</option>
                <option>Surgery</option>
                <option>Lab Results</option>
                <option>Prescription</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Diagnosis
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter diagnosis"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Treatment
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter treatment details"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Blood Pressure
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="120/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Heart Rate
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="72"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Temperature (°F)
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="98.6"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Weight (lbs)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="150"
              />
            </div>
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
              onClick={() => setShowMedicalRecordModal(false)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              Add Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};