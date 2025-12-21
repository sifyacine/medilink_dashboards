import React from 'react';
import { Pill, AlertTriangle, Plus } from 'lucide-react';

const mockMedicines = [
    { id: 1, name: 'Paracetamol 500mg', stock: 1540, minStock: 200, status: 'In Stock', expiry: '2025-12-01' },
    { id: 2, name: 'Amoxicillin 250mg', stock: 54, minStock: 100, status: 'Low Stock', expiry: '2024-10-15' },
    { id: 3, name: 'Ibuprofen 400mg', stock: 890, minStock: 150, status: 'In Stock', expiry: '2025-06-30' },
];

export const ClinicMedicines: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medicines Inventory</h1>
                <button className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-md">
                    <Plus size={20} className="mr-2" />
                    Add Medicine
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockMedicines.map((med) => (
                    <div key={med.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                <Pill className="text-blue-600 dark:text-blue-400" size={24} />
                            </div>
                            {med.status === 'Low Stock' && (
                                <AlertTriangle className="text-orange-500" size={20} />
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{med.name}</h3>
                        <div className="flex justify-between items-end mt-4">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Current Stock</p>
                                <p className={`text-2xl font-bold ${med.stock < med.minStock ? 'text-orange-600' : 'text-gray-900 dark:text-white'}`}>
                                    {med.stock}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400">Expires</p>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{med.expiry}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
