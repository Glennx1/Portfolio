import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Twitter, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { path: '/blog', label: 'Blog' },
    { path: '/book-notes', label: 'Book Notes' },
    { path: '/resume', label: 'Resume' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-sm shadow-lg border-b border-slate-800' 
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                to="/"
                className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
              >
                Glenn Braggs
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link 
                  to="/"
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive('/') 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Home
                </Link>
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(link.path) 
                        ? 'text-blue-400 border-b-2 border-blue-400' 
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="https://github.com" 
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-400 hover:text-white focus:outline-none focus:text-white transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 w-full text-left ${
                  isActive('/') 
                    ? 'text-blue-400 bg-slate-800' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 w-full text-left ${
                    isActive(link.path) 
                      ? 'text-blue-400 bg-slate-800' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex space-x-4 px-3 py-2">
                <a 
                  href="https://github.com" 
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://twitter.com" 
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;