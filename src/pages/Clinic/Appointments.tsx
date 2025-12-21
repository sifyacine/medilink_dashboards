import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, Phone, Search, Filter, Plus } from 'lucide-react';
import { Modal } from '../../components/common/Modal'; // Assuming we have this reusable component

interface Appointment {
    id: number;
    patient: string;
    doctor: string;
    date: string;
    time: string;
    status: 'Confirmed' | 'Pending' | 'Cancelled';
    type: string;
    phone?: string;
}

export const ClinicAppointments: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([
        { id: 1, patient: 'James Wilson', doctor: 'Dr. Sarah Smith', date: '2024-03-20', time: '09:00 AM', status: 'Confirmed', type: 'Check-up', phone: '+1 234 567 890' },
        { id: 2, patient: 'Linda Martinez', doctor: 'Dr. Michael Chen', date: '2024-03-21', time: '10:30 AM', status: 'Pending', type: 'Consultation', phone: '+1 987 654 321' },
        { id: 3, patient: 'Robert Taylor', doctor: 'Dr. Emily Brown', date: '2024-03-22', time: '02:00 PM', status: 'Pending', type: 'Follow-up', phone: '+1 555 123 456' },
    ]);

    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [acceptDateTime, setAcceptDateTime] = useState({ date: '', time: '' });

    const handleRejectClick = (apt: Appointment) => {
        setSelectedAppointment(apt);
        setShowRejectModal(true);
    };

    const handleAcceptClick = (apt: Appointment) => {
        setSelectedAppointment(apt);
        // Pre-fill with requested date/time
        setAcceptDateTime({ date: apt.date, time: apt.time });
        setShowAcceptModal(true);
    };

    const confirmReject = () => {
        if (!selectedAppointment) return;
        setAppointments(prev => prev.map(a => a.id === selectedAppointment.id ? { ...a, status: 'Cancelled' } : a));
        setShowRejectModal(false);
        setRejectReason('');
    };

    const confirmAccept = () => {
        if (!selectedAppointment) return;
        setAppointments(prev => prev.map(a => a.id === selectedAppointment.id ? { ...a, status: 'Confirmed', date: acceptDateTime.date, time: acceptDateTime.time } : a));
        setShowAcceptModal(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage patient appointments and requests</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all shadow-md font-medium">
                    <Plus size={20} className="mr-2" />
                    New Appointment
                </button>
            </div>

            {/* Requests Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        <AlertCircle className="mr-2 text-orange-500" size={20} />
                        Appointment Requests
                    </h2>
                    <span className="bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {appointments.filter(a => a.status === 'Pending').length} Pending
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested For</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {appointments.filter(a => a.status === 'Pending').map((apt) => (
                                <tr key={apt.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900 dark:text-white">{apt.patient}</span>
                                            <span className="text-xs text-gray-500 flex items-center mt-1"><Phone size={10} className="mr-1" /> {apt.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-col">
                                            <span className="flex items-center"><Calendar size={14} className="mr-1" /> {apt.date}</span>
                                            <span className="flex items-center mt-1"><Clock size={14} className="mr-1" /> {apt.time}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{apt.doctor}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{apt.type}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => handleAcceptClick(apt)}
                                            className="px-3 py-1 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded text-sm font-medium transition-colors border border-teal-200"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleRejectClick(apt)}
                                            className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded text-sm font-medium transition-colors border border-red-200"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {appointments.filter(a => a.status === 'Pending').length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No pending requests
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Appointments</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {appointments.filter(a => a.status === 'Confirmed').map((apt) => (
                                <tr key={apt.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{apt.patient}</td>
                                    <td className="px-6 py-4 text-gray-500">{apt.doctor}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {apt.date} at {apt.time}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex w-fit items-center">
                                            <CheckCircle size={12} className="mr-1" /> Confirmed
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals - Simplified Inline for demo, ideally use reusable modal components */}
            {showRejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Reject Appointment</h3>
                        <p className="text-sm text-gray-500 mb-4">Please provide a reason for rejecting the appointment for <span className="font-semibold">{selectedAppointment?.patient}</span>.</p>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-primary outline-none dark:bg-gray-900 dark:text-white dark:border-gray-600 resize-none"
                            rows={3}
                            placeholder="Reason for rejection..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                        />
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowRejectModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium">Cancel</button>
                            <button onClick={confirmReject} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm">Reject Request</button>
                        </div>
                    </div>
                </div>
            )}

            {showAcceptModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Confirm Appointment</h3>
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                    value={acceptDateTime.date}
                                    onChange={(e) => setAcceptDateTime({ ...acceptDateTime, date: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                                <input
                                    type="time"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                    value={acceptDateTime.time}
                                    onChange={(e) => setAcceptDateTime({ ...acceptDateTime, time: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowAcceptModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium">Cancel</button>
                            <button onClick={confirmAccept} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium shadow-sm">Confirm & Accept</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
