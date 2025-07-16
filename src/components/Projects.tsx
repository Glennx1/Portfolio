import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Code2, Sparkles } from 'lucide-react';

const projectsData = [
  {
    title: 'Algorithm Visualizer',
    description: 'Interactive web application for visualizing sorting and pathfinding algorithms with real-time animations and step-by-step explanations.',
    tech: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true
  },
  {
    title: 'Competitive Programming Tracker',
    description: 'Full-stack platform to track competitive programming progress across multiple platforms with analytics and performance insights.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Chart.js'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true
  },
  {
    title: 'Real-time Chat Application',
    description: 'Modern chat application with real-time messaging, user authentication, and responsive design for seamless communication.',
    tech: ['React', 'Socket.io', 'Express.js', 'MongoDB'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: false
  },
  {
    title: 'Portfolio Dashboard',
    description: 'Personal dashboard for tracking coding statistics, project progress, and learning goals with beautiful data visualizations.',
    tech: ['Vue.js', 'Python', 'FastAPI', 'SQLite'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: false
  }
];

const Projects = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-project-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = document.querySelectorAll('[data-project-index]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Projects</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A showcase of my recent work in competitive programming, web development, and software engineering
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsData.map((project, index) => {
            const isVisible = visibleCards.includes(index);
            
            return (
              <div
                key={project.title}
                data-project-index={index}
                className={`transition-all duration-700 delay-${index * 200} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className={`relative bg-black/60 backdrop-blur-sm p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl group h-full
                  ${project.featured 
                    ? 'border-blue-500/30 hover:border-blue-500/50 hover:shadow-blue-600/10' 
                    : 'border-slate-700/50 hover:border-slate-600/50 hover:shadow-blue-500/5'
                  }`}
                >
                  {project.featured && (
                    <div className="absolute -top-3 left-6">
                      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full text-xs font-medium text-white">
                        <Sparkles size={12} />
                        Featured
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors duration-300">
                      <Code2 size={20} className="text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-full border border-slate-700 group-hover:border-slate-600 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-all duration-200 hover:bg-slate-800"
                    >
                      <Github size={16} />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com"
            className="inline-flex items-center gap-2 px-8 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-medium rounded-lg transition-all duration-200 hover:bg-slate-800"
          >
            <Github size={20} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;