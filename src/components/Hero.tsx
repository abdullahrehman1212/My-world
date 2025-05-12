import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import CubeCharacter from './CubeCharacter';
import { scrollToElement } from '../utils/scroll';
import { supabase } from '../lib/supabase';

const Hero: React.FC = () => {
  const [heroData, setHeroData] = useState<{
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    primaryCTA?: { text: string; url: string };
    secondaryCTA?: { text: string; url: string };
  }>({});

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'hero')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching hero data:', error);
        return;
      }

      if (data?.meta) {
        setHeroData(data.meta);
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    }
  };

  return (
    <section 
      id="home" 
      className="w-full min-h-screen flex items-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 py-12 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side content */}
          <div className="w-full md:w-1/2">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block text-blue-600 dark:text-blue-400 mb-2">
                  {heroData.title || "Hello, I'm"}
                </span>
                <span className="block text-gray-800 dark:text-white">
                  {heroData.subtitle || "Haseeb"}
                </span>
              </h1>
              <div 
                className="mt-6 prose dark:prose-invert max-w-none text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: heroData.description || "Full Stack Developer" }}
              />
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button 
                  onClick={() => scrollToElement(heroData.primaryCTA?.url?.slice(1) || 'projects')}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  {heroData.primaryCTA?.text || "View My Work"}
                </button>
                <button 
                  onClick={() => scrollToElement(heroData.secondaryCTA?.url?.slice(1) || 'contact')}
                  className="px-8 py-4 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  {heroData.secondaryCTA?.text || "Contact Me"}
                </button>
              </div>
            </div>
          </div>
          
          {/* Right side - Cube Character or Custom Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="w-full max-w-lg">
              {heroData.image ? (
                <img 
                  src={heroData.image} 
                  alt="Hero" 
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              ) : (
                <CubeCharacter />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToElement('about')}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;