import React from 'react';
import { Patient } from '../../types/models';
import { Eye, Edit } from 'lucide-react';
import { format } from 'date-fns';

interface PatientsTableProps {
    patients: Patient[];
    onView: (id: string) => void;
}

export const PatientsTable: React.FC<PatientsTableProps> = ({ patients, onView }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="p-4 font-semibold text-gray-600 text-sm">Patient</th>
                        <th className="p-4 font-semibold text-gray-600 text-sm">Contact</th>
                        <th className="p-4 font-semibold text-gray-600 text-sm">Gender/Age</th>
                        <th className="p-4 font-semibold text-gray-600 text-sm">Group</th>
                        <th className="p-4 font-semibold text-gray-600 text-sm">Last Visit</th>
                        <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {patients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-sm">
                                        {patient.avatarUrl ? (
                                            <img src={patient.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            `${patient.firstName[0]}${patient.lastName[0]}`
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{patient.firstName} {patient.lastName}</p>
                                        <p className="text-xs text-gray-500">ID: #{patient.id.slice(0, 6)}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <p className="text-sm text-gray-900">{patient.phone}</p>
                                <p className="text-xs text-gray-500">{patient.email || 'No email'}</p>
                            </td>
                            <td className="p-4 text-sm text-gray-600">
                                {patient.gender}, {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}y
                            </td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${patient.bloodType?.includes('+') ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                                    }`}>
                                    {patient.bloodType || 'N/A'}
                                </span>
                            </td>
                            <td className="p-4 text-sm text-gray-600">
                                {patient.lastVisit ? format(new Date(patient.lastVisit), 'MMM dd, yyyy') : 'Never'}
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => onView(patient.id)}
                                        className="p-2 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors" title="View Details">
                                        <Eye size={18} />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                        <Edit size={18} />
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
