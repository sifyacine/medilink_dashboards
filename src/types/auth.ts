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
