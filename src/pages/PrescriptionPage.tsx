import React, { useState } from 'react';
import { Pill, Plus, Search, UserPlus, FileText, Eye } from 'lucide-react';

// Sample data (in a real app, this would come from an API)
const initialPrescriptions = [
  {
    id: 1,
    patient: 'John Smith',
    medication: 'Lisinopril 10mg',
    dosage: 'Once daily',
    duration: '30 days',
    date: '2025-09-20',
    status: 'Active',
  },
  {
    id: 2,
    patient: 'Sarah Johnson',
    medication: 'Metformin 500mg',
    dosage: 'Twice daily',
    duration: '60 days',
    date: '2025-09-15',
    status: 'Active',
  },
  {
    id: 3,
    patient: 'Mike Wilson',
    medication: 'Aspirin 81mg',
    dosage: 'Once daily',
    duration: '90 days',
    date: '2025-09-10',
    status: 'Expired',
  },
];

const initialPatients = [
  { id: 1, name: 'John Smith', age: 45, condition: 'Hypertension' },
  { id: 2, name: 'Sarah Johnson', age: 52, condition: 'Diabetes' },
  { id: 3, name: 'Mike Wilson', age: 60, condition: 'Heart Disease' },
];

const initialMedications = [
  { id: 1, name: 'Lisinopril 10mg', category: 'Hypertension' },
  { id: 2, name: 'Metformin 500mg', category: 'Diabetes' },
  { id: 3, name: 'Aspirin 81mg', category: 'Cardiovascular' },
];

export const PrescriptionPage: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [patients, setPatients] = useState(initialPatients);
  const [medications, setMedications] = useState(initialMedications);
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [showNewPatient, setShowNewPatient] = useState(false);
  const [showNewMedication, setShowNewMedication] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPrescription, setNewPrescription] = useState({
    patientId: '',
    medicationId: '',
    dosage: '',
    duration: '',
    instructions: '',
  });
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    condition: '',
  });
  const [newMedication, setNewMedication] = useState({
    name: '',
    category: '',
  });

  const handleAddPrescription = () => {
    const newId = prescriptions.length + 1;
    const patient = patients.find((p) => p.id === parseInt(newPrescription.patientId));
    const medication = medications.find((m) => m.id === parseInt(newPrescription.medicationId));
    if (patient && medication) {
      setPrescriptions([
        ...prescriptions,
        {
          id: newId,
          patient: patient.name,
          medication: medication.name,
          dosage: newPrescription.dosage,
          duration: newPrescription.duration,
          date: new Date().toISOString().split('T')[0],
          status: 'Active',
        },
      ]);
      setNewPrescription({ patientId: '', medicationId: '', dosage: '', duration: '', instructions: '' });
      setShowNewPrescription(false);
    }
  };

  const handleAddPatient = () => {
    const newId = patients.length + 1;
    setPatients([
      ...patients,
      {
        id: newId,
        name: newPatient.name,
        age: parseInt(newPatient.age),
        condition: newPatient.condition,
      },
    ]);
    setNewPatient({ name: '', age: '', condition: '' });
    setShowNewPatient(false);
  };

  const handleAddMedication = () => {
    const newId = medications.length + 1;
    setMedications([
      ...medications,
      {
        id: newId,
        name: newMedication.name,
        category: newMedication.category,
      },
    ]);
    setNewMedication({ name: '', category: '' });
    setShowNewMedication(false);
  };

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prescriptions</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and create patient prescriptions</p>
        </div>
        <button
          onClick={() => setShowNewPrescription(true)}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>New Prescription</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search prescriptions by patient or medication..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Prescription History</h3>
        <div className="space-y-3">
          {filteredPrescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="p-4 rounded-lg border-l-4 border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{prescription.patient}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{prescription.medication}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {prescription.dosage} • {prescription.duration}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Issued: {prescription.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      prescription.status === 'Active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                    }`}
                  >
                    {prescription.status}
                  </span>
                  <button
                    className="p-2 text-cyan-600 hover:bg-cyan-100 dark:hover:bg-cyan-900/20 rounded-lg"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Prescription Modal */}
      {showNewPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">New Prescription</h3>
            <div className="space-y-4">
              {/* Patient Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Patient
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={newPrescription.patientId}
                    onChange={(e) =>
                      setNewPrescription({ ...newPrescription, patientId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select a patient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} ({patient.condition})
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowNewPatient(true)}
                    className="p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                    title="Add New Patient"
                  >
                    <UserPlus size={16} />
                  </button>
                </div>
              </div>

              {/* Medication Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Medication
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={newPrescription.medicationId}
                    onChange={(e) =>
                      setNewPrescription({ ...newPrescription, medicationId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select a medication</option>
                    {medications.map((med) => (
                      <option key={med.id} value={med.id}>
                        {med.name} ({med.category})
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowNewMedication(true)}
                    className="p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                    title="Add New Medication"
                  >
                    <Pill size={16} />
                  </button>
                </div>
              </div>

              {/* Dosage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dosage Instructions
                </label>
                <input
                  type="text"
                  value={newPrescription.dosage}
                  onChange={(e) =>
                    setNewPrescription({ ...newPrescription, dosage: e.target.value })
                  }
                  placeholder="e.g., Once daily"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Duration
                </label>
                <input
                  type="text"
                  value={newPrescription.duration}
                  onChange={(e) =>
                    setNewPrescription({ ...newPrescription, duration: e.target.value })
                  }
                  placeholder="e.g., 30 days"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Additional Instructions
                </label>
                <textarea
                  value={newPrescription.instructions}
                  onChange={(e) =>
                    setNewPrescription({ ...newPrescription, instructions: e.target.value })
                  }
                  placeholder="Enter any additional instructions..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewPrescription(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPrescription}
                disabled={!newPrescription.patientId || !newPrescription.medicationId || !newPrescription.dosage || !newPrescription.duration}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Save Prescription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Patient Modal */}
      {showNewPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Patient</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  placeholder="Enter patient name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Age
                </label>
                <input
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                  placeholder="Enter patient age"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Condition
                </label>
                <input
                  type="text"
                  value={newPatient.condition}
                  onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
                  placeholder="Enter primary condition"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewPatient(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPatient}
                disabled={!newPatient.name || !newPatient.age || !newPatient.condition}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Medication Modal */}
      {showNewMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Medication</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Medication Name
                </label>
                <input
                  type="text"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                  placeholder="Enter medication name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <input
                  type="text"
                  value={newMedication.category}
                  onChange={(e) => setNewMedication({ ...newMedication, category: e.target.value })}
                  placeholder="Enter medication category"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewMedication(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMedication}
                disabled={!newMedication.name || !newMedication.category}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Medication
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};