export type Status = 'Active' | 'Inactive' | 'Pending' | 'Archived';
export type Gender = 'Male' | 'Female' | 'Other';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed' | 'No Show';
export type AppointmentType = 'Consultation' | 'Follow-up' | 'Emergency' | 'Check-up';
export type PaymentStatus = 'Paid' | 'Unpaid' | 'Pending' | 'Overdue';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  licenseNumber: string;
  cabinetName: string;
  address: Address;
  availability: {
    days: string[]; // e.g., ['Mon', 'Tue']
    hours: { start: string; end: string };
  };
  avatarUrl?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO Date string
  gender: Gender;
  email: string;
  phone: string;
  address: Address;
  bloodType?: BloodType;
  allergies: string[];
  chronicConditions: string[];
  height?: number; // cm
  weight?: number; // kg
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  avatarUrl?: string;
  lastVisit?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string; // ISO Date string
  time: string; // HH:mm
  duration: number; // minutes
  type: AppointmentType;
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  patientName?: string; // Denormalized for easier display
  patientAvatar?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  symptoms: string[];
  treatment: string;
  prescriptionId?: string;
  notes?: string;
  attachments?: string[]; // URLs
}

export interface Invoice {
  id: string;
  patientId: string;
  appointmentId?: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  items: { description: string; cost: number }[];
}

export interface CabinetStats {
  totalPatients: number;
  appointmentsToday: number;
  revenueToday: number;
  pendingAppointments: number;
}
