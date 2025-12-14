import React, { useState } from 'react';
import { Plus, Search, FileText, Download, Printer, QrCode } from 'lucide-react';
import { SignaturePad } from '../../components/prescription/SignaturePad';
import { generatePrescriptionPDF } from '../../utils/pdfGenerator';
import { Prescription, Medication, DoctorInfo, PatientInfo } from '../../types/prescription';

// Mock doctor data (in real app, would come from auth context)
const mockDoctor: DoctorInfo = {
  id: '1',
  name: 'Ahmed Benali',
  specialty: 'Médecin Généraliste',
  licenseNumber: 'A12345',
  cabinetName: 'Cabinet Médical El-Shifa',
  cabinetAddress: '15 Rue Didouche Mourad, Alger Centre, 16000',
  phone: '+213 21 XX XX XX',
  email: 'dr.benali@cabinet-elshifa.dz',
};

// Mock patients
const mockPatients: PatientInfo[] = [
  {
    id: '1',
    fullName: 'Fatima Amrani',
    dateOfBirth: '1985-03-15',
    age: 38,
    gender: 'F',
    address: '25 Rue Larbi Ben M\'hidi, Alger',
    phone: '+213 55 XXX XX XX',
    weight: 65,
  },
  {
    id: '2',
    fullName: 'Karim Boudiaf',
    dateOfBirth: '1990-07-22',
    age: 33,
    gender: 'M',
    address: '10 Boulevard Mohamed V, Oran',
    phone: '+213 66 XXX XX XX',
    weight: 80,
  },
];

