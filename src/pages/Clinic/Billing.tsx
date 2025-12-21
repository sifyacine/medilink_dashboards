import React, { useState } from 'react';
import { Download, Check, Clock, AlertCircle, Plus, Search, Filter, Eye, MoreVertical, XCircle, FileText } from 'lucide-react';

interface Invoice {
    id: string;
    patientId: string;
    patientName: string;
    serviceId: string;
    serviceName: string;
    date: string;
    dueDate: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Overdue' | 'Cancelled';
}

export const ClinicBilling: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([
        { id: 'INV-1001', patientId: '1', patientName: 'James Wilson', serviceId: 's1', serviceName: 'X-Ray Scan', date: '2024-03-20', dueDate: '2024-04-20', amount: 150.00, status: 'Paid' },
        { id: 'INV-1002', patientId: '2', patientName: 'Linda Martinez', serviceId: 's2', serviceName: 'General Consultation', date: '2024-03-19', dueDate: '2024-03-25', amount: 50.00, status: 'Pending' },
        { id: 'INV-1003', patientId: '3', patientName: 'Robert Taylor', serviceId: 's3', serviceName: 'Specialist Visit', date: '2024-03-10', dueDate: '2024-03-17', amount: 120.00, status: 'Overdue' },
    ]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({
        patientName: '',
        serviceName: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        dueDate: '',
        status: 'Pending'
    });

    const handleCreateInvoice = (e: React.FormEvent) => {
        e.preventDefault();
        const invoice: Invoice = {
            id: `INV-${1000 + invoices.length + 1}`,
            patientId: 'temp', // In real app, select from patient list
            patientName: newInvoice.patientName || 'Unknown',
            serviceId: 'temp',
            serviceName: newInvoice.serviceName || 'Service',
            date: newInvoice.date || '',
            dueDate: newInvoice.dueDate || '',
            amount: newInvoice.amount || 0,
            status: 'Pending'
        };
        setInvoices([invoice, ...invoices]);
        setShowCreateModal(false);
        setNewInvoice({ patientName: '', serviceName: '', amount: 0, date: new Date().toISOString().split('T')[0], dueDate: '', status: 'Pending' });
    };

    const handleStatusUpdate = (id: string, status: Invoice['status']) => {
        setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status } : inv));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Invoices</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage invoices, payments, and financial records</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all shadow-md font-medium"
                >
                    <Plus size={20} className="mr-2" />
                    Create Invoice
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue (This Month)</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                        ${invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                        Updated just now
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pending Payments</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-2">
                        ${invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-yellow-600 mt-1">{invoices.filter(i => i.status === 'Pending').length} Invoices Pending</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Overdue Invoices</p>
                    <p className="text-2xl font-bold text-red-600 mt-2">
                        ${invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-red-600 mt-1">{invoices.filter(i => i.status === 'Overdue').length} Actions Needed</p>
                </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search invoices..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                            <Filter size={16} className="mr-2" />
                            Filter
                        </button>
                        <button className="flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                            <Download size={16} className="mr-2" />
                            Export
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date / Due</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {invoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">#{inv.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">{inv.patientName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{inv.serviceName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-col">
                                            <span>Issued: {inv.date}</span>
                                            <span className="text-xs text-red-500">Due: {inv.dueDate}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">${inv.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inv.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                                                inv.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                                    inv.status === 'Overdue' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {inv.status === 'Paid' && <Check size={12} className="mr-1" />}
                                            {inv.status === 'Pending' && <Clock size={12} className="mr-1" />}
                                            {inv.status === 'Overdue' && <AlertCircle size={12} className="mr-1" />}
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        <div className="flex justify-end gap-2">
                                            {inv.status === 'Pending' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(inv.id, 'Paid')}
                                                    className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded hover:bg-green-100 transition-colors"
                                                >
                                                    Mark Paid
                                                </button>
                                            )}
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <FileText size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Invoice Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Issue New Invoice</h3>
                            <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-700">
                                <XCircle size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateInvoice} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Patient Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:bg-gray-900 dark:text-white"
                                    placeholder="Enter patient name"
                                    value={newInvoice.patientName}
                                    onChange={e => setNewInvoice({ ...newInvoice, patientName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service / Reason</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:bg-gray-900 dark:text-white"
                                    placeholder="e.g. Consultation"
                                    value={newInvoice.serviceName}
                                    onChange={e => setNewInvoice({ ...newInvoice, serviceName: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:bg-gray-900 dark:text-white"
                                        value={newInvoice.dueDate}
                                        onChange={e => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount ($)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:bg-gray-900 dark:text-white"
                                        placeholder="0.00"
                                        value={newInvoice.amount}
                                        onChange={e => setNewInvoice({ ...newInvoice, amount: parseFloat(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium">Issue Invoice</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
