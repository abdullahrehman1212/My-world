import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface MenuItem {
  label: string;
  url: string;
}

interface Menu {
  title: string;
  items: MenuItem[];
}

interface FooterData {
  menus: Menu[];
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  copyright: string;
}

const defaultFooterData: FooterData = {
  menus: [],
  socialLinks: [],
  copyright: '© 2025 All rights reserved'
};

const socialPlatforms = [
  'Facebook',
  'Twitter',
  'Instagram',
  'LinkedIn',
  'GitHub'
];

const FooterSection: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData>(defaultFooterData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'footer')
        .single();

      if (error) throw error;

      if (data?.meta) {
        setFooterData({
          menus: Array.isArray(data.meta.menus) ? data.meta.menus : [],
          socialLinks: Array.isArray(data.meta.socialLinks) ? data.meta.socialLinks : [],
          copyright: data.meta.copyright || defaultFooterData.copyright,
        });
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
          meta: footerData,
          updated_at: new Date().toISOString()
        })
        .eq('section_id', 'footer');

      if (error) throw error;
      setStatus('success');
    } catch (error: any) {
      setErrorMessage(error.message);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const addMenu = () => {
    setFooterData(prev => ({
      ...prev,
      menus: [...prev.menus, { title: 'New Menu', items: [] }]
    }));
  };

  const removeMenu = (index: number) => {
    setFooterData(prev => ({
      ...prev,
      menus: prev.menus.filter((_, i) => i !== index)
    }));
  };

  const updateMenu = (index: number, field: keyof Menu, value: any) => {
    setFooterData(prev => ({
      ...prev,
      menus: prev.menus.map((menu, i) => 
        i === index ? { ...menu, [field]: value } : menu
      )
    }));
  };

  const addMenuItem = (menuIndex: number) => {
    setFooterData(prev => ({
      ...prev,
      menus: prev.menus.map((menu, i) => 
        i === menuIndex 
          ? { ...menu, items: [...menu.items, { label: 'New Item', url: '#' }] }
          : menu
      )
    }));
  };

  const removeMenuItem = (menuIndex: number, itemIndex: number) => {
    setFooterData(prev => ({
      ...prev,
      menus: prev.menus.map((menu, i) => 
        i === menuIndex 
          ? { ...menu, items: menu.items.filter((_, idx) => idx !== itemIndex) }
          : menu
      )
    }));
  };

  const updateMenuItem = (menuIndex: number, itemIndex: number, field: keyof MenuItem, value: string) => {
    setFooterData(prev => ({
      ...prev,
      menus: prev.menus.map((menu, i) => 
        i === menuIndex 
          ? {
              ...menu,
              items: menu.items.map((item, idx) => 
                idx === itemIndex ? { ...item, [field]: value } : item
              )
            }
          : menu
      )
    }));
  };

  const addSocialLink = () => {
    setFooterData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '' }]
    }));
  };

  const removeSocialLink = (index: number) => {
    setFooterData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    setFooterData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
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
      {/* Footer Menus */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Footer Menus
        </h3>
        <div className="space-y-6">
          {footerData.menus.map((menu, menuIndex) => (
            <div key={menuIndex} className="border dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={menu.title}
                  onChange={(e) => updateMenu(menuIndex, 'title', e.target.value)}
                  className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white mr-2"
                  placeholder="Menu Title"
                />
                <button
                  onClick={() => removeMenu(menuIndex)}
                  className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                {menu.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateMenuItem(menuIndex, itemIndex, 'label', e.target.value)}
                      className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Item Label"
                    />
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => updateMenuItem(menuIndex, itemIndex, 'url', e.target.value)}
                      className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Item URL"
                    />
                    <button
                      onClick={() => removeMenuItem(menuIndex, itemIndex)}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addMenuItem(menuIndex)}
                  className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Menu Item
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addMenu}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Menu
          </button>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Social Links
        </h3>
        <div className="space-y-4">
          {footerData.socialLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-4">
              <select
                value={link.platform}
                onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Platform</option>
                {socialPlatforms.map((platform) => (
                  <option key={platform} value={platform.toLowerCase()}>{platform}</option>
                ))}
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
          <button
            onClick={addSocialLink}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Social Link
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Copyright Text
        </h3>
        <input
          type="text"
          value={footerData.copyright}
          onChange={(e) => setFooterData(prev => ({ ...prev, copyright: e.target.value }))}
          placeholder="© 2025 All rights reserved"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
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
          Footer settings saved successfully
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

export default FooterSection;