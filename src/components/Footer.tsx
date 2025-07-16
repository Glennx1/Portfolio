import React from 'react';
import { Heart, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/80 border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-slate-400 mb-4 md:mb-0">
            <span>Made with</span>
            <Heart size={16} className="text-red-500" />
            <span>and</span>
            <Code size={16} className="text-blue-400" />
            <span>by Glenn Braggs</span>
          </div>
          
          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Glenn Braggs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;