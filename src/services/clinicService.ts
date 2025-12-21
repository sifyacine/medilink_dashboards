import { ClinicStats, ClinicTask, ActivityLog } from '../types/models';
import { mockClinicStats, mockClinicActivity, mockClinicTasks } from './clinicMockFactory';

// Simulation of async API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const clinicService = {
    getStats: async (): Promise<ClinicStats> => {
        await delay(300);
        return mockClinicStats;
    },

    getRecentActivity: async (): Promise<ActivityLog[]> => {
        await delay(400);
        return mockClinicActivity;
    },

    getTasks: async (): Promise<ClinicTask[]> => {
        await delay(300);
        return mockClinicTasks;
    },

    getWeeklyAppointments: async (): Promise<{ labels: string[], data: number[] }> => {
        await delay(500);
        return {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            data: [32, 45, 38, 52, 41, 28]
        };
    },

    getSpecialtyDistribution: async (): Promise<{ labels: string[], data: number[] }> => {
        await delay(500);
        return {
            labels: ['Cardiology', 'Pediatrics', 'Neurology', 'Dermatology', 'General'],
            data: [25, 20, 15, 18, 22]
        };
    }
};
