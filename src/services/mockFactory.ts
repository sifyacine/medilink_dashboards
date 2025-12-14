import { Doctor, Patient, Appointment, MedicalRecord, CabinetStats, Invoice } from '../types/models';

export const mockDoctor: Doctor = {
    id: 'd1',
    firstName: 'Sarah',
    lastName: 'Connor',
    email: 'sarah.connor@medilink.com',
    phone: '+213 555 123 456',
    specialty: 'Cardiologist',
    licenseNumber: 'MD-2024-889',
    cabinetName: 'Connor Heart Center',
    address: {
        street: '123 Medical Blvd',
        city: 'Algiers',
        state: 'Algiers',
        zipCode: '16000',
        country: 'Algeria'
    },
    availability: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Sun'],
        hours: { start: '09:00', end: '17:00' }
    },
    avatarUrl: 'https://i.pravatar.cc/150?u=d1'
};

export const mockPatients: Patient[] = [
    {
        id: 'p1',
        firstName: 'Amine',
        lastName: 'Zidane',
        dateOfBirth: '1985-04-12',
        gender: 'Male',
        email: 'amine.z@example.com',
        phone: '0550112233',
        address: { street: '45 Didouche Mourad', city: 'Algiers', state: 'Algiers', zipCode: '16000', country: 'Algeria' },
        bloodType: 'A+',
        allergies: ['Penicillin'],
        chronicConditions: ['Hypertension'],
        lastVisit: '2024-12-10',
        avatarUrl: 'https://i.pravatar.cc/150?u=p1'
    },
    {
        id: 'p2',
        firstName: 'Noura',
        lastName: 'Benali',
        dateOfBirth: '1992-08-25',
        gender: 'Female',
        email: 'noura.b@example.com',
        phone: '0660998877',
        address: { street: '12 Rue de la Liberté', city: 'Oran', state: 'Oran', zipCode: '31000', country: 'Algeria' },
        bloodType: 'O-',
        allergies: [],
        chronicConditions: [],
        lastVisit: '2024-11-28',
        avatarUrl: 'https://i.pravatar.cc/150?u=p2'
    },
    {
        id: 'p3',
        firstName: 'Karim',
        lastName: 'Meghni',
        dateOfBirth: '1978-01-15',
        gender: 'Male',
        email: 'karim.m@example.com',
        phone: '0770554433',
        address: { street: 'Cite 1000 Logements', city: 'Setif', state: 'Setif', zipCode: '19000', country: 'Algeria' },
        bloodType: 'B+',
        allergies: ['Peanuts', 'Dust'],
        chronicConditions: ['Asthma'],
        lastVisit: '2024-12-13',
        avatarUrl: 'https://i.pravatar.cc/150?u=p3'
    },
    {
        id: 'p4',
        firstName: 'Leila',
        lastName: 'Djaballah',
        dateOfBirth: '1955-06-30',
        gender: 'Female',
        email: 'leila.d@example.com',
        phone: '0540123123',
        address: { street: 'Rue Emir Abdelkader', city: 'Constantine', state: 'Constantine', zipCode: '25000', country: 'Algeria' },
        bloodType: 'AB+',
        allergies: [],
        chronicConditions: ['Diabetes Type 2'],
        lastVisit: '2024-10-05',
        avatarUrl: 'https://i.pravatar.cc/150?u=p4'
    }
];

export const mockAppointments: Appointment[] = [
    {
        id: 'a1',
        patientId: 'p1',
        doctorId: 'd1',
        date: '2024-12-14',
        time: '09:30',
        duration: 30,
        type: 'Consultation',
        status: 'Confirmed',
        reason: 'Regular checkup for hypertension',
        patientName: 'Amine Zidane',
        patientAvatar: 'https://i.pravatar.cc/150?u=p1'
    },
    {
        id: 'a2',
        patientId: 'p2',
        doctorId: 'd1',
        date: '2024-12-14',
        time: '10:30',
        duration: 30,
        type: 'Consultation',
        status: 'Pending',
        reason: 'Headaches and dizziness',
        patientName: 'Noura Benali',
        patientAvatar: 'https://i.pravatar.cc/150?u=p2'
    },
    {
        id: 'a3',
        patientId: 'p3',
        doctorId: 'd1',
        date: '2024-12-14',
        time: '14:00',
        duration: 45,
        type: 'Follow-up',
        status: 'Confirmed',
        reason: 'Asthma review',
        patientName: 'Karim Meghni',
        patientAvatar: 'https://i.pravatar.cc/150?u=p3'
    },
    {
        id: 'a4',
        patientId: 'p4',
        doctorId: 'd1',
        date: '2024-12-15',
        time: '11:00',
        duration: 60,
        type: 'Check-up',
        status: 'Confirmed',
        reason: 'Quarterly diabetes check',
        patientName: 'Leila Djaballah',
        patientAvatar: 'https://i.pravatar.cc/150?u=p4'
    }
];

export const mockStats: CabinetStats = {
    totalPatients: 1243,
    appointmentsToday: 8,
    revenueToday: 24000, // DZD
    pendingAppointments: 3
};
