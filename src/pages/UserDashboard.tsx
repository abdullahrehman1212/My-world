import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Settings, User, Plus, History } from 'lucide-react';
import Button from '../components/ui/Button';
import ToolCard from '../components/ui/ToolCard';
import { useUser } from '../context/UserContext';
import { getToolById } from '../data/tools';

const UserDashboard: React.FC = () => {
  const { user } = useUser();
  
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">Please sign in</h1>
          <p className="mb-8 text-gray-400">You need to be signed in to access your dashboard.</p>
          <Button variant="primary" size="lg">Sign In</Button>
        </div>
      </div>
    );
  }
  
  const favoriteTools = user.favoriteTools.map(id => getToolById(id)).filter(Boolean);
  const recentTools = user.recentTools.map(id => getToolById(id)).filter(Boolean);
  
  return (
    <div className="min-h-screen bg-gray-950 pb-16">
      <div className="bg-gray-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {user.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
                  <User size={32} className="text-gray-400" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome, {user.name}</h1>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="md" 
              icon={<Settings size={16} />}
            >
              Account Settings
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Usage Stats */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-purple-600/20 text-purple-500">
              <Star size={24} />
            </div>
            <h3 className="mb-1 text-lg font-medium text-white">Favorite Tools</h3>
            <p className="text-3xl font-bold text-white">{favoriteTools.length}</p>
          </div>
          
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-600/20 text-blue-500">
              <History size={24} />
            </div>
            <h3 className="mb-1 text-lg font-medium text-white">Total Uses</h3>
            <p className="text-3xl font-bold text-white">32</p>
          </div>
          
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-green-600/20 text-green-500">
              <Clock size={24} />
            </div>
            <h3 className="mb-1 text-lg font-medium text-white">Time Saved</h3>
            <p className="text-3xl font-bold text-white">4.2 hrs</p>
          </div>
          
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-yellow-600/20 text-yellow-500">
              <Plus size={24} />
            </div>
            <h3 className="mb-1 text-lg font-medium text-white">Suggestions</h3>
            <p className="text-3xl font-bold text-white">2</p>
          </div>
        </div>
        
        {/* Favorite Tools */}
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Favorite Tools</h2>
            <Link 
              to="/tools" 
              className="text-sm text-purple-500 hover:text-purple-400"
            >
              Browse all tools
            </Link>
          </div>
          
          {favoriteTools.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favoriteTools.map(tool => tool && (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-900 p-10 text-center">
              <Star size={48} className="mb-4 text-gray-700" />
              <h3 className="mb-2 text-xl font-medium text-white">No favorite tools yet</h3>
              <p className="mb-6 text-gray-400">
                Star tools to add them to your favorites for quick access.
              </p>
              <Link to="/tools">
                <Button variant="outline" size="md">
                  Browse Tools
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Recent Activity */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            <button className="text-sm text-purple-500 hover:text-purple-400">
              View all
            </button>
          </div>
          
          {recentTools.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recentTools.map(tool => tool && (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-900 p-10 text-center">
              <Clock size={48} className="mb-4 text-gray-700" />
              <h3 className="mb-2 text-xl font-medium text-white">No recent activity</h3>
              <p className="mb-6 text-gray-400">
                Your recently used tools will appear here.
              </p>
              <Link to="/tools">
                <Button variant="outline" size="md">
                  Start Using Tools
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;