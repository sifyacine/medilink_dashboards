import React from 'react';
import { UserPlus, Calendar, FileText, MessageSquare } from 'lucide-react';

export const QuickActions: React.FC = () => {
    const actions = [
        { name: 'New Patient', icon: UserPlus, color: 'bg-blue-500' },
        { name: 'Schedule', icon: Calendar, color: 'bg-purple-500' },
        { name: 'Prescribe', icon: FileText, color: 'bg-green-500' },
        { name: 'Message', icon: MessageSquare, color: 'bg-orange-500' },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
                {actions.map((action) => (
                    <button
                        key={action.name}
                        className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-gray-100 dark:border-gray-700"
                    >
                        <div className={`p-3 rounded-full ${action.color} text-white mb-2`}>
                            <action.icon size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
