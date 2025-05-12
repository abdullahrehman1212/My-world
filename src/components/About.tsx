import React, { useEffect, useState } from 'react';
import { User, MapPin, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<{
    title?: string;
    description?: string;
    secondaryDescription?: string;
    image?: string;
    personalInfo?: {
      name?: string;
      location?: string;
      email?: string;
    };
  }>({});

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'about')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching about data:', error);
        return;
      }

      if (data?.meta) {
        setAboutData(data.meta);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  return (
    <section 
      id="about" 
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-16 transition-colors duration-300">
          {aboutData.title || 'About'} <span className="text-blue-600 dark:text-blue-400">Me</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
              Who am I?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
              {aboutData.description || "I'm a creative professional with a passion for excellence."}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-colors duration-300">
              {aboutData.secondaryDescription || "With a strong foundation in my field, I specialize in delivering exceptional results."}
            </p>
            
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full mr-4 transition-colors duration-300">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Name</p>
                  <p className="text-gray-800 dark:text-white transition-colors duration-300">
                    {aboutData.personalInfo?.name || 'Your Name'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full mr-4 transition-colors duration-300">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Location</p>
                  <p className="text-gray-800 dark:text-white transition-colors duration-300">
                    {aboutData.personalInfo?.location || 'Your Location'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full mr-4 transition-colors duration-300">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Email</p>
                  <p className="text-gray-800 dark:text-white transition-colors duration-300">
                    {aboutData.personalInfo?.email || 'your.email@example.com'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-96 sm:w-96 sm:h-[32rem] bg-blue-600 dark:bg-blue-500 rounded-lg transform rotate-6 absolute top-4 left-4"></div>
              <img 
                src={aboutData.image || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"} 
                alt="Profile" 
                className="w-72 h-96 sm:w-96 sm:h-[32rem] object-cover rounded-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;