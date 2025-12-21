import React, { useState } from 'react';
import { Save, Building, MapPin, Phone, Mail, Globe, Upload } from 'lucide-react';

export const ClinicSettings: React.FC = () => {
    // Mock initial data
    const [clinicDetails, setClinicDetails] = useState({
        name: 'MediLife Medical Center',
        address: '123 Healthcare Blvd, Medical District',
        phone: '+1 (555) 123-4567',
        email: 'contact@medilife.com',
        website: 'www.medilife.com',
        description: 'Providing compassionate care for the whole family.',
        logo: null as string | null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setClinicDetails(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clinic Settings</h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                        <Building className="mr-2 text-cyan-600" size={20} />
                        Clinic Profile
                    </h2>

                    <div className="space-y-6">
                        {/* Logo Upload */}
                        <div className="flex items-center space-x-6">
                            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                                {clinicDetails.logo ? (
                                    <img src={clinicDetails.logo} alt="Logo" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <Building className="text-gray-400" size={32} />
                                )}
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Clinic Logo</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    JPG, GIF or PNG. Max size of 800K
                                </p>
                                <button className="mt-3 flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <Upload size={16} className="mr-2" />
                                    Upload New Logo
                                </button>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Clinic Name</label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={clinicDetails.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="website"
                                        value={clinicDetails.website}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={clinicDetails.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={clinicDetails.phone}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <textarea
                                        name="address"
                                        rows={3}
                                        value={clinicDetails.address}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 dark:bg-gray-900 dark:text-white resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button className="flex items-center px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors shadow-sm">
                                <Save size={18} className="mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