export const Prescriptions: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSignature, setCurrentSignature] = useState<string | null>(null);

  // Form state
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [currentMed, setCurrentMed] = useState<Partial<Medication>>({
    name: '',
    dosage: '',
    form: 'Comprimé',
    quantity: 1,
    unit: 'boîte(s)',
    posology: '',
    duration: '',
    doNotSubstitute: false,
  });
  const [recommendations, setRecommendations] = useState('');

  const addMedication = () => {
    if (currentMed.name && currentMed.dosage && currentMed.posology && currentMed.duration) {
      setMedications([
        ...medications,
        {
          id: `med-${Date.now()}`,
          ...currentMed,
        } as Medication,
      ]);
      setCurrentMed({
        name: '',
        dosage: '',
        form: 'Comprimé',
        quantity: 1,
        unit: 'boîte(s)',
        posology: '',
        duration: '',
        doNotSubstitute: false,
      });
    }
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const handleSignatureSave = (signatureDataUrl: string) => {
    setCurrentSignature(signatureDataUrl);
    setShowSignaturePad(false);
  };

  const createPrescription = async () => {
    if (!selectedPatientId || medications.length === 0 || !currentSignature) {
      alert('Veuillez remplir tous les champs obligatoires et signer l\'ordonnance');
      return;
    }

    const selectedPatient = mockPatients.find(p => p.id === selectedPatientId);
    if (!selectedPatient) return;

    const newPrescription: Prescription = {
      id: `RX-${Date.now()}`,
      prescriptionNumber: `ORD-${new Date().getFullYear()}-${String(prescriptions.length + 1).padStart(4, '0')}`,
      date: new Date(),
      doctor: mockDoctor,
      patient: selectedPatient,
      diagnosis,
      medications,
      recommendations,
      signatureDataUrl: currentSignature,
      renewalsAllowed: 0,
      createdAt: new Date(),
      qrCodeData: `RX-${Date.now()}`,
      barcodeData: `${Date.now()}`,
    };

    // Generate PDF
    await generatePrescriptionPDF(newPrescription);

    // Save to state
    setPrescriptions([newPrescription, ...prescriptions]);

    // Reset form
    setSelectedPatientId('');
    setDiagnosis('');
    setMedications([]);
    setRecommendations('');
    setCurrentSignature(null);
    setShowNewPrescription(false);
  };

  const downloadPrescription = async (prescription: Prescription) => {
    await generatePrescriptionPDF(prescription);
  };

  const filteredPrescriptions = prescriptions.filter(
    (rx) =>
      rx.patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.prescriptionNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ordonnances Médicales</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérer et créer des ordonnances professionnelles</p>
        </div>
        <button
          onClick={() => setShowNewPrescription(true)}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Nouvelle Ordonnance</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par patient ou numéro d'ordonnance..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Historique des Ordonnances</h3>
        <div className="space-y-3">
          {filteredPrescriptions.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              Aucune ordonnance trouvée. Créez votre première ordonnance professionnelle.
            </p>
          ) : (
            filteredPrescriptions.map((rx) => (
              <div
                key={rx.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <FileText size={20} className="text-cyan-600" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{rx.patient.fullName}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {rx.prescriptionNumber} • {new Date(rx.date).toLocaleDateString('fr-DZ')}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {rx.medications.length} médicament(s) prescrit(s)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => downloadPrescription(rx)}
                      className="p-2 text-cyan-600 hover:bg-cyan-100 dark:hover:bg-cyan-900/20 rounded-lg"
                      title="Télécharger PDF"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      onClick={() => downloadPrescription(rx)}
                      className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      title="Imprimer"
                    >
                      <Printer size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* New Prescription Modal */}
      {showNewPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Créer une Nouvelle Ordonnance
              </h3>

              {/* Patient Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Patient *
                </label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Sélectionner un patient</option>
                  {mockPatients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.fullName} - {patient.age} ans ({patient.gender})
                    </option>
                  ))}
                </select>
              </div>

              {/* Diagnosis */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Diagnostic
                </label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Ex: Infection respiratoire aiguë"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Medications */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Médicaments Prescrits</h4>

                {/* Added medications */}
                {medications.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {medications.map((med, index) => (
                      <div key={med.id} className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {index + 1}. {med.name} {med.dosage}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {med.posology} - {med.duration}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            Quantité: {med.quantity} {med.unit}
                          </p>
                        </div>
                        <button
                          onClick={() => removeMedication(med.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Retirer
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new medication form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <div className="col-span-1 md:col-span-2">
                    <input
                      type="text"
                      value={currentMed.name}
                      onChange={(e) => setCurrentMed({ ...currentMed, name: e.target.value })}
                      placeholder="Nom du médicament *"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <input
                    type="text"
                    value={currentMed.dosage}
                    onChange={(e) => setCurrentMed({ ...currentMed, dosage: e.target.value })}
                    placeholder="Dosage (ex: 500mg) *"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <select
                    value={currentMed.form}
                    onChange={(e) => setCurrentMed({ ...currentMed, form: e.target.value as Medication['form'] })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Comprimé">Comprimé</option>
                    <option value="Gélule">Gélule</option>
                    <option value="Sirop">Sirop</option>
                    <option value="Injectable">Injectable</option>
                    <option value="Crème">Crème</option>
                    <option value="Pommade">Pommade</option>
                    <option value="Suppositoire">Suppositoire</option>
                    <option value="Autre">Autre</option>
                  </select>
                  <input
                    type="text"
                    value={currentMed.posology}
                    onChange={(e) => setCurrentMed({ ...currentMed, posology: e.target.value })}
                    placeholder="Posologie (ex: 1cp x 3/jour) *"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={currentMed.duration}
                    onChange={(e) => setCurrentMed({ ...currentMed, duration: e.target.value })}
                    placeholder="Durée (ex: 7 jours) *"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <div className="col-span-1 md:col-span-2 flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={currentMed.doNotSubstitute || false}
                        onChange={(e) => setCurrentMed({ ...currentMed, doNotSubstitute: e.target.checked })}
                        className="rounded text-cyan-600 focus:ring-cyan-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Ne pas substituer</span>
                    </label>
                    <button
                      onClick={addMedication}
                      className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recommandations
                </label>
                <textarea
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  placeholder="Repos, hydratation, éviter l'exposition au froid..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Signature Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Signature *
                </label>
                {currentSignature ? (
                  <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={currentSignature} alt="Signature" className="h-16 border border-gray-300 rounded" />
                      <span className="text-sm text-green-600">✓ Signature ajoutée</span>
                    </div>
                    <button
                      onClick={() => setCurrentSignature(null)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Retirer
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSignaturePad(true)}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-cyan-500 dark:hover:border-cyan-500 text-gray-600 dark:text-gray-400 hover:text-cyan-600"
                  >
                    Cliquez pour signer l'ordonnance
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewPrescription(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Annuler
                </button>
                <button
                  onClick={createPrescription}
                  disabled={!selectedPatientId || medications.length === 0 || !currentSignature}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <QrCode size={16} />
                  <span>Générer l'Ordonnance PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signature Pad Modal */}
      {showSignaturePad && (
        <SignaturePad
          onSave={handleSignatureSave}
          onClose={() => setShowSignaturePad(false)}
        />
      )}
    </div>
  );
};