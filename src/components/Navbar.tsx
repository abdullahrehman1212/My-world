import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { scrollToElement } from '../utils/scroll';
import { supabase } from '../lib/supabase';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [headerData, setHeaderData] = useState<{
    logo?: string;
    navigation?: { items: Array<{ label: string; url: string }> };
  }>({
    logo: '',
    navigation: { items: [] }
  });

  useEffect(() => {
    fetchHeaderData();
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchHeaderData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'header')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching header data:', error);
        return;
      }

      if (data?.meta) {
        setHeaderData(data.meta);
      }
    } catch (error) {
      console.error('Error fetching header data:', error);
    }
  };

  const handleNavigation = (url: string) => {
    setIsOpen(false);
    if (url.startsWith('#')) {
      scrollToElement(url.slice(1));
    } else {
      window.location.href = url;
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#home" 
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('#home');
          }}
        >
          {headerData.logo ? (
            <img src={headerData.logo} alt="Logo" className="h-8" />
          ) : (
            'Logo'
          )}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-8">
            {headerData.navigation?.items?.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.url)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 capitalize transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {headerData.navigation?.items?.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.url)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 capitalize py-2 transition-colors duration-200 text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;