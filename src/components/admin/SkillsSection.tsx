import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2, AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { SkillsMeta } from '../../types/admin';

const SkillsSection: React.FC = () => {
  const [skillsData, setSkillsData] = useState<SkillsMeta>({
    title: '',
    description: '',
    skills: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchSkillsData();
  }, []);

  const fetchSkillsData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'skills')
        .single();

      if (error) throw error;

      if (data?.meta) {
        setSkillsData(data.meta);
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
          meta: skillsData,
          updated_at: new Date().toISOString()
        })
        .eq('section_id', 'skills');

      if (error) throw error;
      setStatus('success');
    } catch (error: any) {
      setErrorMessage(error.message);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    const newSkill = {
      name: '',
      level: 0,
      category: 'design'
    };

    setSkillsData(prev => ({
      ...prev,
      skills: [...(prev.skills || []), newSkill]
    }));
  };

  const removeSkill = (index: number) => {
    setSkillsData(prev => ({
      ...prev,
      skills: prev.skills?.filter((_, i) => i !== index) || []
    }));
  };

  const updateSkill = (index: number, field: string, value: any) => {
    setSkillsData(prev => ({
      ...prev,
      skills: prev.skills?.map((skill, i) =>
        i === index ? { ...skill, [field]: field === 'level' ? parseInt(value) || 0 : value } : skill
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
          Skills Section Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={skillsData.title}
              onChange={(e) => setSkillsData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="My Skills"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={skillsData.description}
              onChange={(e) => setSkillsData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter section description"
            />
          </div>
        </div>
      </div>

      {/* Skills List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Skills
          </h3>
          <button
            onClick={addSkill}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Skill
          </button>
        </div>

        <div className="space-y-4">
          {skillsData.skills?.map((skill, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border dark:border-gray-700 rounded-lg">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, 'name', e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Skill Name"
                />
                
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => updateSkill(index, 'level', e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Skill Level (0-100)"
                />
                
                <select
                  value={skill.category}
                  onChange={(e) => updateSkill(index, 'category', e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="design">Design</option>
                  <option value="tools">Tools</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <button
                onClick={() => removeSkill(index)}
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
          Skills settings saved successfully
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

export default SkillsSection;