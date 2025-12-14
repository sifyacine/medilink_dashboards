import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Activity, Search, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export const RegistrationStatus: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'error'>('idle');
    const [result, setResult] = useState<any>(null); // Mock result type

    // Check if redirected from new submission
    useEffect(() => {
        if (searchParams.get('new') === 'true') {
            setStatus('found');
            setResult({
                status: 'pending',
                email: 'your-email@example.com', // In real app, pass this via state or context
                submittedAt: new Date().toISOString(),
                estimatedReview: '48 hours'
            });
        }
    }, [searchParams]);

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Mock API call
        setTimeout(() => {
            if (email.includes('error')) {
                setStatus('error');
            } else {
                setStatus('found');
                setResult({
                    status: email.includes('approve') ? 'approved' : email.includes('reject') ? 'rejected' : 'pending',
                    email: email,
                    submittedAt: '2024-12-10',
                    updatedAt: '2024-12-12',
                    rejectionReason: email.includes('reject') ? 'License verification failed.' : undefined
                });
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center items-center gap-2 mb-6">
                    <div className="bg-primary p-2 rounded-lg">
                        <Activity className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">MediLink</span>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Application Status
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Check the status of your professional access request
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100">

                    {status !== 'found' && (
                        <form onSubmit={handleCheck} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address used for registration
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 border"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 transition-colors"
                            >
                                {status === 'loading' ? 'Checking...' : 'Check Status'}
                            </button>
                        </form>
                    )}

                    {status === 'found' && result && (
                        <div className="animate-in fade-in zoom-in duration-300">
                            <div className={`rounded-xl p-6 text-center ${result.status === 'approved' ? 'bg-green-50 border border-green-100' :
                                result.status === 'rejected' ? 'bg-red-50 border border-red-100' :
                                    'bg-yellow-50 border border-yellow-100'
                                }`}>
                                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${result.status === 'approved' ? 'bg-green-100 text-green-600' :
                                    result.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                        'bg-yellow-100 text-yellow-600'
                                    }`}>
                                    {result.status === 'approved' ? <CheckCircle size={32} /> :
                                        result.status === 'rejected' ? <XCircle size={32} /> :
                                            <Clock size={32} />}
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-1 capitalize">
                                    Application {result.status}
                                </h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    {result.status === 'pending' && 'Your application is currently under review by our administrators.'}
                                    {result.status === 'approved' && 'Congratulations! Your account has been activated.'}
                                    {result.status === 'rejected' && 'Unfortunately, your application could not be verified.'}
                                </p>

                                {result.rejectionReason && (
                                    <div className="bg-white/50 p-3 rounded-lg text-sm text-red-700 mb-6">
                                        Reason: {result.rejectionReason}
                                    </div>
                                )}

                                <div className="space-y-3">
                                    {result.status === 'approved' ? (
                                        <Link to="/login" className="block w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                                            Proceed to Login
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="block w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                                        >
                                            Check Another Email
                                        </button>
                                    )}
                                </div>
                            </div>
                            {result.status === 'pending' && (
                                <div className="mt-6 border-t border-gray-200 pt-4 text-center">
                                    <p className="text-xs text-gray-500">Submitted on {new Date(result.submittedAt).toLocaleDateString()}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="text-center py-4">
                            <p className="text-red-600 mb-4">No application found for this email.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="text-primary hover:text-secondary font-medium"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                </div>
                <div className="mt-6 text-center">
                    <Link to="/login" className="font-medium text-primary hover:text-secondary flex items-center justify-center gap-2">
                        <ArrowLeft size={16} /> Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};
