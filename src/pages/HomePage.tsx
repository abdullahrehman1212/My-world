import React from 'react';
import { ArrowRight, Search, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ToolCard from '../components/ui/ToolCard';
import Button from '../components/ui/Button';
import { getPopularTools, getNewTools, tools } from '../data/tools';

const PopularTools = () => {
  const popularTools = getPopularTools();
  
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Popular Tools</h2>
          <Link 
            to="/tools" 
            className="flex items-center text-sm text-purple-500 hover:text-purple-400"
          >
            View all tools
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

const NewTools = () => {
  const newTools = getNewTools();
  
  if (newTools.length === 0) return null;
  
  return (
    <section className="py-10 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">New Tools</h2>
          <Link 
            to="/tools" 
            className="flex items-center text-sm text-purple-500 hover:text-purple-400"
          >
            View all tools
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {newTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategorySection = () => {
  const categories = [
    { id: 'image', name: 'Image Tools', icon: '🖼️', color: 'bg-blue-500' },
    { id: 'text', name: 'Text Tools', icon: '📝', color: 'bg-green-500' },
    { id: 'conversion', name: 'Conversion Tools', icon: '🔄', color: 'bg-yellow-500' },
    { id: 'generator', name: 'Generators', icon: '⚡', color: 'bg-purple-500' },
    { id: 'developer', name: 'Developer Tools', icon: '🧰', color: 'bg-red-500' },
    { id: 'calculator', name: 'Calculators', icon: '🧮', color: 'bg-teal-500' },
  ];
  
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold text-white">Browse by Category</h2>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/tools/category/${category.id}`}
              className="flex flex-col items-center rounded-lg border border-gray-800 bg-gray-900 p-4 text-center transition-all hover:border-purple-500/50 hover:shadow-md hover:shadow-purple-500/10"
            >
              <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${category.color}/20`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              <h3 className="text-sm font-medium text-white">{category.name}</h3>
              <span className="mt-1 text-xs text-gray-500">
                {tools.filter(tool => tool.category === category.id && !tool.isUpcoming).length} tools
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="absolute -top-48 -right-48 h-96 w-96 rounded-full bg-purple-900/20 blur-3xl"></div>
        <div className="absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-blue-900/20 blur-3xl"></div>
        
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Your Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Toolkit</span> for the Web
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
            Access 30+ powerful online tools to help you work smarter. Convert, compress, generate, and transform - all in one place.
          </p>
          
          <div className="mx-auto mb-12 flex max-w-md flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for tools..."
                className="w-full rounded-md border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full sm:w-auto"
              icon={<Zap size={18} />}
            >
              Explore Tools
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center">
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              <span>30+ Free Tools</span>
            </div>
            <div className="flex items-center">
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              <span>No Sign-up Required</span>
            </div>
            <div className="flex items-center">
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              <span>Privacy Focused</span>
            </div>
            <div className="flex items-center">
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              <span>Regular Updates</span>
            </div>
          </div>
        </div>
      </section>
      
      <PopularTools />
      <CategorySection />
      <NewTools />
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Ready to boost your productivity?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
            Create a free account to save your favorite tools, track your history, and access premium features.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button variant="primary" size="lg">Sign Up Free</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;