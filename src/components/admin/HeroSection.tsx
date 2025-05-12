import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { HeroMeta } from '../../types/admin';

const HeroSection: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroMeta>({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    primaryCTA: {
      text: '',
      url: ''
    },
    secondaryCTA: {
      text: '',
      url: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'hero')
        .single();

      if (error) throw error;

      if (data?.meta) {
        setHeroData(data.meta);
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
          meta: heroData,
          updated_at: new Date().toISOString()
        })
        .eq('section_id', 'hero');

      if (error) throw error;
      setStatus('success');
    } catch (error: any) {
      setErrorMessage(error.message);
      setStatus('error');
    } finally {
      setSaving(false);
    }
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
          Hero Section Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={heroData.title}
              onChange={(e) => setHeroData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Hello, I'm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              value={heroData.subtitle}
              onChange={(e) => setHeroData(prev => ({ ...prev, subtitle: e.target.value }))}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={heroData.description}
              onChange={(e) => setHeroData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter a brief description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={heroData.image}
              onChange={(e) => setHeroData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </div>

      {/* Call to Action Buttons */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Call to Action Buttons
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
              Primary CTA
            </h4>
            <div className="space-y-3">
              <input
                type="text"
                value={heroData.primaryCTA?.text}
                onChange={(e) => setHeroData(prev => ({
                  ...prev,
                  primaryCTA: { ...prev.primaryCTA!, text: e.target.value }
                }))}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Button Text"
              />
              <input
                type="text"
                value={heroData.primaryCTA?.url}
                onChange={(e) => setHeroData(prev => ({
                  ...prev,
                  primaryCTA: { ...prev.primaryCTA!, url: e.target.value }
                }))}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Button URL"
              />
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
              Secondary CTA
            </h4>
            <div className="space-y-3">
              <input
                type="text"
                value={heroData.secondaryCTA?.text}
                onChange={(e) => setHeroData(prev => ({
                  ...prev,
                  secondaryCTA: { ...prev.secondaryCTA!, text: e.target.value }
                }))}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Button Text"
              />
              <input
                type="text"
                value={heroData.secondaryCTA?.url}
                onChange={(e) => setHeroData(prev => ({
                  ...prev,
                  secondaryCTA: { ...prev.secondaryCTA!, url: e.target.value }
                }))}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Button URL"
              />
            </div>
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
          Hero settings saved successfully
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

export default HeroSection;