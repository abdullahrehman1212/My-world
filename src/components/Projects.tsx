import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import { supabase } from '../lib/supabase';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsData, setProjectsData] = useState<{
    title?: string;
    description?: string;
    projects?: Project[];
  }>({});
  
  useEffect(() => {
    fetchProjectsData();
  }, []);

  const fetchProjectsData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'projects')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching projects data:', error);
        return;
      }

      if (data?.meta) {
        setProjectsData(data.meta);
      }
    } catch (error) {
      console.error('Error fetching projects data:', error);
    }
  };
  
  // Get unique tags from all projects
  const allTags = ['all', ...new Set((projectsData.projects || []).flatMap(project => project.tags))];
  
  // Filter projects based on selected tag
  const filteredProjects = filter === 'all' 
    ? projectsData.projects || []
    : (projectsData.projects || []).filter(project => project.tags.includes(filter));

  return (
    <section 
      id="projects" 
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-6 transition-colors duration-300">
          {projectsData.title || 'My Projects'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12 transition-colors duration-300">
          {projectsData.description || 'Here are some of my recent projects. Each one was carefully crafted to solve real problems while delivering exceptional user experiences.'}
        </p>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${filter === tag 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                } shadow-sm`}
            >
              {tag === 'all' ? 'All' : tag}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex justify-end space-x-2">
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="View GitHub repository"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="View live project"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;