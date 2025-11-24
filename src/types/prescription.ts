// Prescription Type Definitions for Algerian Medical System

export interface DoctorInfo {
    id: string;
    name: string;
    specialty: string;
    licenseNumber: string;
    cabinetName: string;
    cabinetAddress: string;
    phone: string;
    email?: string;
    stampUrl?: string;
}

export interface PatientInfo {
    id: string;
    fullName: string;
    dateOfBirth: string;
    age: number;
    gender: 'M' | 'F' | 'Other';
    address: string;
    phone: string;
    socialSecurityNumber?: string;
    weight?: number;
    allergies?: string[];
}

export interface Medication {
    id: string;
    name: string;
    genericName?: string;
    dosage: string;
    form: 'Comprimé' | 'Gélule' | 'Sirop' | 'Injectable' | 'Crème' | 'Pommade' | 'Suppositoire' | 'Autre';
    quantity: number;
    unit: string;
    posology: string;
    duration: string;
    beforeMeal?: boolean;
    doNotSubstitute?: boolean;
    instructions?: string;
}

export interface Prescription {
    id: string;
    prescriptionNumber: string;
    date: Date;
    doctor: DoctorInfo;
    patient: PatientInfo;
    diagnosis?: string;
    examination?: string;
    medications: Medication[];
    recommendations?: string;
    additionalNotes?: string;
    signatureDataUrl?: string;
    renewalsAllowed: number;
    createdAt: Date;
    qrCodeData?: string;
    barcodeData?: string;
}

export interface PrescriptionFormData {
    patientId?: string;
    diagnosis?: string;
    examination?: string;
    medications: Medication[];
    recommendations?: string;
    additionalNotes?: string;
    renewalsAllowed: number;
}
