import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, BookOpen, Quote } from 'lucide-react';
import { getBookNotes, BookNote } from '../utils/storage';

const BookNotePage = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookNote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const books = getBookNotes();
    const foundBook = books.find(b => b.id === id);
    setBook(foundBook || null);
    setLoading(false);
  }, [id]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}
      />
    ));
  };

  const formatNotes = (notes: string) => {
    return notes
      .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
      .replace(/^(?!<p)/gm, '<p class="mb-4 leading-relaxed">')
      .replace(/^\*\*(.*?)\*\*/gm, '<strong class="font-bold text-white">$1</strong>')
      .replace(/^\*(.*?)\*/gm, '<em class="italic">$1</em>')
      .replace(/^- (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/(<li.*<\/li>)/gs, '<ul class="list-disc list-inside mb-6 space-y-2">$1</ul>');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading book notes...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Book Not Found</h1>
          <p className="text-slate-400 mb-8">The book notes you're looking for don't exist.</p>
          <Link
            to="/book-notes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to Book Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/book-notes"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Book Notes
        </Link>

        {/* Book Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="aspect-[3/4] bg-slate-700 rounded-2xl overflow-hidden">
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen size={64} className="text-slate-500" />
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-white mb-4">{book.title}</h1>
            <p className="text-xl text-slate-400 mb-6">by {book.author}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-slate-300">Rating:</span>
                <div className="flex items-center gap-1">
                  {renderStars(book.rating)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-slate-400" />
                <span className="text-slate-300">Read on: {new Date(book.dateRead).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-300">Category:</span>
                <span className="px-3 py-1 text-sm font-medium bg-slate-700 text-slate-300 rounded-full">
                  {book.category}
                </span>
              </div>

              {book.progress < 100 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Reading Progress:</span>
                    <span className="text-slate-400">{book.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        {book.notes && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BookOpen size={24} />
              My Notes
            </h2>
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <div 
                className="text-slate-300 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: formatNotes(book.notes) }}
              />
            </div>
          </section>
        )}

        {/* Quotes Section */}
        {book.quotes && book.quotes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Quote size={24} />
              Favorite Quotes
            </h2>
            <div className="space-y-6">
              {book.quotes.map((quote, index) => (
                <blockquote key={index} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 border-l-4 border-l-blue-500">
                  <p className="text-slate-300 text-lg italic leading-relaxed mb-4">
                    "{quote}"
                  </p>
                  <cite className="text-slate-400 text-sm">— {book.author}</cite>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center py-8 border-t border-slate-700">
          <Link
            to="/book-notes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <BookOpen size={20} />
            Explore More Books
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default BookNotePage;