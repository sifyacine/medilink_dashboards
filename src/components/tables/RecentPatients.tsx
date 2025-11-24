import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface Patient {
    id: number;
    name: string;
    age: number;
    lastVisit: string;
    condition: string;
    status: 'Stable' | 'Critical' | 'Improved' | 'Monitoring';
    image?: string;
}

interface RecentPatientsProps {
    patients: Patient[];
}

export const RecentPatients: React.FC<RecentPatientsProps> = ({ patients }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Patients</h3>
                <button className="text-sm font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400">
                    View All
                </button>
            </div>

            <div className="p-4">
                <div className="space-y-4">
                    {patients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold">
                                    {patient.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{patient.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {patient.age} yrs • {patient.condition}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${patient.status === 'Stable' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                                        patient.status === 'Critical' ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                                            patient.status === 'Improved' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                                                'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                                    }`}>
                                    {patient.status}
                                </span>
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
