// Blog post interface
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  thumbnail?: string;
}

// Book note interface
export interface BookNote {
  id: string;
  title: string;
  author: string;
  cover?: string;
  rating: number;
  category: string;
  notes: string;
  quotes: string[];
  dateRead: string;
  progress: number;
}

// Local storage keys
const BLOG_POSTS_KEY = 'portfolio_blog_posts';
const BOOK_NOTES_KEY = 'portfolio_book_notes';

// Blog post storage functions
export const getBlogPosts = (): BlogPost[] => {
  const stored = localStorage.getItem(BLOG_POSTS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Default blog posts
  const defaultPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Building Modern Web Applications with React',
      excerpt: 'Exploring the latest patterns and best practices in React development, including hooks, context, and performance optimization.',
      content: `# Building Modern Web Applications with React

React has revolutionized the way we build user interfaces. In this post, we'll explore the latest patterns and best practices that make React applications more maintainable and performant.

## Key Topics Covered

1. **React Hooks**: Understanding useState, useEffect, and custom hooks
2. **Context API**: Managing global state without Redux
3. **Performance Optimization**: Memoization and lazy loading
4. **Modern Patterns**: Compound components and render props

## Getting Started

Let's dive into some practical examples...`,
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Web Development',
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Mastering Algorithms and Data Structures',
      excerpt: 'A comprehensive guide to understanding fundamental algorithms and data structures for competitive programming.',
      content: `# Mastering Algorithms and Data Structures

Understanding algorithms and data structures is crucial for any software engineer. This guide covers the fundamentals you need to know.

## Essential Data Structures

- Arrays and Dynamic Arrays
- Linked Lists
- Stacks and Queues
- Trees and Binary Search Trees
- Hash Tables
- Graphs

## Algorithm Categories

1. **Sorting Algorithms**: Quick sort, merge sort, heap sort
2. **Search Algorithms**: Binary search, depth-first search, breadth-first search
3. **Dynamic Programming**: Memoization and tabulation
4. **Graph Algorithms**: Dijkstra's algorithm, minimum spanning trees

Let's explore each of these in detail...`,
      date: '2024-01-10',
      readTime: '12 min read',
      category: 'Computer Science',
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'The Art of Clean Code',
      excerpt: 'Writing maintainable, readable code that stands the test of time. Best practices and principles every developer should know.',
      content: `# The Art of Clean Code

Clean code is not just about making your code work—it's about making it readable, maintainable, and elegant.

## Principles of Clean Code

1. **Meaningful Names**: Choose descriptive variable and function names
2. **Small Functions**: Keep functions focused on a single task
3. **Comments**: Write code that explains itself
4. **Error Handling**: Handle errors gracefully
5. **Testing**: Write tests that document your code's behavior

## Practical Examples

Let's look at some before and after examples of code refactoring...`,
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Software Engineering',
      thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];
  
  localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(defaultPosts));
  return defaultPosts;
};

export const saveBlogPost = (post: BlogPost): void => {
  const posts = getBlogPosts();
  const existingIndex = posts.findIndex(p => p.id === post.id);
  
  if (existingIndex >= 0) {
    posts[existingIndex] = post;
  } else {
    posts.unshift(post);
  }
  
  localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
};

export const deleteBlogPost = (id: string): void => {
  const posts = getBlogPosts().filter(post => post.id !== id);
  localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
};

// Book notes storage functions
export const getBookNotes = (): BookNote[] => {
  const stored = localStorage.getItem(BOOK_NOTES_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Default book notes
  const defaultBooks: BookNote[] = [
    {
      id: '1',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      cover: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      category: 'Technical',
      notes: `Excellent book on writing maintainable code. Key takeaways:

- Functions should be small and do one thing
- Use meaningful names for variables and functions
- Comments should explain why, not what
- Error handling is important but shouldn't obscure logic
- Tests are crucial for maintaining code quality

The book provides practical examples and refactoring techniques that every developer should know.`,
      quotes: [
        "Clean code is simple and direct. Clean code reads like well-written prose.",
        "The only way to make the deadline—the only way to go fast—is to keep the code as clean as possible at all times.",
        "Truth can only be found in one place: the code."
      ],
      dateRead: '2024-01-20',
      progress: 100
    },
    {
      id: '2',
      title: 'The Pragmatic Programmer',
      author: 'David Thomas, Andrew Hunt',
      cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      category: 'Technical',
      notes: `A timeless guide to software development. The book covers:

- DRY (Don't Repeat Yourself) principle
- Orthogonality in design
- Reversibility and flexibility
- Tracer bullets and prototyping
- Debugging techniques
- Team dynamics and communication

The authors provide practical advice that applies regardless of programming language or technology stack.`,
      quotes: [
        "Care about your craft. Why spend your life developing software unless you care about doing it well?",
        "Don't live with broken windows.",
        "You can't write perfect software. Did that hurt? It shouldn't."
      ],
      dateRead: '2024-01-15',
      progress: 100
    },
    {
      id: '3',
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4,
      category: 'Self-Improvement',
      notes: `Great insights on building good habits and breaking bad ones:

- The compound effect of small improvements
- Identity-based habits vs outcome-based habits
- The four laws of behavior change
- Environment design for success
- The importance of systems over goals

Particularly relevant for developers looking to improve their coding practices and learning habits.`,
      quotes: [
        "You do not rise to the level of your goals. You fall to the level of your systems.",
        "Every action you take is a vote for the type of person you wish to become.",
        "The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become."
      ],
      dateRead: '2024-01-10',
      progress: 85
    }
  ];
  
  localStorage.setItem(BOOK_NOTES_KEY, JSON.stringify(defaultBooks));
  return defaultBooks;
};

export const saveBookNote = (book: BookNote): void => {
  const books = getBookNotes();
  const existingIndex = books.findIndex(b => b.id === book.id);
  
  if (existingIndex >= 0) {
    books[existingIndex] = book;
  } else {
    books.unshift(book);
  }
  
  localStorage.setItem(BOOK_NOTES_KEY, JSON.stringify(books));
};

export const deleteBookNote = (id: string): void => {
  const books = getBookNotes().filter(book => book.id !== id);
  localStorage.setItem(BOOK_NOTES_KEY, JSON.stringify(books));
};