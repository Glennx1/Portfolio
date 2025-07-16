import React, { useEffect, useState } from 'react';
import { MapPin, Coffee, Code, Gamepad2 } from 'lucide-react';
import AnimatedText from './AnimatedText';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-slate-900/30 to-black/50"></div>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center relative z-10">
          {/* Main Content - Centered */}
          <div className={`max-w-4xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Hi, I'm{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Glenn Braggs
                  </span>
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-300">
                  And I am a <AnimatedText />
                </h2>
              </div>

              <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                I'm a passionate software engineer from Bangalore, India, with a love for solving complex 
                algorithmic challenges and building innovative web applications. Currently pursuing Computer 
                Science with a focus on competitive programming and modern web development.
              </p>

              <div className="flex flex-wrap gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-blue-400" />
                  <span>Bangalore, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code size={18} className="text-blue-400" />
                  <span>Software Engineering</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee size={18} className="text-blue-400" />
                  <span>Math & Algorithms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gamepad2 size={18} className="text-blue-400" />
                  <span>Gaming</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25"
                >
                  View My Skills
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-medium rounded-lg transition-all duration-200 hover:bg-slate-800"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;