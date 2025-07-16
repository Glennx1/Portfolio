import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BookNotes from './pages/BookNotes';
import BookNote from './pages/BookNote';
import Resume from './pages/Resume';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen text-white wave-overlay">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/book-notes" element={<BookNotes />} />
            <Route path="/book-notes/:id" element={<BookNote />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;