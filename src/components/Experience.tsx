import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Experience: React.FC = () => {
  const [experienceData, setExperienceData] = useState<{
    title?: string;
    description?: string;
    experiences?: Array<{
      id: number;
      company: string;
      position: string;
      duration: string;
      description: string[];
    }>;
  }>({});

  useEffect(() => {
    fetchExperienceData();
  }, []);

  const fetchExperienceData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'experience')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching experience data:', error);
        return;
      }

      if (data?.meta) {
        setExperienceData(data.meta);
      }
    } catch (error) {
      console.error('Error fetching experience data:', error);
    }
  };

  const [activeExp, setActiveExp] = useState<number | null>(null);

  // Set the first experience as active when data loads
  useEffect(() => {
    if (experienceData.experiences?.length) {
      setActiveExp(experienceData.experiences[0].id);
    }
  }, [experienceData.experiences]);

  return (
    <section 
      id="experience" 
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-6 transition-colors duration-300">
          {experienceData.title || 'Work Experience'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12 transition-colors duration-300">
          {experienceData.description || 'My professional journey has equipped me with a diverse skill set and valuable experience working across different environments and technologies.'}
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Timeline Navigation */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 transition-colors duration-300">
              {experienceData.experiences?.map((exp) => (
                <div 
                  key={exp.id}
                  onClick={() => setActiveExp(exp.id)}
                  className={`flex items-center p-4 mb-2 rounded-lg cursor-pointer transition-all duration-300
                    ${activeExp === exp.id 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 dark:border-blue-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  <div className="mr-4">
                    <div className={`p-3 rounded-full 
                      ${activeExp === exp.id 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      } transition-colors duration-300`}>
                      <Briefcase className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-medium transition-colors duration-300
                      ${activeExp === exp.id 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-800 dark:text-white'
                      }`}>
                      {exp.company}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      <Calendar className="h-3 w-3 mr-1" />
                      {exp.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Experience Details */}
          <div className="lg:w-2/3">
            {experienceData.experiences?.map((exp) => (
              <div 
                key={exp.id}
                className={`bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8 transform transition-all duration-500 ease-in-out
                  ${activeExp === exp.id 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 absolute -translate-y-4 pointer-events-none'
                  }`}
                style={{ display: activeExp === exp.id ? 'block' : 'none' }}
              >
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
                  {exp.position}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-6 transition-colors duration-300">
                  {exp.company} | {exp.duration}
                </p>
                
                <ul className="space-y-4">
                  {exp.description.map((item, index) => (
                    <li key={index} className="flex">
                      <span className="mr-2 text-blue-600 dark:text-blue-400 font-bold">•</span>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;