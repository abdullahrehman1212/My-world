import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const PasswordChange: React.FC = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const validatePasswords = () => {
    if (passwords.newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long');
      return false;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setErrorMessage('New passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMessage('');

    if (!validatePasswords()) {
      setStatus('error');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.newPassword
      });

      if (error) throw error;

      setStatus('success');
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
          <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Change Password
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="currentPassword" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="newPassword" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="confirmPassword" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {status === 'error' && (
          <div className="flex items-center text-red-500 text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            {errorMessage}
          </div>
        )}

        {status === 'success' && (
          <div className="flex items-center text-green-500 text-sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Password updated successfully
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Updating...
            </>
          ) : (
            'Update Password'
          )}
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;