import React, { useState } from 'react';
import { Search, Filter, Plus, Stethoscope, Mail, Phone, Calendar, Clock, Star, Edit2, Trash2, XCircle } from 'lucide-react';

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    email: string;
    phone: string;
    status: 'Active' | 'On Leave';
    joinedDate: string;
    rating: number;
    image?: string;
}

export const ClinicDoctors: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([
        { id: '1', name: 'Dr. Sarah Smith', specialty: 'Cardiology', email: 'sarah.smith@medilink.com', phone: '+1 555 123 4567', status: 'Active', joinedDate: '2023-01-15', rating: 4.8 },
        { id: '2', name: 'Dr. Michael Chen', specialty: 'Pediatrics', email: 'michael.chen@medilink.com', phone: '+1 555 234 5678', status: 'Active', joinedDate: '2023-02-01', rating: 4.9 },
        { id: '3', name: 'Dr. Emily Brown', specialty: 'Dermatology', email: 'emily.brown@medilink.com', phone: '+1 555 345 6789', status: 'On Leave', joinedDate: '2023-03-10', rating: 4.7 },
        { id: '4', name: 'Dr. James Wilson', specialty: 'Neurology', email: 'james.wilson@medilink.com', phone: '+1 555 456 7890', status: 'Active', joinedDate: '2023-04-05', rating: 4.9 },
        { id: '5', name: 'Dr. Lisa Taylor', specialty: 'General Medicine', email: 'lisa.taylor@medilink.com', phone: '+1 555 567 8901', status: 'Active', joinedDate: '2023-05-20', rating: 4.6 },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({ name: '', specialty: '', email: '', phone: '', status: 'Active' });

    const handleAddDoctor = (e: React.FormEvent) => {
        e.preventDefault();
        const doctor: Doctor = {
            id: (doctors.length + 1).toString(),
            name: newDoctor.name || 'Dr. Unknown',
            specialty: newDoctor.specialty || 'General',
            email: newDoctor.email || '',
            phone: newDoctor.phone || '',
            status: 'Active',
            joinedDate: new Date().toISOString().split('T')[0],
            rating: 0,
        };
        setDoctors([...doctors, doctor]);
        setShowAddModal(false);
        setNewDoctor({ name: '', specialty: '', email: '', phone: '', status: 'Active' });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Doctors</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage clinic's medical staff</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all shadow-md font-medium"
                >
                    <Plus size={20} className="mr-2" />
                    Add Doctor
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search doctors by name or specialty..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                        <Filter size={18} className="mr-2" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col transition-shadow hover:shadow-md group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-4">
                                <div className="h-14 w-14 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-primary text-xl font-bold border-2 border-white dark:border-gray-700 shadow-sm">
                                    {doctor.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{doctor.name}</h3>
                                    <div className="flex items-center text-cyan-600 dark:text-cyan-400 text-sm font-medium">
                                        <Stethoscope size={14} className="mr-1" />
                                        {doctor.specialty}
                                    </div>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${doctor.status === 'Active'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                                }`}>
                                {doctor.status}
                            </span>
                        </div>

                        <div className="space-y-3 mb-6 flex-1">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <Mail size={16} className="mr-3 text-gray-400" />
                                {doctor.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <Phone size={16} className="mr-3 text-gray-400" />
                                {doctor.phone}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <Calendar size={16} className="mr-3 text-gray-400" />
                                Joined {doctor.joinedDate}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <div className="flex items-center text-yellow-500 font-bold">
                                <Star size={18} className="fill-current mr-1" />
                                {doctor.rating}
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-primary hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors">
                                    <Edit2 size={18} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Doctor Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add New Doctor</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <XCircle size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddDoctor} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                <input type="text" required className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Dr. Name" value={newDoctor.name} onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specialty</label>
                                <input type="text" required className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Specialty" value={newDoctor.specialty} onChange={e => setNewDoctor({ ...newDoctor, specialty: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <input type="email" required className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Email" value={newDoctor.email} onChange={e => setNewDoctor({ ...newDoctor, email: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                                    <input type="tel" required className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Phone" value={newDoctor.phone} onChange={e => setNewDoctor({ ...newDoctor, phone: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium">Add Doctor</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
