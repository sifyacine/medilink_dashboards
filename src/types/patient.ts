export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalInfo: {
    bloodType: string;
    allergies: string[];
    chronicConditions: string[];
    currentMedications: string[];
    insuranceProvider: string;
    insuranceNumber: string;
  };
  assignedDoctorId: string;
  assignedNurseId?: string;
  clinicId: string;
  status: 'Active' | 'Inactive' | 'Discharged';
  createdDate: string;
  lastVisit?: string;
  nextAppointment?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  nurseId?: string;
  date: string;
  type: 'Consultation' | 'Follow-up' | 'Emergency' | 'Surgery' | 'Lab Results' | 'Prescription';
  diagnosis: string;
  symptoms: string[];
  treatment: string;
  prescription?: {
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }>;
  };
  vitalSigns?: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    height: number;
  };
  notes: string;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  followUpRequired: boolean;
  followUpDate?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  clinicId: string;
  requestedDate: string;
  requestedTime: string;
  approvedDate?: string;
  approvedTime?: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Cancelled' | 'No Show';
  type: 'Consultation' | 'Follow-up' | 'Check-up' | 'Emergency' | 'Surgery';
  reason: string;
  notes?: string;
  requestedAt: string;
  respondedAt?: string;
  respondedBy?: string;
  duration: number; // in minutes
}

export interface PatientFolder {
  patient: Patient;
  medicalRecords: MedicalRecord[];
  appointments: Appointment[];
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadedBy: string;
    uploadedAt: string;
    url: string;
  }>;
}