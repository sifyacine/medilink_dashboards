import React, { useEffect, useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import PatientCard from '../../components/doctor/PatientCard';
import PatientDetailsModal from '../../components/doctor/PatientDetailsModal';
import { doctorService } from '../../services/doctorService';
import { Patient, MedicalRecord, Appointment } from '../../types/models';

export const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [detailsData, setDetailsData] = useState<{
    patient: Patient;
    records: MedicalRecord[];
    appointments: Appointment[];
  } | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await doctorService.getPatients();
        setPatients(data);
      } catch (error) {
        console.error("Failed to load patients", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handlePatientClick = async (id: string) => {
    setSelectedPatientId(id);
    // In a real app, you might fetch details here if they aren't fully loaded
    const patient = patients.find(p => p.id === id);
    if (patient) {
      // Mock fetching related data
      // In reality: await doctorService.getPatientRecords(id)
      const appointments = await doctorService.getAppointments();
      const patientAppointments = appointments.filter(a => a.patientId === id);

      setDetailsData({
        patient,
        records: [], // Placeholder for now or fetch from service
        appointments: patientAppointments
      });
    }
  };

  const filteredPatients = patients.filter(p =>
    p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500">Manage patient records</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary font-medium shadow-sm transition-colors">
          <Plus size={18} /> Add Patient
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, phone..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 font-medium transition-colors">
          <Filter size={18} /> Filters
        </button>
      </div>

      {loading ? (
        <div className="p-10 text-center text-gray-500">Loading patients...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPatients.map(patient => (
            <PatientCard key={patient.id} patient={patient} onClick={handlePatientClick} />
          ))}
        </div>
      )}

      {detailsData && (
        <PatientDetailsModal
          isOpen={!!selectedPatientId}
          onClose={() => { setSelectedPatientId(null); setDetailsData(null); }}
          patient={detailsData.patient}
          medicalRecords={detailsData.records}
          appointments={detailsData.appointments}
        />
      )}
    </div>
  );
};

export default Patients;