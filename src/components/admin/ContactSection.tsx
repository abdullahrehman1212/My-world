import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2, AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { ContactMeta } from '../../types/admin';

const ContactSection: React.FC = () => {
  const [contactData, setContactData] = useState<ContactMeta>({
    title: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    socialLinks: [],
    formSettings: {
      emailNotifications: true,
      autoResponse: true,
      responseMessage: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'contact')
        .single();

      if (error) throw error;

      if (data?.meta) {
        setContactData(data.meta);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('admin_sections')
        .update({
          meta: contactData,
          updated_at: new Date().toISOString()
        })
        .eq('section_id', 'contact');

      if (error) throw error;
      setStatus('success');
    } catch (error: any) {
      setErrorMessage(error.message);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const addSocialLink = () => {
    setContactData(prev => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), { platform: '', url: '' }]
    }));
  };

  const removeSocialLink = (index: number) => {
    setContactData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks?.filter((_, i) => i !== index) || []
    }));
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    setContactData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks?.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      ) || []
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Contact Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={contactData.title}
              onChange={(e) => setContactData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Get In Touch"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={contactData.description}
              onChange={(e) => setContactData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter section description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={contactData.email}
              onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="contact@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={contactData.phone}
              onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="+1 (234) 567-890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Address
            </label>
            <textarea
              value={contactData.address}
              onChange={(e) => setContactData(prev => ({ ...prev, address: e.target.value }))}
              rows={2}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your address"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Social Links
          </h3>
          <button
            onClick={addSocialLink}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Social Link
          </button>
        </div>

        <div className="space-y-4">
          {contactData.socialLinks?.map((link, index) => (
            <div key={index} className="flex items-center gap-4">
              <select
                value={link.platform}
                onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Platform</option>
                <option value="twitter">Twitter</option>
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
              </select>
              <input
                type="text"
                value={link.url}
                onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                placeholder="URL"
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => removeSocialLink(index)}
                className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Form Settings
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="emailNotifications"
              checked={contactData.formSettings?.emailNotifications}
              onChange={(e) => setContactData(prev => ({
                ...prev,
                formSettings: {
                  ...prev.formSettings!,
                  emailNotifications: e.target.checked
                }
              }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="emailNotifications" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Enable Email Notifications
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoResponse"
              checked={contactData.formSettings?.autoResponse}
              onChange={(e) => setContactData(prev => ({
                ...prev,
                formSettings: {
                  ...prev.formSettings!,
                  autoResponse: e.target.checked
                }
              }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="autoResponse" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Enable Auto Response
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Auto Response Message
            </label>
            <textarea
              value={contactData.formSettings?.responseMessage}
              onChange={(e) => setContactData(prev => ({
                ...prev,
                formSettings: {
                  ...prev.formSettings!,
                  responseMessage: e.target.value
                }
              }))}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter auto response message"
            />
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {status === 'error' && (
        <div className="flex items-center text-red-500 text-sm">
          <AlertCircle className="h-4 w-4 mr-2" />
          {errorMessage}
        </div>
      )}

      {status === 'success' && (
        <div className="flex items-center text-green-500 text-sm">
          <CheckCircle className="h-4 w-4 mr-2" />
          Contact settings saved successfully
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {saving ? (
          <>
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-5 w-5 mr-2" />
            Save Changes
          </>
        )}
      </button>
    </div>
  );
};

export default ContactSection;