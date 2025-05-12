import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2, AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';

interface HeaderData {
  logo?: string;
  navigation?: {
    items: Array<{ label: string; url: string }>;
  };
}

const HeaderSection: React.FC = () => {
  const [headerData, setHeaderData] = useState<HeaderData>({
    logo: '',
    navigation: {
      items: []
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchHeaderData();
  }, []);

  const fetchHeaderData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'header')
        .single();

      if (error) throw error;

      if (data?.meta) {
        setHeaderData(data.meta);
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
          meta: headerData,
          updated_at: new Date().toISOString()
        })
        .eq('section_id', 'header');

      if (error) throw error;
      setStatus('success');
    } catch (error: any) {
      setErrorMessage(error.message);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const addNavigationItem = () => {
    setHeaderData(prev => ({
      ...prev,
      navigation: {
        items: [
          ...(prev.navigation?.items || []),
          { label: '', url: '' }
        ]
      }
    }));
  };

  const removeNavigationItem = (index: number) => {
    setHeaderData(prev => ({
      ...prev,
      navigation: {
        items: prev.navigation?.items.filter((_, i) => i !== index) || []
      }
    }));
  };

  const updateNavigationItem = (index: number, field: 'label' | 'url', value: string) => {
    setHeaderData(prev => ({
      ...prev,
      navigation: {
        items: prev.navigation?.items.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ) || []
      }
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
      {/* Logo Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Logo Settings
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Logo URL
          </label>
          <input
            type="text"
            value={headerData.logo}
            onChange={(e) => setHeaderData(prev => ({ ...prev, logo: e.target.value }))}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="https://example.com/logo.png"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Navigation Items
          </h3>
          <button
            onClick={addNavigationItem}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Navigation Item
          </button>
        </div>

        <div className="space-y-4">
          {headerData.navigation?.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateNavigationItem(index, 'label', e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Navigation Label"
                />
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => updateNavigationItem(index, 'url', e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="URL (e.g., #about)"
                />
              </div>
              <button
                onClick={() => removeNavigationItem(index)}
                className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
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
          Header settings saved successfully
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

export default HeaderSection;