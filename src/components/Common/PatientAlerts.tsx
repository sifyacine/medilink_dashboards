import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export const PatientAlerts: React.FC = () => {
    const alerts = [
        { id: 1, type: 'critical', message: 'Abnormal blood pressure - John Doe', time: '10 min ago' },
        { id: 2, type: 'warning', message: 'Missed appointment - Sarah Smith', time: '1 hour ago' },
        { id: 3, type: 'info', message: 'Lab results available - Mike Johnson', time: '2 hours ago' },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'critical': return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'warning': return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'info': return <CheckCircle className="w-5 h-5 text-blue-500" />;
            default: return null;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Alerts</h3>
            <div className="space-y-4">
                {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                        {getIcon(alert.type)}
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
