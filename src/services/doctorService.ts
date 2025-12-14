import { Doctor, Patient, Appointment, CabinetStats } from '../types/models';
import { mockDoctor, mockPatients, mockAppointments, mockStats } from './mockFactory';

// Simulation of async API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const doctorService = {
    getProfile: async (): Promise<Doctor> => {
        await delay(500);
        return mockDoctor;
    },

    getStats: async (): Promise<CabinetStats> => {
        await delay(300);
        return mockStats;
    },

    getPatients: async (): Promise<Patient[]> => {
        await delay(600);
        return mockPatients;
    },

    getPatientById: async (id: string): Promise<Patient | undefined> => {
        await delay(400);
        return mockPatients.find(p => p.id === id);
    },

    getAppointments: async (date?: string): Promise<Appointment[]> => {
        await delay(500);
        if (date) {
            return mockAppointments.filter(a => a.date === date);
        }
        return mockAppointments;
    },

    updateAppointmentStatus: async (id: string, status: Appointment['status']): Promise<void> => {
        await delay(300);
        const apt = mockAppointments.find(a => a.id === id);
        if (apt) {
            apt.status = status;
        }
    }
};
