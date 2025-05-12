import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2, AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { ProjectsMeta } from '../../types/admin';

const ProjectsSection: React.FC = () => {
  const [projectsData, setProjectsData] = useState<ProjectsMeta>({
    title: '',
    description: '',
    projects: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProjectsData();
  }, []);

  const fetchProjectsData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'projects')
        .single();

      if (error) throw error;

      if (data?.meta) {
        setProjectsData(data.meta);
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
          meta: projectsData,
          updated_at: new Date().toISOString()
        })
        .eq('section_id', 'projects');

      if (error) throw error;
      setStatus('success');
    } catch (error: any) {
      setErrorMessage(error.message);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: '',
      description: '',
      image: '',
      tags: [],
      link: '',
      github: ''
    };

    setProjectsData(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newProject]
    }));
  };

  const removeProject = (id: number) => {
    setProjectsData(prev => ({
      ...prev,
      projects: prev.projects?.filter(project => project.id !== id) || []
    }));
  };

  const updateProject = (id: number, field: string, value: any) => {
    setProjectsData(prev => ({
      ...prev,
      projects: prev.projects?.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      ) || []
    }));
  };

  const updateProjectTags = (id: number, tags: string) => {
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    updateProject(id, 'tags', tagArray);
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
          Projects Section Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={projectsData.title}
              onChange={(e) => setProjectsData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="My Projects"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={projectsData.description}
              onChange={(e) => setProjectsData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter section description"
            />
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Projects
          </h3>
          <button
            onClick={addProject}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Project
          </button>
        </div>

        <div className="space-y-6">
          {projectsData.projects?.map((project) => (
            <div key={project.id} className="border dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 space-y-4">
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Project Title"
                  />
                  
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Project Description"
                  />
                  
                  <input
                    type="text"
                    value={project.image}
                    onChange={(e) => updateProject(project.id, 'image', e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Image URL"
                  />
                  
                  <input
                    type="text"
                    value={project.tags.join(', ')}
                    onChange={(e) => updateProjectTags(project.id, e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Tags (comma-separated)"
                  />
                  
                  <input
                    type="text"
                    value={project.link}
                    onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Live Demo URL"
                  />
                  
                  <input
                    type="text"
                    value={project.github}
                    onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="GitHub Repository URL"
                  />
                </div>
                <button
                  onClick={() => removeProject(project.id)}
                  className="ml-4 p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 className="h-5 w-5" />
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
          Projects settings saved successfully
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

export default ProjectsSection;