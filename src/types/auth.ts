export enum UserRole {
    SUPER_USER = 'Super User',
    CLINIC_ADMIN = 'Clinic Admin',
    DOCTOR = 'Doctor',
    NURSE = 'Nurse',
    PHARMACY = 'Pharmacy'
}

export interface User {
    id: string;
    email: string;
    role: UserRole;
    name: string;
    avatar?: string;
    clinicId?: string;
    permissions: string[];
}

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface RegistrationRequest {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    phone: string;
    licenseNumber?: string; // For Doctors
    address?: string;
    clinicName?: string; // For Clinic Admins
    specialty?: string; // For Doctors
    status: RegistrationStatus;
    submittedAt: string;
    updatedAt?: string;
    rejectionReason?: string;
}
