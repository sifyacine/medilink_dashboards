import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, List, Clock, Filter, Plus } from 'lucide-react';
import AppointmentTable from '../../components/doctor/AppointmentTable';
import { doctorService } from '../../services/doctorService';
import { Appointment } from '../../types/models';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

export const Appointments: React.FC = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await doctorService.getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to load appointments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: string, status: Appointment['status']) => {
    try {
      await doctorService.updateAppointmentStatus(id, status);
      // Optimistic update
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const filteredAppointments = filterStatus === 'All'
    ? appointments
    : appointments.filter(a => a.status === filterStatus);

  // Simple Weekly Calendar View
  const renderCalendar = () => {
    const days = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
    const hours = Array.from({ length: 9 }, (_, i) => i + 9); // 09:00 to 17:00

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
        <div className="grid grid-cols-8 border-b border-gray-200 min-w-[800px]">
          <div className="p-4 border-r border-gray-200 bg-gray-50"></div>
          {days.map(day => (
            <div key={day.toISOString()} className={`p-4 text-center border-r border-gray-100 ${isSameDay(day, new Date()) ? 'bg-primary/10' : ''}`}>
              <p className="text-xs text-gray-500 uppercase">{format(day, 'EEE')}</p>
              <p className={`text-sm font-bold ${isSameDay(day, new Date()) ? 'text-primary' : 'text-gray-900'}`}>{format(day, 'd')}</p>
            </div>
          ))}
        </div>
        <div className="h-[600px] overflow-y-auto overflow-x-auto">
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 min-h-[80px] min-w-[800px]">
              <div className="p-2 border-r border-b border-gray-100 text-xs text-gray-400 text-right pr-4">
                {hour}:00
              </div>
              {days.map(day => {
                const dayAppts = appointments.filter(a => {
                  const aDate = new Date(a.date);
                  const aHour = parseInt(a.time.split(':')[0]);
                  return isSameDay(aDate, day) && aHour === hour;
                });

                return (
                  <div key={day.toISOString()} className="border-r border-b border-gray-100 relative p-1">
                    {dayAppts.map(apt => (
                      <div key={apt.id} className="bg-primary/10 text-primary text-xs p-1 rounded mb-1 truncate cursor-pointer hover:bg-primary/20">
                        {apt.time} - {apt.patientName}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) return <div className="p-8">Loading appointments...</div>;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500">Manage your schedule</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex bg-white rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-md transition-colors ${view === 'list' ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`p-2 rounded-md transition-colors ${view === 'calendar' ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <CalendarIcon size={20} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary font-medium shadow-sm transition-colors">
            <Plus size={18} /> New Appointment
          </button>
        </div>
      </div>

      {view === 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-500">
              <Filter size={18} />
              <span className="text-sm font-medium">Filter by Status:</span>
            </div>
            <div className="flex gap-2">
              {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${filterStatus === status
                    ? 'bg-primary/10 text-primary border-primary/20'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <AppointmentTable
            appointments={filteredAppointments}
            onStatusChange={handleStatusChange}
          />
        </div>
      )}

      {view === 'calendar' && renderCalendar()}
    </div>
  );
};

export default Appointments;