import { ClinicStats, ClinicTask, ActivityLog } from '../types/models';

export const mockClinicStats: ClinicStats = {
    totalDoctors: 12,
    totalNurses: 18,
    appointmentsToday: 45,
    monthlyRevenue: 125000,
    totalPatients: 1243
};

export const mockClinicActivity: ActivityLog[] = [
    { id: 1, action: 'New doctor joined', detail: 'Dr. Emily Johnson - Cardiology', time: '1 hour ago' },
    { id: 2, action: 'Appointment scheduled', detail: 'Patient John Doe with Dr. Smith', time: '2 hours ago' },
    { id: 3, action: 'Medicine restocked', detail: 'Paracetamol inventory updated', time: '4 hours ago' },
    { id: 4, action: 'Nurse shift updated', detail: 'Maria Rodriguez - Night shift', time: '6 hours ago' },
];

export const mockClinicTasks: ClinicTask[] = [
    { id: 1, task: 'Review doctor applications', priority: 'High', due: 'Today' },
    { id: 2, task: 'Update clinic schedule', priority: 'Medium', due: 'Tomorrow' },
    { id: 3, task: 'Medicine inventory check', priority: 'Low', due: 'This week' },
];
