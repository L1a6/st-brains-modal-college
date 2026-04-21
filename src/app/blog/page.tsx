'use client';

import { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}

function BlogContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFeatured, setCurrentFeatured] = useState(0);

  // Fetch posts from Supabase
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts.filter((post: BlogPost) => post.published));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-slideshow for featured posts
  const featuredPosts = posts.filter(post => post.featured);
  
  useEffect(() => {
    if (featuredPosts.length > 1) {
      const interval = setInterval(() => {
        setCurrentFeatured((prev) => (prev + 1) % featuredPosts.length);
      }, 5000); // Change slide every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [featuredPosts.length]);

  const filteredPosts = category
    ? posts.filter(post => post.category.toLowerCase().replace(/\s+/g, '-') === category)
    : posts;

  const nextFeatured = () => {
    setCurrentFeatured((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevFeatured = () => {
    setCurrentFeatured((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1236] dark:border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-20">
        {!category && featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 relative mx-[-8px] md:mx-0"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeatured}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Link href={`/blog/${featuredPosts[currentFeatured].slug}`} className="group block h-full">
                    <Image
                      src={featuredPosts[currentFeatured].image_url}
                      alt={featuredPosts[currentFeatured].title}
                      fill
                      sizes="100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    {/* Featured badge - top right */}
                    <span className="absolute top-4 right-4 md:top-6 md:right-6 inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs md:text-sm z-10">
                      Featured
                    </span>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                      <h2 className="font-outfit text-2xl md:text-4xl lg:text-5xl font-light text-white mb-3 md:mb-4 group-hover:text-gray-200 transition-colors line-clamp-2">
                        {featuredPosts[currentFeatured].title}
                      </h2>
                      <p className="text-sm md:text-lg text-white/90 mb-3 md:mb-4 max-w-3xl line-clamp-2 md:line-clamp-none">
                        {featuredPosts[currentFeatured].excerpt}
                      </p>
                      <div className="flex items-center gap-2 md:gap-4 text-white/80 text-xs md:text-sm">
                        <span>{featuredPosts[currentFeatured].author}</span>
                        <span>•</span>
                        <span>{new Date(featuredPosts[currentFeatured].created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {featuredPosts.length > 1 && (
                <>
                  <button
                    onClick={prevFeatured}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextFeatured}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {featuredPosts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFeatured(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentFeatured ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-outfit text-3xl font-light text-gray-900 dark:text-white mb-2">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Posts` : 'All Posts'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-outfit text-xl font-medium text-gray-900 dark:text-white group-hover:text-[#0A1236] dark:group-hover:text-gray-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-500 text-sm">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No posts found in this category.
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0A1236] pt-24">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="brand-menu-overlay"></div>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&q=80"
            alt="Blog"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase text-white/90 mb-4"
          >
            Blog & Updates
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-outfit text-4xl md:text-6xl font-extralight text-white tracking-tight"
          >
            Latest Insights
          </motion.h1>
        </div>
      </section>

      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600 dark:text-gray-400">Loading...</div>
          </div>
        </div>
      }>
        <BlogContent />
      </Suspense>
    </main>
  );
}