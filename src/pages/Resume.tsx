import React, { useState } from 'react';
import { Download, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Calendar } from 'lucide-react';

const Resume = () => {
  const [resumeImage, setResumeImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setResumeImage(result);
        localStorage.setItem('resume_image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('resume_image');
    if (saved) {
      setResumeImage(saved);
    }
  }, []);

  const resumeData = {
    personalInfo: {
      name: 'Alex Chan',
      title: 'Software Engineer & Competitive Programmer',
      email: 'alex.chan@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      github: 'https://github.com/alexchan',
      linkedin: 'https://linkedin.com/in/alexchan'
    },
    summary: 'Passionate software engineer with expertise in competitive programming, full-stack web development, and algorithm optimization. Experienced in building scalable applications using modern technologies and solving complex computational problems.',
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of California, Berkeley',
        period: '2020 - 2024',
        gpa: '3.8/4.0',
        relevant: ['Data Structures & Algorithms', 'Software Engineering', 'Database Systems', 'Computer Networks']
      }
    ],
    experience: [
      {
        title: 'Software Engineering Intern',
        company: 'Tech Innovations Inc.',
        period: 'Jun 2023 - Aug 2023',
        location: 'San Francisco, CA',
        achievements: [
          'Developed and deployed 3 full-stack web applications using React, Node.js, and PostgreSQL',
          'Optimized database queries resulting in 40% improvement in application performance',
          'Collaborated with cross-functional teams to implement new features for 10,000+ users',
          'Participated in code reviews and maintained 95% test coverage across all projects'
        ]
      },
      {
        title: 'Competitive Programming Team Lead',
        company: 'UC Berkeley ACM',
        period: 'Sep 2022 - May 2024',
        location: 'Berkeley, CA',
        achievements: [
          'Led team of 8 competitive programmers to regional ICPC competition',
          'Organized weekly training sessions covering advanced algorithms and data structures',
          'Achieved top 10% ranking in multiple programming contests including Codeforces and AtCoder',
          'Mentored 20+ students in algorithmic problem-solving techniques'
        ]
      }
    ],
    skills: {
      'Programming Languages': ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'Go'],
      'Web Technologies': ['React', 'Node.js', 'Express.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
      'Databases': ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase'],
      'Tools & Platforms': ['Git', 'Docker', 'AWS', 'Netlify', 'GitHub Actions', 'Linux'],
      'Algorithms & DS': ['Dynamic Programming', 'Graph Algorithms', 'Tree Structures', 'Sorting & Searching']
    },
    projects: [
      {
        name: 'Algorithm Visualizer',
        tech: ['React', 'TypeScript', 'D3.js'],
        description: 'Interactive web application for visualizing sorting and pathfinding algorithms',
        link: 'https://github.com/glennbraggs/algo-visualizer'
      },
      {
        name: 'Competitive Programming Tracker',
        tech: ['Next.js', 'PostgreSQL', 'Chart.js'],
        description: 'Full-stack platform to track progress across multiple competitive programming platforms',
        link: 'https://github.com/glennbraggs/cp-tracker'
      },
      {
        name: 'Real-time Chat Application',
        tech: ['React', 'Socket.io', 'Express.js'],
        description: 'Modern chat application with real-time messaging and user authentication',
        link: 'https://github.com/glennbraggs/chat-app'
      }
    ],
    achievements: [
      'ICPC Regional Contest - Top 15% (2023)',
      'Google Code Jam - Round 2 Qualifier (2023)',
      'Codeforces Expert Rating (1600+)',
      'Dean\'s List - 4 consecutive semesters',
      'Outstanding Student in Computer Science Award (2023)'
    ]
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 wave-overlay">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Resume</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <Download size={20} />
              Download PDF
            </button>
            <label className="flex items-center gap-2 px-6 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg transition-colors duration-200 cursor-pointer">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleImageUpload}
                className="hidden"
              />
              Upload Resume Image
            </label>
          </div>
        </div>

        {/* Resume Image Display */}
        {resumeImage && (
          <div className="mb-8 bg-white rounded-2xl p-4 shadow-lg">
            <img
              src={resumeImage}
              alt="Resume"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Resume Content */}
        <div className="bg-black/60 rounded-2xl p-8 border border-slate-700/50 print:bg-white print:text-black print:border-gray-300">
          {/* Personal Info */}
          <header className="text-center mb-8 pb-6 border-b border-slate-700 print:border-gray-300">
            <h1 className="text-3xl font-bold text-white print:text-black mb-2">{resumeData.personalInfo.name}</h1>
            <p className="text-xl text-blue-400 print:text-blue-600 mb-4">{resumeData.personalInfo.title}</p>
            
            <div className="flex flex-wrap justify-center gap-4 text-slate-300 print:text-gray-600">
              <div className="flex items-center gap-1">
                <Mail size={16} />
                <span>{resumeData.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={16} />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{resumeData.personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Github size={16} />
                <a href={resumeData.personalInfo.github} className="hover:text-blue-400 print:text-blue-600">GitHub</a>
              </div>
              <div className="flex items-center gap-1">
                <Linkedin size={16} />
                <a href={resumeData.personalInfo.linkedin} className="hover:text-blue-400 print:text-blue-600">LinkedIn</a>
              </div>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white print:text-black mb-4">Professional Summary</h2>
            <p className="text-slate-300 print:text-gray-700 leading-relaxed">{resumeData.summary}</p>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white print:text-black mb-4">Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white print:text-black">{edu.degree}</h3>
                  <div className="flex items-center gap-1 text-slate-400 print:text-gray-600">
                    <Calendar size={16} />
                    <span>{edu.period}</span>
                  </div>
                </div>
                <p className="text-blue-400 print:text-blue-600 mb-2">{edu.school}</p>
                <p className="text-slate-300 print:text-gray-700 mb-2">GPA: {edu.gpa}</p>
                <p className="text-slate-400 print:text-gray-600">
                  <strong>Relevant Coursework:</strong> {edu.relevant.join(', ')}
                </p>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white print:text-black mb-4">Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white print:text-black">{exp.title}</h3>
                  <div className="flex items-center gap-1 text-slate-400 print:text-gray-600">
                    <Calendar size={16} />
                    <span>{exp.period}</span>
                  </div>
                </div>
                <p className="text-blue-400 print:text-blue-600 mb-1">{exp.company}</p>
                <p className="text-slate-400 print:text-gray-600 mb-3">{exp.location}</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 print:text-gray-700">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white print:text-black mb-4">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(resumeData.skills).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-white print:text-black mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm bg-slate-700 print:bg-gray-200 text-slate-300 print:text-gray-700 rounded-full border border-slate-600 print:border-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white print:text-black mb-4">Key Projects</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-white print:text-black">{project.name}</h3>
                  <a
                    href={project.link}
                    className="text-blue-400 print:text-blue-600 hover:text-blue-300"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                <p className="text-slate-300 print:text-gray-700 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-slate-700 print:bg-gray-200 text-slate-300 print:text-gray-700 rounded border border-slate-600 print:border-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-2xl font-bold text-white print:text-black mb-4">Achievements & Awards</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 print:text-gray-700">
              {resumeData.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resume;