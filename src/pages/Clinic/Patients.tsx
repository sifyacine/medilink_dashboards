import React, { useState } from 'react';
import { Search, Filter, Plus, User, Phone, Mail, FileText, MoreVertical, Edit2, Trash2, LayoutGrid, List, XCircle, HeartPulse, Pill, History } from 'lucide-react';
import { Modal } from '../../components/common/Modal'; // Using our generic modal wrapper if available, or simpler inline for demo to avoid type issues

interface Patient {
    id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    contact: string;
    email: string;
    lastVisit: string;
    condition: string;
    status: 'Active' | 'Inactive';
    image?: string;
}

export const ClinicPatients: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([
        { id: '1', name: 'James Wilson', age: 45, gender: 'Male', contact: '+1 234 567 890', email: 'james@example.com', lastVisit: '2024-03-15', condition: 'Hypertension', status: 'Active' },
        { id: '2', name: 'Linda Martinez', age: 32, gender: 'Female', contact: '+1 987 654 321', email: 'linda@example.com', lastVisit: '2024-03-10', condition: 'Pregnancy', status: 'Active' },
        { id: '3', name: 'Robert Taylor', age: 28, gender: 'Male', contact: '+1 555 123 456', email: 'robert@example.com', lastVisit: '2024-02-28', condition: 'Flu', status: 'Inactive' },
        { id: '4', name: 'Emily Davis', age: 5, gender: 'Female', contact: '+1 222 333 444', email: 'emily@example.com', lastVisit: '2024-03-18', condition: 'Vaccination', status: 'Active' },
        { id: '5', name: 'Michael Brown', age: 60, gender: 'Male', contact: '+1 666 777 888', email: 'michael@example.com', lastVisit: '2024-01-20', condition: 'Diabetes', status: 'Active' },
    ]);

    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [newPatient, setNewPatient] = useState<Partial<Patient>>({
        name: '', age: 0, gender: 'Male', contact: '', email: '', condition: '', status: 'Active'
    });

    const handleAddPatient = (e: React.FormEvent) => {
        e.preventDefault();
        const patient: Patient = {
            id: (patients.length + 1).toString(),
            name: newPatient.name || 'Unknown',
            age: newPatient.age || 0,
            gender: newPatient.gender as 'Male' | 'Female',
            contact: newPatient.contact || '',
            email: newPatient.email || '',
            lastVisit: new Date().toISOString().split('T')[0],
            condition: newPatient.condition || '',
            status: 'Active'
        };
        setPatients([...patients, patient]);
        setShowAddModal(false);
        setNewPatient({ name: '', age: 0, gender: 'Male', contact: '', email: '', condition: '', status: 'Active' });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patients</h1>
                    <p className="text-gray-500 dark:text-gray-400">Total {patients.length} registered patients</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all shadow-md font-medium"
                >
                    <Plus size={20} className="mr-2" />
                    Add Patient
                </button>
            </div>

            {/* Filters & Toggles */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative flex-1 w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search patients by name or phone..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex items-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                        <Filter size={18} className="mr-2" />
                        Filter
                    </button>
                    <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg border border-gray-200 dark:border-gray-600">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-white dark:bg-gray-600 shadow text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {viewMode === 'table' ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-900/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient Name</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Condition</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {patients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer" onClick={() => setSelectedPatient(patient)}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-primary font-bold mr-3">
                                                    {patient.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">{patient.name}</div>
                                                    <div className="text-xs text-gray-500">{patient.age} yrs, {patient.gender}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
                                            <div>{patient.contact}</div>
                                            <div className="text-xs text-gray-400">{patient.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                                {patient.condition}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${patient.status === 'Active'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                                }`}>
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button className="text-gray-400 hover:text-primary transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedPatient(patient); }}>
                                                <Edit2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {patients.map(patient => (
                        <div
                            key={patient.id}
                            onClick={() => setSelectedPatient(patient)}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-primary text-xl font-bold">
                                    {patient.name.charAt(0)}
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${patient.status === 'Active'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {patient.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{patient.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{patient.age} years • {patient.gender}</p>

                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-center">
                                    <Phone size={14} className="mr-2 text-gray-400" />
                                    {patient.contact}
                                </div>
                                <div className="flex items-center">
                                    <Mail size={14} className="mr-2 text-gray-400" />
                                    {patient.email || 'No email'}
                                </div>
                                <div className="flex items-center">
                                    <HeartPulse size={14} className="mr-2 text-gray-400" />
                                    {patient.condition}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Patient Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add New Patient</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <XCircle size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddPatient} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                    <input type="text" required className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="John Doe" value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact</label>
                                    <input type="tel" required className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="+1..." value={newPatient.contact} onChange={e => setNewPatient({ ...newPatient, contact: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
                                    <input type="number" required className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="0" value={newPatient.age || ''} onChange={e => setNewPatient({ ...newPatient, age: parseInt(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                                    <select className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" value={newPatient.gender} onChange={e => setNewPatient({ ...newPatient, gender: e.target.value as 'Male' | 'Female' })}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Condition</label>
                                <textarea className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none resize-none" rows={2} placeholder="Condition..." value={newPatient.condition} onChange={e => setNewPatient({ ...newPatient, condition: e.target.value })} />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium">Save Patient</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Patient Details Modal (Slide-over style or centered) */}
            {selectedPatient && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedPatient(null)}></div>
                    <div className="relative w-full max-w-md md:max-w-xl bg-white dark:bg-gray-800 h-full shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-primary text-2xl font-bold">
                                        {selectedPatient.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPatient.name}</h2>
                                        <p className="text-gray-500 dark:text-gray-400">Patient ID: #{selectedPatient.id}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedPatient(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                    <XCircle size={32} />
                                </button>
                            </div>

                            {/* Details Tabs/Content */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Age / Gender</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.age} yrs / {selectedPatient.gender}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Phone</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.contact}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Condition</p>
                                        <p className="font-medium text-primary">{selectedPatient.condition}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Last Visit</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.lastVisit}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                        <History size={20} className="mr-2 text-primary" /> Medical History
                                    </h3>
                                    <div className="border-l-2 border-gray-200 dark:border-gray-700 ml-2 pl-4 space-y-4">
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-white dark:ring-gray-800"></div>
                                            <p className="text-sm text-gray-500">2024-03-15</p>
                                            <p className="font-medium text-gray-900 dark:text-white">General Checkup</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Routine examination. BP normal. Advised diet control.</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-gray-300 ring-4 ring-white dark:ring-gray-800"></div>
                                            <p className="text-sm text-gray-500">2023-11-20</p>
                                            <p className="font-medium text-gray-900 dark:text-white">Flu Symptoms</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Prescribed antibiotics and rest.</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                        <Pill size={20} className="mr-2 text-primary" /> Current Medications
                                    </h3>
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-100 dark:divide-gray-700">
                                        <div className="p-3 flex justify-between items-center">
                                            <span className="font-medium">Lisinopril 10mg</span>
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Active</span>
                                        </div>
                                        <div className="p-3 flex justify-between items-center">
                                            <span className="font-medium">Vitamin D3</span>
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Active</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 flex gap-3">
                                    <button className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium shadow-sm">
                                        Book Appointment
                                    </button>
                                    <button className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
