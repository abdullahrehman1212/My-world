import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden transform transition-all animate-scaleIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 z-10 group shadow-lg hover:scale-110"
          aria-label="Close modal"
        >
          <X className="h-6 w-6 transform transition-transform duration-200 group-hover:rotate-90" />
        </button>

        {/* Project image */}
        <div className="relative h-64 md:h-96">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          
          {/* Title overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
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

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {project.description}
            </p>

            {/* Project details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 dark:text-blue-400">01</span>
                  </span>
                  Project Overview
                </h4>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                    Developed comprehensive design strategy
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                    Created user-centered design solutions
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                    Implemented responsive design principles
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                    Conducted user testing and iterations
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 dark:text-blue-400">02</span>
                  </span>
                  Tools Used
                </h4>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  {project.tags.map((tool, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {project.link && (
              <div className="mt-8 flex justify-center">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg group"
                >
                  View Project
                  <svg
                    className="ml-2 h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;