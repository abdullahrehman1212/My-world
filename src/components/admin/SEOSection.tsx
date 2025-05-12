import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2, AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';

interface SEOData {
  globalMeta?: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    twitterHandle: string;
  };
  sections?: {
    [key: string]: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
}

const defaultSEOData: SEOData = {
  globalMeta: {
    title: '',
    description: '',
    keywords: [],
    ogImage: '',
    twitterHandle: ''
  },
  sections: {
    home: { title: '', description: '', keywords: [] },
    about: { title: '', description: '', keywords: [] },
    projects: { title: '', description: '', keywords: [] },
    skills: { title: '', description: '', keywords: [] },
    experience: { title: '', description: '', keywords: [] },
    contact: { title: '', description: '', keywords: [] }
  }
};

const SEOSection: React.FC = () => {
  const [seoData, setSeoData] = useState<SEOData>(defaultSEOData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'global' | 'sections'>('global');

  useEffect(() => {
    fetchSEOData();
  }, []);

  const fetchSEOData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'seo')
        .maybeSingle();

      if (error) throw error;

      if (data?.meta) {
        setSeoData(data.meta);
      } else {
        // If no data exists, create the initial SEO section
        const { error: insertError } = await supabase
          .from('admin_sections')
          .insert({
            section_id: 'seo',
            meta: defaultSEOData,
            title: 'SEO Settings',
            content: null
          });

        if (insertError) throw insertError;
        setSeoData(defaultSEOData);
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
          meta: seoData,
          updated_at: new Date().toISOString()
        })
        .eq('section_id', 'seo');

      if (error) throw error;
      setStatus('success');
    } catch (error: any) {
      setErrorMessage(error.message);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const updateGlobalMeta = (field: keyof typeof seoData.globalMeta, value: string) => {
    setSeoData(prev => ({
      ...prev,
      globalMeta: {
        ...prev.globalMeta!,
        [field]: field === 'keywords' ? value.split(',').map(k => k.trim()) : value
      }
    }));
  };

  const updateSectionMeta = (section: string, field: string, value: string) => {
    setSeoData(prev => ({
      ...prev,
      sections: {
        ...prev.sections!,
        [section]: {
          ...prev.sections![section],
          [field]: field === 'keywords' ? value.split(',').map(k => k.trim()) : value
        }
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
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('global')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'global'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Global SEO
        </button>
        <button
          onClick={() => setActiveTab('sections')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'sections'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Section-specific SEO
        </button>
      </div>

      {activeTab === 'global' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
            Global SEO Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Site Title
              </label>
              <input
                type="text"
                value={seoData.globalMeta?.title}
                onChange={(e) => updateGlobalMeta('title', e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Your Site Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meta Description
              </label>
              <textarea
                value={seoData.globalMeta?.description}
                onChange={(e) => updateGlobalMeta('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter a site-wide meta description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Keywords
              </label>
              <input
                type="text"
                value={seoData.globalMeta?.keywords.join(', ')}
                onChange={(e) => updateGlobalMeta('keywords', e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Open Graph Image URL
              </label>
              <input
                type="text"
                value={seoData.globalMeta?.ogImage}
                onChange={(e) => updateGlobalMeta('ogImage', e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://example.com/og-image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Twitter Handle
              </label>
              <input
                type="text"
                value={seoData.globalMeta?.twitterHandle}
                onChange={(e) => updateGlobalMeta('twitterHandle', e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="@yourtwitterhandle"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sections' && (
        <div className="space-y-6">
          {Object.entries(seoData.sections || {}).map(([section, meta]) => (
            <div key={section} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 capitalize">
                {section} Section SEO
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={meta.title}
                    onChange={(e) => updateSectionMeta(section, 'title', e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder={`${section.charAt(0).toUpperCase() + section.slice(1)} Page Title`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={meta.description}
                    onChange={(e) => updateSectionMeta(section, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder={`Enter meta description for ${section} section`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={meta.keywords.join(', ')}
                    onChange={(e) => updateSectionMeta(section, 'keywords', e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
          SEO settings saved successfully
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

export default SEOSection;