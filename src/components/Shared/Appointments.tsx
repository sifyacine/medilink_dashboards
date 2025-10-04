import React, { useState } from 'react';
import { PageHeader } from '../Common/PageHeader';
import { DataTable } from '../Common/DataTable';
import { Modal } from '../Common/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Appointment } from '../../types/patient';

export const Appointments: React.FC = () => {
  const { user } = useAuth();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');

  // Mock data - in real app, this would come from API
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
      reason: 'Blood pressure check and medication review',
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
      reason: 'Diabetes management consultation and blood sugar monitoring',
      requestedAt: '2024-02-18T11:00:00Z',
      duration: 45
    },
    {
      id: '3',
      patientId: '1',
      doctorId: '1',
      clinicId: '1',
      requestedDate: '2024-03-05',
      requestedTime: '09:00',
      status: 'Pending',
      type: 'Check-up',
      reason: 'Routine annual physical examination',
      requestedAt: '2024-02-20T14:00:00Z',
      duration: 60
    },
    {
      id: '4',
      patientId: '2',
      doctorId: '1',
      clinicId: '1',
      requestedDate: '2024-02-22',
      requestedTime: '11:00',
      status: 'Completed',
      type: 'Emergency',
      reason: 'Chest pain evaluation',
      requestedAt: '2024-02-22T08:00:00Z',
      respondedAt: '2024-02-22T08:15:00Z',
      respondedBy: 'Dr. Smith',
      duration: 90
    },
    {
      id: '5',
      patientId: '1',
      doctorId: '2',
      clinicId: '1',
      requestedDate: '2024-02-20',
      requestedTime: '15:30',
      status: 'Rejected',
      type: 'Consultation',
      reason: 'Second opinion consultation',
      notes: 'Doctor unavailable on requested date',
      requestedAt: '2024-02-18T16:00:00Z',
      respondedAt: '2024-02-19T09:00:00Z',
      respondedBy: 'Dr. Johnson',
      duration: 30
    }
  ];

  // Mock patient data
  const patients = [
    { id: '1', firstName: 'John', lastName: 'Doe', phone: '+1 (555) 123-4567', email: 'john.doe@email.com' },
    { id: '2', firstName: 'Sarah', lastName: 'Johnson', phone: '+1 (555) 234-5678', email: 'sarah.johnson@email.com' }
  ];

  // Mock doctor data
  const doctors = [
    { id: '1', name: 'Dr. Smith', specialty: 'Cardiology' },
    { id: '2', name: 'Dr. Johnson', specialty: 'Endocrinology' }
  ];

  // Filter appointments based on user role
  const getFilteredAppointments = () => {
    if (user?.role === 'Super User') return appointments;
    if (user?.role === 'Clinic Admin') return appointments.filter(a => a.clinicId === user.clinicId);
    if (user?.role === 'Doctor') return appointments.filter(a => a.doctorId === user.id);
    if (user?.role === 'Employee') return appointments.filter(a => a.clinicId === user.clinicId);
    return [];
  };

  const filteredAppointments = getFilteredAppointments();

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown Doctor';
  };

  const getPatientDetails = (patientId: string) => {
    return patients.find(p => p.id === patientId);
  };

  const columns = [
    { 
      key: 'patientId', 
      label: 'Patient', 
      sortable: true,
      render: (value: string) => getPatientName(value)
    },
    { 
      key: 'doctorId', 
      label: 'Doctor', 
      sortable: true,
      render: (value: string) => getDoctorName(value)
    },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'requestedDate', label: 'Requested Date', sortable: true },
    { key: 'requestedTime', label: 'Requested Time', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Approved' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
            : value === 'Pending'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
            : value === 'Completed'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
        }`}>
          {value}
        </span>
      )
    },
  ];

  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const handleApproveAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setApprovalAction('approve');
    setShowApprovalModal(true);
  };

  const handleRejectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setApprovalAction('reject');
    setShowApprovalModal(true);
  };

  const handleSubmitApproval = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${approvalAction} appointment:`, selectedAppointment?.id);
    setShowApprovalModal(false);
    setSelectedAppointment(null);
  };

  const pendingAppointments = filteredAppointments.filter(a => a.status === 'Pending');
  const approvedAppointments = filteredAppointments.filter(a => a.status === 'Approved');
  const completedAppointments = filteredAppointments.filter(a => a.status === 'Completed');

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Appointment Management" 
        description="Manage patient appointment requests and scheduling"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Appointments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredAppointments.length}</p>
            </div>
            <Calendar size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Approval</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingAppointments.length}</p>
            </div>
            <Clock size={24} className="text-yellow-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-bold text-green-600">{approvedAppointments.length}</p>
            </div>
            <CheckCircle size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-blue-600">{completedAppointments.length}</p>
            </div>
            <CheckCircle size={24} className="text-blue-600" />
          </div>
        </div>
      </div>

      {/* Pending Appointments Alert */}
      {pendingAppointments.length > 0 && (user?.role === 'Doctor' || user?.role === 'Clinic Admin') && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle size={20} className="text-yellow-600" />
            <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Pending Appointment Requests</h3>
          </div>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-3">
            You have {pendingAppointments.length} appointment request(s) waiting for approval.
          </p>
          <div className="space-y-2">
            {pendingAppointments.slice(0, 3).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {getPatientName(appointment.patientId)} - {appointment.type}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Requested: {appointment.requestedDate} at {appointment.requestedTime}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApproveAppointment(appointment)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectAppointment(appointment)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Appointments Table */}
      <DataTable
        data={filteredAppointments}
        columns={columns}
        onView={handleViewAppointment}
        onEdit={user?.role === 'Doctor' || user?.role === 'Clinic Admin' ? handleApproveAppointment : undefined}
        onDelete={user?.role === 'Doctor' || user?.role === 'Clinic Admin' ? handleRejectAppointment : undefined}
        searchPlaceholder="Search appointments..."
      />

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <Modal
          isOpen={showAppointmentModal}
          onClose={() => setShowAppointmentModal(false)}
          title="Appointment Details"
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Patient Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {getPatientName(selectedAppointment.patientId)}
                    </span>
                  </div>
                  {getPatientDetails(selectedAppointment.patientId) && (
                    <>
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {getPatientDetails(selectedAppointment.patientId)?.phone}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {getPatientDetails(selectedAppointment.patientId)?.email}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Appointment Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Doctor:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {getDoctorName(selectedAppointment.doctorId)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Type:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedAppointment.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Duration:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedAppointment.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`text-sm font-medium ${
                      selectedAppointment.status === 'Approved' ? 'text-green-600' :
                      selectedAppointment.status === 'Pending' ? 'text-yellow-600' :
                      selectedAppointment.status === 'Completed' ? 'text-blue-600' :
                      'text-red-600'
                    }`}>
                      {selectedAppointment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Scheduling</h4>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Requested:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedAppointment.requestedDate} at {selectedAppointment.requestedTime}
                  </span>
                </div>
                {selectedAppointment.approvedDate && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Approved:</span>
                    <span className="text-sm font-medium text-green-600">
                      {selectedAppointment.approvedDate} at {selectedAppointment.approvedTime}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Requested At:</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(selectedAppointment.requestedAt).toLocaleString()}
                  </span>
                </div>
                {selectedAppointment.respondedAt && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Responded At:</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(selectedAppointment.respondedAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Reason for Visit</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                {selectedAppointment.reason}
              </p>
            </div>

            {selectedAppointment.notes && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Notes</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  {selectedAppointment.notes}
                </p>
              </div>
            )}

            {selectedAppointment.status === 'Pending' && (user?.role === 'Doctor' || user?.role === 'Clinic Admin') && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => handleRejectAppointment(selectedAppointment)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApproveAppointment(selectedAppointment)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Approval Modal */}
      {selectedAppointment && (
        <Modal
          isOpen={showApprovalModal}
          onClose={() => setShowApprovalModal(false)}
          title={`${approvalAction === 'approve' ? 'Approve' : 'Reject'} Appointment`}
          size="md"
        >
          <form onSubmit={handleSubmitApproval} className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Appointment Details</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Patient: {getPatientName(selectedAppointment.patientId)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Requested: {selectedAppointment.requestedDate} at {selectedAppointment.requestedTime}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Type: {selectedAppointment.type}
              </p>
            </div>

            {approvalAction === 'approve' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Approved Date
                  </label>
                  <input
                    type="date"
                    defaultValue={selectedAppointment.requestedDate}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Approved Time
                  </label>
                  <input
                    type="time"
                    defaultValue={selectedAppointment.requestedTime}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {approvalAction === 'approve' ? 'Approval Notes (Optional)' : 'Rejection Reason'}
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder={approvalAction === 'approve' ? 'Any additional notes...' : 'Please provide a reason for rejection...'}
                required={approvalAction === 'reject'}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowApprovalModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 text-white rounded-lg ${
                  approvalAction === 'approve' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {approvalAction === 'approve' ? 'Approve Appointment' : 'Reject Appointment'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};