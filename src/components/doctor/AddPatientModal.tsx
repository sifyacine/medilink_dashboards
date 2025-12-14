import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Patient, Gender, BloodType } from '../../types/models';
import { User, MapPin, Activity, AlertCircle } from 'lucide-react';

interface AddPatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (patient: Partial<Patient>) => void;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: 'Male' as Gender,
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'Algeria'
        },
        bloodType: 'A+' as BloodType,
        allergies: '',
        chronicConditions: '',
        height: '',
        weight: '',
        emergencyContact: {
            name: '',
            phone: '',
            relationship: ''
        }
    });

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddressChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [field]: value }
        }));
    };

    const handleEmergencyChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            emergencyContact: { ...prev.emergencyContact, [field]: value }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPatient: Partial<Patient> = {
            ...formData,
            allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : [],
            chronicConditions: formData.chronicConditions ? formData.chronicConditions.split(',').map(s => s.trim()) : [],
            height: Number(formData.height) || undefined,
            weight: Number(formData.weight) || undefined,
        };
        onSave(newPatient);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Patient" size="3xl">
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Personal Information */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
                        <User size={20} className="text-cyan-600" /> Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            required
                            placeholder="First Name *"
                            className="input-field"
                            value={formData.firstName}
                            onChange={e => handleChange('firstName', e.target.value)}
                        />
                        <input
                            required
                            placeholder="Last Name *"
                            className="input-field"
                            value={formData.lastName}
                            onChange={e => handleChange('lastName', e.target.value)}
                        />
                        <input
                            type="date"
                            required
                            className="input-field"
                            value={formData.dateOfBirth}
                            onChange={e => handleChange('dateOfBirth', e.target.value)}
                        />
                        <select
                            className="input-field"
                            value={formData.gender}
                            onChange={e => handleChange('gender', e.target.value as Gender)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input-field"
                            value={formData.email}
                            onChange={e => handleChange('email', e.target.value)}
                        />
                        <input
                            type="tel"
                            required
                            placeholder="Phone *"
                            className="input-field"
                            value={formData.phone}
                            onChange={e => handleChange('phone', e.target.value)}
                        />
                    </div>
                </div>

                {/* Address */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
                        <MapPin size={20} className="text-cyan-600" /> Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Street Address"
                            className="input-field md:col-span-2"
                            value={formData.address.street}
                            onChange={e => handleAddressChange('street', e.target.value)}
                        />
                        <input
                            placeholder="City"
                            className="input-field"
                            value={formData.address.city}
                            onChange={e => handleAddressChange('city', e.target.value)}
                        />
                        <input
                            placeholder="State/Wilaya"
                            className="input-field"
                            value={formData.address.state}
                            onChange={e => handleAddressChange('state', e.target.value)}
                        />
                        <input
                            placeholder="Zip Code"
                            className="input-field"
                            value={formData.address.zipCode}
                            onChange={e => handleAddressChange('zipCode', e.target.value)}
                        />
                    </div>
                </div>

                {/* Medical Information */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
                        <Activity size={20} className="text-cyan-600" /> Medical Profile
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select
                            className="input-field"
                            value={formData.bloodType}
                            onChange={e => handleChange('bloodType', e.target.value as BloodType)}
                        >
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="Height (cm)"
                            className="input-field"
                            value={formData.height}
                            onChange={e => handleChange('height', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Weight (kg)"
                            className="input-field"
                            value={formData.weight}
                            onChange={e => handleChange('weight', e.target.value)}
                        />
                        <input
                            placeholder="Allergies (comma separated)"
                            className="input-field md:col-span-3"
                            value={formData.allergies}
                            onChange={e => handleChange('allergies', e.target.value)}
                        />
                        <input
                            placeholder="Chronic Conditions (comma separated)"
                            className="input-field md:col-span-3"
                            value={formData.chronicConditions}
                            onChange={e => handleChange('chronicConditions', e.target.value)}
                        />
                    </div>
                </div>

                {/* Emergency Contact */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
                        <AlertCircle size={20} className="text-cyan-600" /> Emergency Contact
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            placeholder="Contact Name"
                            className="input-field"
                            value={formData.emergencyContact.name}
                            onChange={e => handleEmergencyChange('name', e.target.value)}
                        />
                        <input
                            placeholder="Relationship"
                            className="input-field"
                            value={formData.emergencyContact.relationship}
                            onChange={e => handleEmergencyChange('relationship', e.target.value)}
                        />
                        <input
                            placeholder="Emergency Phone"
                            className="input-field"
                            value={formData.emergencyContact.phone}
                            onChange={e => handleEmergencyChange('phone', e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"> Cancel </button>
                    <button type="submit" className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"> Save Patient </button>
                </div>
            </form>
            <style>{`
                .input-field {
                    width: 100%;
                    padding: 0.5rem 1rem;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.5rem;
                    outline: none;
                    transition: all 0.2s;
                }
                .input-field:focus {
                    ring: 2px;
                    border-color: #0891b2;
                    box-shadow: 0 0 0 2px rgba(8, 145, 178, 0.2);
                }
            `}</style>
        </Modal>
    );
};
