import React, { useState } from 'react';
import { PageHeader } from '../components/Common/PageHeader';
import { DataTable } from '../components/Common/DataTable';
import { Modal } from '../components/Common/Modal';
import { HelpCircle, Tag } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  createdDate: string;
  updatedDate: string;
  views: number;
}

export const FAQs: React.FC = () => {
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment by logging into your patient portal, selecting your preferred doctor and available time slot, or by calling our reception desk directly.',
      category: 'Appointments',
      isActive: true,
      createdDate: '2024-01-15',
      updatedDate: '2024-01-15',
      views: 1250,
    },
    {
      id: '2',
      question: 'What should I bring to my first appointment?',
      answer: 'Please bring a valid ID, insurance card, list of current medications, and any relevant medical records or test results from previous doctors.',
      category: 'General',
      isActive: true,
      createdDate: '2024-01-20',
      updatedDate: '2024-02-10',
      views: 890,
    },
    {
      id: '3',
      question: 'How can I access my medical records?',
      answer: 'You can access your medical records through our patient portal 24/7. If you need printed copies, please contact our medical records department.',
      category: 'Medical Records',
      isActive: true,
      createdDate: '2024-02-01',
      updatedDate: '2024-02-01',
      views: 567,
    },
    {
      id: '4',
      question: 'What insurance plans do you accept?',
      answer: 'We accept most major insurance plans. Please contact our billing department to verify if your specific plan is accepted.',
      category: 'Billing',
      isActive: true,
      createdDate: '2024-02-05',
      updatedDate: '2024-02-05',
      views: 743,
    },
    {
      id: '5',
      question: 'How do I request a prescription refill?',
      answer: 'You can request prescription refills through our patient portal or by calling our pharmacy department during business hours.',
      category: 'Prescriptions',
      isActive: false,
      createdDate: '2024-01-10',
      updatedDate: '2024-01-10',
      views: 234,
    },
  ];

  const columns = [
    { key: 'question', label: 'Question', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'views', label: 'Views', sortable: true },
    { key: 'updatedDate', label: 'Last Updated', sortable: true },
    { 
      key: 'isActive', 
      label: 'Status', 
      sortable: true,
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
  ];

  const handleView = (faq: FAQ) => {
    setSelectedFAQ(faq);
    setShowModal(true);
  };

  const handleEdit = (faq: FAQ) => {
    console.log('Edit FAQ:', faq);
  };

  const handleDelete = (faq: FAQ) => {
    console.log('Delete FAQ:', faq);
  };

  const handleAddFAQ = () => {
    setShowAddModal(true);
  };

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  const activeFAQs = faqs.filter(faq => faq.isActive);
  const totalViews = faqs.reduce((sum, faq) => sum + faq.views, 0);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="FAQs Management" 
        description="Manage frequently asked questions for the platform"
        action={{ label: 'Add New FAQ', onClick: handleAddFAQ }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total FAQs</p>
              <p className="text-2xl font-bold text-gray-900">{faqs.length}</p>
            </div>
            <HelpCircle size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active FAQs</p>
              <p className="text-2xl font-bold text-green-600">{activeFAQs.length}</p>
            </div>
            <div className="text-green-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-purple-600">{categories.length}</p>
            </div>
            <Tag size={24} className="text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-orange-600">{totalViews.toLocaleString()}</p>
            </div>
            <div className="text-orange-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            const categoryFAQs = faqs.filter(faq => faq.category === category);
            const categoryViews = categoryFAQs.reduce((sum, faq) => sum + faq.views, 0);
            
            return (
              <div key={category} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">{category}</h4>
                <p className="text-sm text-gray-600">{categoryFAQs.length} FAQs</p>
                <p className="text-sm text-gray-600">{categoryViews} views</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQs Table */}
      <DataTable
        data={faqs}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search FAQs..."
      />

      {/* FAQ Details Modal */}
      {selectedFAQ && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`FAQ Details`}
          size="lg"
        >
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Question</h4>
              <p className="text-gray-700">{selectedFAQ.question}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Answer</h4>
              <p className="text-gray-700 leading-relaxed">{selectedFAQ.answer}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">
                  {selectedFAQ.category}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Status</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedFAQ.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedFAQ.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Views</h4>
                <p className="text-2xl font-bold text-blue-600">{selectedFAQ.views}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Created</h4>
                <p className="text-sm text-gray-600">{selectedFAQ.createdDate}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Last Updated</h4>
                <p className="text-sm text-gray-600">{selectedFAQ.updatedDate}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add FAQ Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New FAQ"
        size="lg"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter the frequently asked question"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer
            </label>
            <textarea
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter the detailed answer"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                <option>General</option>
                <option>Appointments</option>
                <option>Billing</option>
                <option>Medical Records</option>
                <option>Prescriptions</option>
                <option>Technical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              Add FAQ
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};