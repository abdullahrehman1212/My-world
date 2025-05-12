import React from 'react';
import { Link } from 'react-router-dom';
import { Star, StarOff, ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Tool } from '../../types';
import { useUser } from '../../context/UserContext';

type ToolCardProps = {
  tool: Tool;
};

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { user, addFavoriteTool, removeFavoriteTool, addRecentTool } = useUser();
  
  const isFavorite = user?.favoriteTools.includes(tool.id) || false;
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFavoriteTool(tool.id);
    } else {
      addFavoriteTool(tool.id);
    }
  };
  
  const handleToolClick = () => {
    addRecentTool(tool.id);
  };
  
  // Dynamically get the icon component with Wrench as fallback
  const IconComponent = (LucideIcons as Record<string, React.FC<{ size?: number }>>)[
    tool.icon.charAt(0).toUpperCase() + tool.icon.slice(1)
  ] || LucideIcons.Wrench;
  
  return (
    <Link
      to={tool.path}
      className="group relative flex flex-col rounded-lg border border-gray-800 bg-gray-900 p-5 transition-all duration-300 hover:border-purple-500/50 hover:shadow-md hover:shadow-purple-500/10"
      onClick={handleToolClick}
    >
      {tool.isNew && (
        <span className="absolute -top-2 -left-2 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
          New
        </span>
      )}
      
      {tool.isUpcoming && (
        <span className="absolute -top-2 -left-2 rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-white">
          Upcoming
        </span>
      )}
      
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-600/20 text-purple-500">
          <IconComponent size={24} />
        </div>
        
        {!tool.isUpcoming && user && (
          <button
            onClick={handleToggleFavorite}
            className="rounded-full p-1 text-gray-400 hover:text-yellow-400 focus:outline-none"
          >
            {isFavorite ? (
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
            ) : (
              <StarOff size={18} />
            )}
          </button>
        )}
      </div>
      
      <h3 className="mb-2 text-lg font-medium text-white">{tool.name}</h3>
      <p className="mb-4 flex-grow text-sm text-gray-400">{tool.description}</p>
      
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 capitalize">
          {tool.category}
        </span>
        
        <span className="text-purple-500 group-hover:translate-x-0.5 transition-transform duration-300">
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
};

export default ToolCard;