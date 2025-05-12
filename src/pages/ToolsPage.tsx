import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Sliders } from 'lucide-react';
import ToolCard from '../components/ui/ToolCard';
import Button from '../components/ui/Button';
import { tools } from '../data/tools';
import { ToolCategory } from '../types';

const ToolsPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>(
    category as ToolCategory || 'all'
  );
  
  const categories: { id: ToolCategory | 'all'; name: string }[] = [
    { id: 'all', name: 'All Tools' },
    { id: 'image', name: 'Image Tools' },
    { id: 'text', name: 'Text Tools' },
    { id: 'conversion', name: 'Conversion Tools' },
    { id: 'generator', name: 'Generators' },
    { id: 'developer', name: 'Developer Tools' },
    { id: 'calculator', name: 'Calculators' },
  ];
  
  const filteredTools = tools.filter(tool => {
    // Filter by category
    if (activeCategory !== 'all' && tool.category !== activeCategory) {
      return false;
    }
    
    // Filter out upcoming tools
    if (tool.isUpcoming) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  return (
    <div className="min-h-screen bg-gray-950 pb-16">
      <div className="bg-gray-900/50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-3xl font-bold text-white">
            {activeCategory === 'all' ? 'All Tools' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Tools`}
          </h1>
          
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            
            <Button 
              variant="outline" 
              size="md" 
              icon={<Sliders size={16} />}
              className="md:w-auto"
            >
              Filters
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-gray-800 p-4">
              <Search size={32} className="text-gray-500" />
            </div>
            <h3 className="mb-2 text-xl font-medium text-white">No tools found</h3>
            <p className="text-gray-400">
              {searchQuery 
                ? `No tools matching "${searchQuery}" were found.` 
                : 'No tools in this category yet.'}
            </p>
            {searchQuery && (
              <Button 
                variant="outline" 
                size="md" 
                className="mt-4"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsPage;