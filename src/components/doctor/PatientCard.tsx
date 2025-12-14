import React from 'react';
import { Patient } from '../../types/models';
import { User, Phone, MapPin, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns'; // Assuming date-fns is installed

interface PatientCardProps {
    patient: Patient;
    onClick?: (id: string) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onClick }) => {
    // Safe date parsing in case lastVisit is undefined/null
    const lastVisitDate = patient.lastVisit ? new Date(patient.lastVisit) : null;
    const formattedLastVisit = lastVisitDate && !isNaN(lastVisitDate.getTime())
        ? format(lastVisitDate, 'MMM dd, yyyy')
        : 'No visits';

    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => onClick && onClick(patient.id)}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {patient.avatarUrl ? (
                        <img src={patient.avatarUrl} alt={patient.firstName} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors">
                            <User className="w-6 h-6" />
                        </div>
                    )}
                    <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {patient.firstName} {patient.lastName}
                        </h4>
                        <span className="inline-flex text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                            {patient.gender}, {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}y
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-2.5">
                <div className="flex items-center text-sm text-gray-500">
                    <Phone className="w-4 h-4 mr-2.5 text-gray-400" />
                    {patient.phone}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2.5 text-gray-400" />
                    <span className="truncate">{patient.address.city}, {patient.address.state}</span>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        Last Visit:
                    </div>
                    <span className="font-medium text-gray-600">{formattedLastVisit}</span>
                </div>
            </div>
        </div>
    );
};

export default PatientCard;
