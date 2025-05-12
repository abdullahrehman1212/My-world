import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-600">
                <span className="text-lg font-bold text-white">T</span>
              </div>
              <span className="text-xl font-bold text-white">ToolSuite</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              All-in-one platform for online tools and utilities to make your digital life easier.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Categories</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/tools/category/image" className="text-gray-400 hover:text-white transition-colors">
                  Image Tools
                </Link>
              </li>
              <li>
                <Link to="/tools/category/text" className="text-gray-400 hover:text-white transition-colors">
                  Text Tools
                </Link>
              </li>
              <li>
                <Link to="/tools/category/conversion" className="text-gray-400 hover:text-white transition-colors">
                  Conversion Tools
                </Link>
              </li>
              <li>
                <Link to="/tools/category/generator" className="text-gray-400 hover:text-white transition-colors">
                  Generators
                </Link>
              </li>
              <li>
                <Link to="/tools/category/developer" className="text-gray-400 hover:text-white transition-colors">
                  Developer Tools
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-400 hover:text-white transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ToolSuite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;