import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { getBlogPosts, BlogPost } from '../utils/storage';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const posts = getBlogPosts();
    const foundPost = posts.find(p => p.id === id);
    setPost(foundPost || null);
    setLoading(false);
  }, [id]);

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-6 text-white">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-4 mt-8 text-white">$2</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-3 mt-6 text-white">$3</h3>')
      .replace(/^\*\*(.*?)\*\*/gm, '<strong class="font-bold text-white">$1</strong>')
      .replace(/^\*(.*?)\*/gm, '<em class="italic">$1</em>')
      .replace(/^- (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="mb-2">$2</li>')
      .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
      .replace(/^(?!<[h|l])/gm, '<p class="mb-4 leading-relaxed">')
      .replace(/(<li.*<\/li>)/gs, '<ul class="list-disc list-inside mb-6 space-y-2 text-slate-300">$1</ul>');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-slate-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to Blog
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
          to="/blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          {post.thumbnail && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-slate-700 text-slate-300 rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-slate-400 leading-relaxed mb-6">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between border-t border-slate-700 pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">GB</span>
              </div>
              <div>
                <p className="text-white font-medium">Glenn Braggs</p>
                <p className="text-slate-400 text-sm">Software Engineer & Writer</p>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-colors duration-200">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </header>

        {/* Post Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <div 
            className="text-slate-300"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />
        </article>

        {/* Post Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-700">
          <div className="text-center">
            <p className="text-slate-400 mb-4">Thanks for reading!</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Read More Posts
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogPostPage;