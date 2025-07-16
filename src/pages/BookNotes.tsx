import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { getBookNotes, saveBookNote, deleteBookNote, BookNote } from '../utils/storage';

const BookNotes = () => {
  const [books, setBooks] = useState<BookNote[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBook, setEditingBook] = useState<BookNote | null>(null);

  useEffect(() => {
    setBooks(getBookNotes());
  }, []);

  const categories = ['All', ...Array.from(new Set(books.map(book => book.category)))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveBook = (bookData: Partial<BookNote>) => {
    const book: BookNote = {
      id: editingBook?.id || Date.now().toString(),
      title: bookData.title || '',
      author: bookData.author || '',
      cover: bookData.cover,
      rating: bookData.rating || 0,
      category: bookData.category || 'General',
      notes: bookData.notes || '',
      quotes: bookData.quotes || [],
      dateRead: editingBook?.dateRead || new Date().toISOString().split('T')[0],
      progress: bookData.progress || 0
    };

    saveBookNote(book);
    setBooks(getBookNotes());
    setShowAddForm(false);
    setEditingBook(null);
  };

  const handleDeleteBook = (id: string) => {
    if (window.confirm('Are you sure you want to delete this book note?')) {
      deleteBookNote(id);
      setBooks(getBookNotes());
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}
      />
    ));
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 wave-overlay">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Book <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Notes</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            My reading journey and insights from books that shaped my thinking
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex gap-4 items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <Plus size={20} />
              Add Book
            </button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-black/60 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl group">
              <div className="aspect-[3/4] bg-slate-700 relative overflow-hidden">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={48} className="text-slate-500" />
                  </div>
                )}
                
                {/* Progress indicator */}
                {book.progress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 p-2">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{book.progress}% complete</p>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-200">
                  <Link to={`/book-notes/${book.id}`}>{book.title}</Link>
                </h3>
                
                <p className="text-slate-400 text-sm mb-3">{book.author}</p>

                <div className="flex items-center gap-2 mb-3">
                  {renderStars(book.rating)}
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 text-xs font-medium bg-slate-700 text-slate-300 rounded-full">
                    {book.category}
                  </span>

                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setEditingBook(book);
                        setShowAddForm(true);
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 transition-colors duration-200"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={64} className="text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No books found matching your criteria.</p>
          </div>
        )}

        {/* Add/Edit Book Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-6">
                {editingBook ? 'Edit Book' : 'Add New Book'}
              </h3>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const quotesText = formData.get('quotes') as string;
                const quotes = quotesText ? quotesText.split('\n').filter(q => q.trim()) : [];
                
                handleSaveBook({
                  title: formData.get('title') as string,
                  author: formData.get('author') as string,
                  cover: formData.get('cover') as string,
                  rating: parseInt(formData.get('rating') as string),
                  category: formData.get('category') as string,
                  notes: formData.get('notes') as string,
                  quotes,
                  progress: parseInt(formData.get('progress') as string),
                });
              }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                    <input
                      name="title"
                      type="text"
                      defaultValue={editingBook?.title}
                      required
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Author</label>
                    <input
                      name="author"
                      type="text"
                      defaultValue={editingBook?.author}
                      required
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Cover Image URL</label>
                  <input
                    name="cover"
                    type="url"
                    defaultValue={editingBook?.cover}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Rating (1-5)</label>
                    <input
                      name="rating"
                      type="number"
                      min="1"
                      max="5"
                      defaultValue={editingBook?.rating}
                      required
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                    <input
                      name="category"
                      type="text"
                      defaultValue={editingBook?.category}
                      required
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Progress (%)</label>
                    <input
                      name="progress"
                      type="number"
                      min="0"
                      max="100"
                      defaultValue={editingBook?.progress}
                      required
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
                  <textarea
                    name="notes"
                    rows={6}
                    defaultValue={editingBook?.notes}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Favorite Quotes (one per line)</label>
                  <textarea
                    name="quotes"
                    rows={4}
                    defaultValue={editingBook?.quotes?.join('\n')}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    {editingBook ? 'Update Book' : 'Add Book'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingBook(null);
                    }}
                    className="flex-1 px-6 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookNotes;