import React, { useState } from 'react';
import { Plus, Edit2, Trash2, DollarSign, Clock, ChevronDown, ChevronRight, Stethoscope, XCircle } from 'lucide-react';

interface Service {
    id: string;
    name: string;
    duration: string;
    price: number;
}

interface Specialty {
    id: string;
    name: string;
    services: Service[];
}

export const ClinicServices: React.FC = () => {
    // Mock Data with Hierarchy
    const [specialties, setSpecialties] = useState<Specialty[]>([
        {
            id: '1',
            name: 'General Consultation',
            services: [
                { id: '1-1', name: 'Initial Checkup', duration: '30 mins', price: 50 },
                { id: '1-2', name: 'Follow-up Visit', duration: '15 mins', price: 30 },
            ]
        },
        {
            id: '2',
            name: 'Dentistry',
            services: [
                { id: '2-1', name: 'Teeth Cleaning', duration: '45 mins', price: 80 },
                { id: '2-2', name: 'Root Canal', duration: '90 mins', price: 200 },
                { id: '2-3', name: 'Extraction', duration: '30 mins', price: 100 },
            ]
        },
        {
            id: '3',
            name: 'Cardiology',
            services: [
                { id: '3-1', name: 'ECG', duration: '20 mins', price: 120 },
                { id: '3-2', name: 'Cardiac Consultation', duration: '40 mins', price: 150 },
            ]
        }
    ]);

    const [expandedSpecialty, setExpandedSpecialty] = useState<string | null>('1');
    const [showAddSpecialtyModal, setShowAddSpecialtyModal] = useState(false);
    const [showAddServiceModal, setShowAddServiceModal] = useState(false);

    // Form States
    const [newSpecialtyName, setNewSpecialtyName] = useState('');
    const [newService, setNewService] = useState({
        specialtyId: '',
        name: '',
        duration: '',
        price: 0
    });

    const toggleSpecialty = (id: string) => {
        setExpandedSpecialty(expandedSpecialty === id ? null : id);
    };

    const handleAddSpecialty = (e: React.FormEvent) => {
        e.preventDefault();
        const specialty: Specialty = {
            id: Date.now().toString(),
            name: newSpecialtyName,
            services: []
        };
        setSpecialties([...specialties, specialty]);
        setNewSpecialtyName('');
        setShowAddSpecialtyModal(false);
    };

    const handleAddService = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newService.specialtyId) return;

        const updatedSpecialties = specialties.map(s => {
            if (s.id === newService.specialtyId) {
                return {
                    ...s,
                    services: [...s.services, {
                        id: Date.now().toString(),
                        name: newService.name,
                        duration: newService.duration,
                        price: newService.price
                    }]
                };
            }
            return s;
        });

        setSpecialties(updatedSpecialties);
        // Expand the specialty we just added to
        setExpandedSpecialty(newService.specialtyId);
        setNewService({ specialtyId: '', name: '', duration: '', price: 0 });
        setShowAddServiceModal(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services & Specialties</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your clinic's medical specialties and service catalog</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowAddSpecialtyModal(true)}
                        className="flex items-center px-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all font-medium"
                    >
                        <Plus size={20} className="mr-2" />
                        Add Specialty
                    </button>
                    <button
                        onClick={() => setShowAddServiceModal(true)}
                        className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all shadow-md font-medium"
                    >
                        <Plus size={20} className="mr-2" />
                        Add Service
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {specialties.map((specialty) => (
                    <div key={specialty.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {/* Specialty Header */}
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            onClick={() => toggleSpecialty(specialty.id)}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-primary">
                                    <Stethoscope size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{specialty.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{specialty.services.length} Services</p>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-400">
                                {expandedSpecialty === specialty.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                            </div>
                        </div>

                        {/* Services List (Collapsible) */}
                        {expandedSpecialty === specialty.id && (
                            <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
                                {specialty.services.length > 0 ? (
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider pl-16">Service Name</th>
                                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                            {specialty.services.map((service) => (
                                                <tr key={service.id} className="hover:bg-white dark:hover:bg-gray-800 transition-colors">
                                                    <td className="px-6 py-3 pl-16 font-medium text-gray-900 dark:text-white">{service.name}</td>
                                                    <td className="px-6 py-3 text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center">
                                                            <Clock size={14} className="mr-1.5 text-gray-400" />
                                                            {service.duration}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                                                        <div className="flex items-center text-primary">
                                                            <DollarSign size={14} className="mr-0.5" />
                                                            {service.price}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-3 text-right space-x-2">
                                                        <button className="p-1 text-gray-500 hover:text-primary transition-colors">
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button className="p-1 text-gray-500 hover:text-red-500 transition-colors">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                        No services added to this specialty yet.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add Specialty Modal */}
            {showAddSpecialtyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">New Specialty</h3>
                            <button onClick={() => setShowAddSpecialtyModal(false)} className="text-gray-500 hover:text-gray-700">
                                <XCircle size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddSpecialty}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specialty Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:bg-gray-900 dark:text-white mb-6"
                                placeholder="e.g. Dermatology"
                                value={newSpecialtyName}
                                onChange={e => setNewSpecialtyName(e.target.value)}
                            />
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setShowAddSpecialtyModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium">Add Specialty</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Service Modal */}
            {showAddServiceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">New Service</h3>
                            <button onClick={() => setShowAddServiceModal(false)} className="text-gray-500 hover:text-gray-700">
                                <XCircle size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddService} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Specialty</label>
                                <select
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:bg-gray-900 dark:text-white"
                                    value={newService.specialtyId}
                                    onChange={e => setNewService({ ...newService, specialtyId: e.target.value })}
                                >
                                    <option value="">Select a specialty...</option>
                                    {specialties.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:bg-gray-900 dark:text-white"
                                    placeholder="e.g. Consultation"
                                    value={newService.name}
                                    onChange={e => setNewService({ ...newService, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:bg-gray-900 dark:text-white"
                                        placeholder="e.g. 30 mins"
                                        value={newService.duration}
                                        onChange={e => setNewService({ ...newService, duration: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:bg-gray-900 dark:text-white"
                                        placeholder="0.00"
                                        value={newService.price}
                                        onChange={e => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowAddServiceModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium">Add Service</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
