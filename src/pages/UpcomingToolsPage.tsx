import React from 'react';
import { Bell, Star, CalendarClock } from 'lucide-react';
import ToolCard from '../components/ui/ToolCard';
import Button from '../components/ui/Button';
import { getUpcomingTools } from '../data/tools';

const UpcomingToolsPage: React.FC = () => {
  const upcomingTools = getUpcomingTools();
  
  return (
    <div className="min-h-screen bg-gray-950 pb-16">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/20 to-transparent"></div>
        <div className="absolute -top-48 -right-48 h-96 w-96 rounded-full bg-yellow-900/20 blur-3xl"></div>
        
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-600/20">
            <CalendarClock className="h-8 w-8 text-yellow-500" />
          </div>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Coming Soon: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">Upcoming Tools</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
            We're constantly working on new tools to help you be more productive. Here's a sneak peek of what's coming next.
          </p>
          
          <div className="mx-auto flex max-w-md flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto"
              icon={<Bell size={18} />}
            >
              Get Notified
            </Button>
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700"
              icon={<Star size={18} />}
            >
              Vote for Features
            </Button>
          </div>
        </div>
      </section>
      
      {/* Upcoming Tools */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold text-white">Tools in Development</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {upcomingTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold text-white text-center">Development Timeline</h2>
          
          <div className="mx-auto max-w-3xl">
            <div className="relative border-l border-gray-700 pl-10 pb-10">
              <div className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-600 text-white">
                <span className="text-xs font-bold">1</span>
              </div>
              <h3 className="mb-2 text-xl font-medium text-white">Q1 2025</h3>
              <p className="text-gray-400">
                We're focusing on AI-powered tools like the Text Summarizer and Image Enhancement tools.
              </p>
            </div>
            
            <div className="relative border-l border-gray-700 pl-10 pb-10">
              <div className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                <span className="text-xs font-bold">2</span>
              </div>
              <h3 className="mb-2 text-xl font-medium text-white">Q2 2025</h3>
              <p className="text-gray-400">
                Developer tools expansion with Code Beautifier and additional features for existing tools.
              </p>
            </div>
            
            <div className="relative border-l border-gray-700 pl-10">
              <div className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                <span className="text-xs font-bold">3</span>
              </div>
              <h3 className="mb-2 text-xl font-medium text-white">Q3 2025</h3>
              <p className="text-gray-400">
                Launch of premium features, API access, and bulk processing capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feedback Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Have a tool suggestion?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
            We'd love to hear your ideas! Let us know what tools would make your life easier.
          </p>
          <Button variant="primary" size="lg" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
            Submit a Suggestion
          </Button>
        </div>
      </section>
    </div>
  );
};

export default UpcomingToolsPage;