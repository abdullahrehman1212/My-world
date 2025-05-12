import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Moon, Sun, User, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900 backdrop-blur supports-backdrop-blur:bg-gray-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-600">
              <span className="text-lg font-bold text-white">T</span>
            </div>
            <span className="hidden text-xl font-bold text-white sm:inline-block">ToolSuite</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/tools" 
              className={`text-sm font-medium transition-colors ${
                location.pathname.startsWith('/tools') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Tools
            </Link>
            <Link 
              to="/upcoming" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/upcoming' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Upcoming
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/admin') ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search tools..."
              className="w-64 rounded-md border border-gray-700 bg-gray-800 py-2 pl-8 pr-4 text-sm text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
          
          <button
            onClick={toggleTheme}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center gap-2 rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              {user?.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <User size={20} />
              )}
              <span className="text-sm font-medium text-white">{user?.name || 'Guest'}</span>
              <ChevronDown size={16} />
            </button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Settings
                </Link>
                <div className="my-1 border-t border-gray-700"></div>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={toggleMenu}
          className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/tools"
              className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Tools
            </Link>
            <Link
              to="/upcoming"
              className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Upcoming
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center px-3 py-2">
                {user?.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <User size={24} className="text-gray-400" />
                )}
                <span className="ml-3 text-base font-medium text-white">{user?.name || 'Guest'}</span>
              </div>
              <Link
                to="/profile"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Your Profile
              </Link>
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                className="mt-1 block w-full px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;