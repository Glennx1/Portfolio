import React, { useState, useEffect } from 'react';
import { Code, Server, Wrench, Smartphone } from 'lucide-react';

const skillsData = {
  Frontend: {
    icon: Code,
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Next.js'],
    color: 'from-blue-500 to-cyan-500'
  },
  Backend: {
    icon: Server,
    skills: ['Python', 'Node.js', 'C++', 'Java', 'Firebase', 'PostgreSQL', 'MongoDB', 'Express.js'],
    color: 'from-green-500 to-emerald-500'
  },
  'DevOps & Tools': {
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Netlify', 'Cloudflare', 'NPM', 'Yarn', 'Docker', 'AWS'],
    color: 'from-orange-500 to-red-500'
  },
  Mobile: {
    icon: Smartphone,
    skills: ['React Native', 'Android', 'iOS', 'Flutter', 'Expo', 'Swift'],
    color: 'from-purple-500 to-pink-500'
  }
};

const Skills = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('[data-skill-section]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Skills</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use to build innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(skillsData).map(([category, data], index) => {
            const Icon = data.icon;
            const isVisible = visibleSections.includes(`skill-${index}`);
            
            return (
              <div
                key={category}
                id={`skill-${index}`}
                data-skill-section
                className={`transition-all duration-700 delay-${index * 200} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-black/60 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${data.color}`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{category}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {data.skills.map((skill, skillIndex) => (
                      <span
                        key={skill}
                        className={`px-4 py-2 bg-slate-800 text-slate-300 rounded-lg border border-slate-700 
                          hover:border-slate-600 hover:text-white hover:bg-slate-700 
                          transition-all duration-200 text-sm font-medium
                          hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5
                          ${isVisible ? `animate-fade-in-delay-${skillIndex}` : 'opacity-0'}`}
                        style={{
                          animationDelay: isVisible ? `${(skillIndex * 100) + 300}ms` : '0ms'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;