import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [animatedSkills, setAnimatedSkills] = useState<{[key: string]: boolean}>({});
  const [percentages, setPercentages] = useState<{[key: string]: number}>({});
  const skillsRef = useRef<HTMLDivElement>(null);
  const [skillsData, setSkillsData] = useState<{
    title?: string;
    description?: string;
    skills?: Array<{
      name: string;
      level: number;
      category: string;
    }>;
  }>({});
  
  useEffect(() => {
    fetchSkillsData();
  }, []);

  const fetchSkillsData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'skills')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching skills data:', error);
        return;
      }

      if (data?.meta) {
        setSkillsData(data.meta);
      }
    } catch (error) {
      console.error('Error fetching skills data:', error);
    }
  };
  
  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'design', label: 'Design' },
    { id: 'tools', label: 'Tools' },
    { id: 'other', label: 'Other' },
  ];
  
  const filteredSkills = activeCategory === 'all' 
    ? skillsData.skills || []
    : (skillsData.skills || []).filter(skill => skill.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset animations when category changes
            setAnimatedSkills({});
            setPercentages({});
            
            // Start animations after a small delay
            setTimeout(() => {
              const newAnimatedSkills = filteredSkills.reduce((acc, skill) => ({
                ...acc,
                [skill.name]: true
              }), {});
              setAnimatedSkills(newAnimatedSkills);

              // Animate percentages from 0 to target value
              filteredSkills.forEach(skill => {
                let startValue = 0;
                const endValue = skill.level;
                const duration = 1500; // 1.5 seconds
                const frameRate = 1000 / 60; // 60fps
                const totalFrames = duration / frameRate;
                const increment = (endValue - startValue) / totalFrames;
                
                let frame = 0;
                const timer = setInterval(() => {
                  frame++;
                  const currentValue = Math.min(Math.round(startValue + (increment * frame)), endValue);
                  setPercentages(prev => ({
                    ...prev,
                    [skill.name]: currentValue
                  }));
                  
                  if (frame >= totalFrames) {
                    clearInterval(timer);
                  }
                }, frameRate);
              });
            }, 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, [activeCategory, filteredSkills]);

  return (
    <section 
      id="skills" 
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-6 transition-colors duration-300">
          {skillsData.title || 'My Skills'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12 transition-colors duration-300">
          {skillsData.description || "I've mastered a diverse set of design tools and techniques throughout my career. Here's a glimpse of my creative expertise and proficiency levels."}
        </p>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-lg transition-all duration-200 text-sm md:text-base font-medium
                ${activeCategory === category.id 
                  ? 'bg-blue-600 text-white shadow-lg scale-105' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Skills Grid */}
        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill, index) => (
            <div 
              key={index}
              className="group bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-300">
                  {skill.name}
                </h3>
                <span 
                  className="text-blue-600 dark:text-blue-400 font-medium text-lg transition-all duration-300"
                  style={{
                    opacity: animatedSkills[skill.name] ? 1 : 0,
                    transform: animatedSkills[skill.name] ? 'translateY(0)' : 'translateY(10px)'
                  }}
                >
                  {percentages[skill.name] || 0}%
                </span>
              </div>
              
              <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors duration-300">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-out group-hover:from-blue-500 group-hover:to-blue-300"
                  style={{ 
                    width: animatedSkills[skill.name] ? `${skill.level}%` : '0%',
                    transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              <div className="mt-2 flex items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                </span>
                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full transition-colors duration-300">
                  Expert
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;