import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Patient, MedicalRecord, Appointment } from '../../types/models';
import { User, FileText, Calendar, Activity, Pill, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface PatientDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    patient: Patient;
    medicalRecords?: MedicalRecord[];
    appointments?: Appointment[];
}

const PatientDetailsModal: React.FC<PatientDetailsModalProps> = ({
    isOpen, onClose, patient, medicalRecords = [], appointments = []
}) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'appointments'>('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'history', label: 'Medical History', icon: Activity },
        { id: 'appointments', label: 'Appointments', icon: Calendar },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`${patient.firstName} ${patient.lastName}`} size="4xl">
            <div className="flex flex-col md:flex-row gap-6 h-[600px]">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-64 flex-shrink-0 border-r border-gray-100 pr-4">
                    <div className="flex flex-col gap-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                        ? 'bg-blue-50 text-blue-600 font-medium'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <img src={patient.avatarUrl || `https://ui-avatars.com/api/?name=${patient.firstName}+${patient.lastName}`} alt="Avatar" className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-semibold text-gray-900">{patient.firstName}</p>
                                <p className="text-xs text-gray-500">{patient.gender}, {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}y</p>
                            </div>
                        </div>
                        <div className="text-sm space-y-2 text-gray-600">
                            <p><span className="font-medium text-gray-900">Phone:</span> {patient.phone}</p>
                            <p><span className="font-medium text-gray-900">Blood:</span> {patient.bloodType || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto pr-2">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm">
                                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Activity size={18} className="text-red-500" /> Chronic Conditions
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {patient.chronicConditions.length > 0 ? (
                                            patient.chronicConditions.map(c => (
                                                <span key={c} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium">
                                                    {c}
                                                </span>
                                            ))
                                        ) : <p className="text-gray-500 text-sm">None recorded</p>}
                                    </div>
                                </div>

                                <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm">
                                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Pill size={18} className="text-blue-500" /> Allergies
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {patient.allergies.length > 0 ? (
                                            patient.allergies.map(a => (
                                                <span key={a} className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm font-medium">
                                                    {a}
                                                </span>
                                            ))
                                        ) : <p className="text-gray-500 text-sm">None recorded</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl">
                                <h3 className="font-semibold text-gray-900 mb-3">Address & Emergency</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Address</p>
                                        <p className="text-gray-900">{patient.address.street}, {patient.address.city}</p>
                                        <p className="text-gray-900">{patient.address.state}, {patient.address.zipCode}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Emergency Contact</p>
                                        {patient.emergencyContact ? (
                                            <>
                                                <p className="text-gray-900 font-medium">{patient.emergencyContact.name} ({patient.emergencyContact.relationship})</p>
                                                <p className="text-gray-900">{patient.emergencyContact.phone}</p>
                                            </>
                                        ) : <p className="text-gray-400">Not provided</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-900">Medical History Timeline</h3>
                                <button className="text-sm text-blue-600 font-medium hover:underline">+ Add Record</button>
                            </div>
                            {medicalRecords.length === 0 ? (
                                <div className="text-center py-10 text-gray-400">No medical records found.</div>
                            ) : (
                                medicalRecords.map(record => (
                                    <div key={record.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                                            {format(new Date(record.date), 'MMM dd')}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{record.diagnosis}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{record.treatment}</p>
                                            <div className="mt-2 flex gap-2">
                                                {record.symptoms.map(s => <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{s}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'appointments' && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-gray-900 mb-4">Appointment History</h3>
                            {appointments.map(apt => (
                                <div key={apt.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${apt.status === 'Confirmed' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{apt.type}</p>
                                            <p className="text-xs text-gray-500">{format(new Date(apt.date), 'MMMM dd, yyyy')} at {apt.time}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                            apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-600'
                                        }`}>
                                        {apt.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default PatientDetailsModal;
