import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  LayoutDashboard,
  Home,
  User,
  Briefcase,
  Code2,
  Mail,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Settings,
  Layout,
  Search,
} from 'lucide-react';
import useAdminStore from '../../store/adminStore';
import HeaderSection from './HeaderSection';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from './ContactSection';
import SEOSection from './SEOSection';
import PasswordChange from './PasswordChange';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { setAuthenticated } = useAdminStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setAuthenticated(false);
      navigate('/admin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'header':
        return <HeaderSection />;
      case 'hero':
        return <HeroSection />;
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'skills':
        return <SkillsSection />;
      case 'experience':
        return <ExperienceSection />;
      case 'contact':
        return <ContactSection />;
      case 'seo':
        return <SEOSection />;
      case 'password':
        return <PasswordChange />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Admin Panel
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 dark:text-gray-400"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                activeSection === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Dashboard
              </div>
            </button>

            <button
              onClick={() => setActiveSection('header')}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                activeSection === 'header'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Layout className="h-5 w-5 mr-3" />
                Header Section
              </div>
            </button>

            <button
              onClick={() => setActiveSection('hero')}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                activeSection === 'hero'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-3" />
                Hero Section
              </div>
            </button>

            <button
              onClick={() => setActiveSection('about')}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                activeSection === 'about'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <User className="h-5 w-5 mr-3" />
                About Section
              </div>
            </button>

            <button
              onClick={() => setActiveSection('projects')}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                activeSection === 'projects'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-3" />
                Projects Section
              </div>
            </button>

            <button
              onClick={() => setActiveSection('skills')}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                activeSection === 'skills'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Code2 className="h-5 w-5 mr-3" />
                Skills Section
              </div>
            </button>

            <button
              onClick={() => setActiveSection('experience')}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                activeSection === 'experience'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-3" />
                Experience Section
              </div>
            </button>

            <button
              onClick={() => setActiveSection('contact')}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                activeSection === 'contact'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                Contact Section
              </div>
            </button>

            <button
              onClick={() => setActiveSection('seo')}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                activeSection === 'seo'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Search className="h-5 w-5 mr-3" />
                SEO Settings
              </div>
            </button>

            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="flex items-center justify-between w-full p-3 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </div>
                {isSettingsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>

              {isSettingsOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <button
                    onClick={() => setActiveSection('password')}
                    className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                      activeSection === 'password'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    Change Password
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleSignOut}
              className="flex items-center w-full p-3 mt-4 rounded-lg transition-colors text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

const DashboardOverview: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Dashboard Overview
      </h2>
      {/* Add dashboard content here */}
    </div>
  );
};

export default AdminDashboard;