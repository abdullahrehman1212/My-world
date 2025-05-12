import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ExperienceMeta } from '../../types/admin';
import { Save, Loader2, AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';

const ExperienceSection: React.FC = () => {
  const [experienceData, setExperienceData] = useState<ExperienceMeta>({
    title: '',
    description: '',
    experiences: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchExperienceData();
  }, []);

  const fetchExperienceData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'experience')
        .single();

      if (error) throw error;

      if (data?.meta) {
        setExperienceData(data.meta);
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
          meta: experienceData,
          updated_at: new Date().toISOString()
        })
        .eq('section_id', 'experience');

      if (error) throw error;
      setStatus('success');
    } catch (error: any) {
      setErrorMessage(error.message);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      duration: '',
      description: ['']
    };

    setExperienceData(prev => ({
      ...prev,
      experiences: [...(prev.experiences || []), newExperience]
    }));
  };

  const removeExperience = (id: number) => {
    setExperienceData(prev => ({
      ...prev,
      experiences: prev.experiences?.filter(exp => exp.id !== id) || []
    }));
  };

  const updateExperience = (id: number, field: string, value: any) => {
    setExperienceData(prev => ({
      ...prev,
      experiences: prev.experiences?.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ) || []
    }));
  };

  const addDescriptionPoint = (experienceId: number) => {
    setExperienceData(prev => ({
      ...prev,
      experiences: prev.experiences?.map(exp =>
        exp.id === experienceId
          ? { ...exp, description: [...exp.description, ''] }
          : exp
      ) || []
    }));
  };

  const removeDescriptionPoint = (experienceId: number, index: number) => {
    setExperienceData(prev => ({
      ...prev,
      experiences: prev.experiences?.map(exp =>
        exp.id === experienceId
          ? {
              ...exp,
              description: exp.description.filter((_, i) => i !== index)
            }
          : exp
      ) || []
    }));
  };

  const updateDescriptionPoint = (experienceId: number, index: number, value: string) => {
    setExperienceData(prev => ({
      ...prev,
      experiences: prev.experiences?.map(exp =>
        exp.id === experienceId
          ? {
              ...exp,
              description: exp.description.map((point, i) =>
                i === index ? value : point
              )
            }
          : exp
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
          Experience Section Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={experienceData.title}
              onChange={(e) => setExperienceData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Work Experience"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={experienceData.description}
              onChange={(e) => setExperienceData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter section description"
            />
          </div>
        </div>
      </div>

      {/* Experience Items */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Experience Items
          </h3>
          <button
            onClick={addExperience}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Experience
          </button>
        </div>

        <div className="space-y-6">
          {experienceData.experiences?.map((experience) => (
            <div key={experience.id} className="border dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 space-y-4">
                  <input
                    type="text"
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Company Name"
                  />
                  <input
                    type="text"
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Position"
                  />
                  <input
                    type="text"
                    value={experience.duration}
                    onChange={(e) => updateExperience(experience.id, 'duration', e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Duration (e.g., Jan 2022 - Present)"
                  />
                </div>
                <button
                  onClick={() => removeExperience(experience.id)}
                  className="ml-4 p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description Points
                </label>
                {experience.description.map((point, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => updateDescriptionPoint(experience.id, index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Description point"
                    />
                    <button
                      onClick={() => removeDescriptionPoint(experience.id, index)}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addDescriptionPoint(experience.id)}
                  className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Description Point
                </button>
              </div>
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
          Experience settings saved successfully
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

export default ExperienceSection;