import React from 'react';
import { Clock, MapPin, MoreVertical, Phone, Video } from 'lucide-react';

interface Appointment {
    id: number;
    time: string;
    patient: string;
    type: string;
    condition: string;
    status: 'Confirmed' | 'Pending' | 'Urgent';
    duration: number;
    room: string;
    image?: string;
}

interface AppointmentListProps {
    appointments: Appointment[];
}

export const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Today's Schedule</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {appointments.length} appointments remaining
                    </p>
                </div>
                <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <MoreVertical size={20} className="text-gray-400" />
                </button>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {appointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-16 text-center">
                                <span className="block text-sm font-bold text-gray-900 dark:text-white">
                                    {appointment.time.split(' ')[0]}
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-gray-400">
                                    {appointment.time.split(' ')[1]}
                                </span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                                            {appointment.patient}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {appointment.condition} • {appointment.type}
                                        </p>
                                    </div>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${appointment.status === 'Urgent'
                                        ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                        : appointment.status === 'Confirmed'
                                            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                            : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                                        }`}>
                                        {appointment.status}
                                    </span>
                                </div>

                                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>{appointment.duration} min</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        <span>{appointment.room}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors">
                                    <Video size={18} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                                    <Phone size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <button className="w-full py-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors">
                    View Full Schedule
                </button>
            </div>
        </div>
    );
};
