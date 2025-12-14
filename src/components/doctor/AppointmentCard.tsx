import React from 'react';
import { Appointment } from '../../types/models';
import { Calendar, Clock, FileText, Check, X, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface AppointmentCardProps {
    appointment: Appointment;
    onStatusChange: (id: string, status: Appointment['status']) => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onStatusChange }) => {
    const statusColors: Record<string, string> = {
        Pending: 'bg-yellow-100 text-yellow-700',
        Confirmed: 'bg-green-100 text-green-700',
        Completed: 'bg-blue-100 text-blue-700',
        Cancelled: 'bg-red-100 text-red-700',
        'No Show': 'bg-gray-100 text-gray-700',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-cyan-500 transition-colors group relative">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-lg">
                        {appointment.patientName ? appointment.patientName.charAt(0) : '?'}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{appointment.patientName}</h3>
                        <p className="text-xs text-gray-500">{appointment.type}</p>
                    </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status]}`}>
                    {appointment.status}
                </span>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{format(new Date(appointment.date), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} className="text-gray-400" />
                    <span>{appointment.time}</span>
                </div>
                {appointment.notes && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 italic">
                        <FileText size={16} className="text-gray-400" />
                        <span className="truncate">{appointment.notes}</span>
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <button className="text-gray-400 hover:text-cyan-600 transition-colors" title="View Details">
                    <Eye size={20} />
                </button>

                {appointment.status === 'Pending' && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => onStatusChange(appointment.id, 'Confirmed')}
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                            title="Confirm"
                        >
                            <Check size={18} />
                        </button>
                        <button
                            onClick={() => onStatusChange(appointment.id, 'Cancelled')}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            title="Cancel"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
