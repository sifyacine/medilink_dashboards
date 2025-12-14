import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole } from '../../types/auth'; // Ensure this path is correct
import { CheckCircle, ChevronRight, User, Building, FileText, ArrowLeft, Loader } from 'lucide-react';

const steps = [
    { id: 1, title: 'Role Selection', icon: User },
    { id: 2, title: 'Personal Info', icon: FileText },
    { id: 3, title: 'Professional Info', icon: Building },
];

export const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        role: '' as UserRole | '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        licenseNumber: '',
        specialty: '',
        cabinetName: '',
        address: '',
    });

    const handleNext = () => {
        if (currentStep < 3) setCurrentStep(c => c + 1);
        else handleSubmit();
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(c => c - 1);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        // Navigate to status or success page
        navigate('/status?new=true'); // Passing a query param to show "Successfully submitted"
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <img
                        src="/assets/logo.png"
                        alt="MediLink Logo"
                        className="h-16 w-auto"
                    />
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Join Our Network
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Apply for access as a professional
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100">

                    {/* Progress Bar */}
                    <div className="flex items-center justify-between mb-8 relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded"></div>
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded transition-all duration-300"
                            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                        ></div>

                        {steps.map((step) => {
                            const Icon = step.icon;
                            const isActive = step.id === currentStep;
                            const isCompleted = step.id < currentStep;

                            return (
                                <div key={step.id} className="flex flex-col items-center bg-white px-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${isActive ? 'border-primary bg-primary text-white' :
                                        isCompleted ? 'border-green-500 bg-green-500 text-white' :
                                            'border-gray-300 text-gray-400'
                                        }`}>
                                        {isCompleted ? <CheckCircle size={16} /> : <Icon size={16} />}
                                    </div>
                                    <span className={`text-xs mt-1 font-medium ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Step 1: Role Selection */}
                    {currentStep === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-medium text-gray-900 text-center mb-4">Select your professional role</h3>
                            {[
                                { role: UserRole.DOCTOR, title: 'Doctor', desc: 'Manage patients, appointments & prescriptions' },
                                { role: UserRole.CLINIC_ADMIN, title: 'Clinic Administrator', desc: 'Manage clinic operations & staff' },
                                { role: UserRole.PHARMACY, title: 'Pharmacist', desc: 'Manage inventory & process orders' }
                            ].map((item) => (
                                <button
                                    key={item.role}
                                    onClick={() => setFormData({ ...formData, role: item.role })}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${formData.role === item.role
                                        ? 'border-primary bg-teal-50 ring-1 ring-primary'
                                        : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-900">{item.title}</p>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                        {formData.role === item.role && <CheckCircle className="text-primary" size={20} />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 2: Personal Info */}
                    {currentStep === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input name="email" value={formData.email} onChange={handleChange} type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input name="password" value={formData.password} onChange={handleChange} type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Professional Info */}
                    {currentStep === 3 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Medical License Number</label>
                                <input name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" placeholder="e.g. MD-2024-XXXX" />
                            </div>

                            {formData.role !== UserRole.CLINIC_ADMIN && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Specialty</label>
                                    <input name="specialty" value={formData.specialty} onChange={handleChange} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    {formData.role === UserRole.PHARMACY ? 'Pharmacy Name' : 'Cabinet/Clinic Name'}
                                </label>
                                <input name="cabinetName" value={formData.cabinetName} onChange={handleChange} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Business Address</label>
                                <textarea name="address" value={formData.address} onChange={() => { }} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border" rows={3} />
                            </div>
                        </div>
                    )}

                    {/* Footer Buttons */}
                    <div className="mt-8 flex justify-between gap-3">
                        {currentStep > 1 ? (
                            <button
                                onClick={handleBack}
                                className="flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                <ArrowLeft size={16} className="mr-2" /> Back
                            </button>
                        ) : (
                            <div className="flex-1 text-center text-sm text-gray-500 pt-2">
                                Already have an account? <Link to="/login" className="text-primary hover:text-secondary font-medium">Log in</Link>
                            </div>
                        )}

                        {currentStep > 1 && (
                            <button
                                onClick={handleNext}
                                disabled={isSubmitting}
                                className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>Processing <Loader className="ml-2 animate-spin" size={16} /></>
                                ) : currentStep === 3 ? (
                                    'Submit Application'
                                ) : (
                                    <>Next Step <ChevronRight size={16} className="ml-2" /></>
                                )}
                            </button>
                        )}

                        {currentStep === 1 && (
                            <button
                                onClick={handleNext}
                                disabled={!formData.role}
                                className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:bg-gray-300"
                            >
                                Continue
                            </button>
                        )}
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-gray-500">
                    By registering, you agree to our Terms of Service and Privacy Policy.
                    Professional verification may take up to 48 hours.
                </p>
            </div>
        </div>
    );
};