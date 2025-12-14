import React from 'react';
import { Appointment } from '../../types/models';
import { format } from 'date-fns';
import { Calendar, Clock, User, MoreVertical, Check, X } from 'lucide-react';

interface AppointmentTableProps {
    appointments: Appointment[];
    onStatusChange?: (id: string, status: Appointment['status']) => void;
    onViewDetails?: (id: string) => void;
}

const statusStyles = {
    Pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    Confirmed: 'bg-green-50 text-green-700 border-green-100',
    Cancelled: 'bg-red-50 text-red-700 border-red-100',
    Completed: 'bg-primary/10 text-primary border-primary/20',
    'No Show': 'bg-gray-50 text-gray-700 border-gray-100',
};

const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments, onStatusChange, onViewDetails }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {appointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    {apt.patientAvatar ? (
                                        <img src={apt.patientAvatar} alt={apt.patientName} className="w-10 h-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            <User className="w-5 h-5" />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-medium text-gray-900">{apt.patientName}</h4>
                                        <p className="text-xs text-gray-500">#{apt.patientId}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center text-sm text-gray-900">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                        {format(new Date(apt.date), 'MMM dd, yyyy')}
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <Clock className="w-3 h-3 mr-2 ml-0.5 text-gray-400" />
                                        {apt.time} ({apt.duration} min)
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm text-gray-600">{apt.type}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[apt.status] || 'bg-gray-100 text-gray-800'}`}>
                                    {apt.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    {apt.status === 'Pending' && onStatusChange && (
                                        <>
                                            <button
                                                onClick={() => onStatusChange(apt.id, 'Confirmed')}
                                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Confirm"
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onStatusChange(apt.id, 'Cancelled')}
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Cancel"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => onViewDetails && onViewDetails(apt.id)}
                                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentTable;
