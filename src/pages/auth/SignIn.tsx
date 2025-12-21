import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth';

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, login } = useAuth();

  if (user) {
    if (user.role === UserRole.CLINIC_ADMIN) {
      return <Navigate to="/clinic-dashboard" replace />;
    }
    if (user.role === UserRole.PHARMACY) {
      return <Navigate to="/pharmacy/products" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="mb-8">
              <img
                src="/assets/logo.png"
                alt="MediLink Logo"
                className="h-16 w-auto"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-gray-600">
              Please enter your details to sign in.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-secondary">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary hover:text-secondary flex items-center justify-center gap-1 mt-2">
                Request Access <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <Link to="/status" className="text-sm text-gray-500 hover:text-gray-700">
                Check Application Status
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Brand */}
      <div className="hidden lg:block relative w-0 flex-1 bg-primary">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary to-secondary opacity-90"></div>
        <img
          className="absolute inset-0 h-full w-full object-cover mix-blend-overlay"
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Medical Team"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white z-10">
          <h2 className="text-4xl font-bold mb-6">Modern Healthcare Management</h2>
          <p className="text-lg text-blue-100 max-w-lg leading-relaxed">
            Streamline your clinic's operations, manage patient records securely, and enhance care delivery with our comprehensive dashboard.
          </p>
          <div className="mt-8 flex gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-600 bg-gray-200" />
              ))}
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold">2,000+</span>
              <span className="text-xs text-blue-200">Medical Professionals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};