'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { safeJsonFetch } from '@/lib/safeJsonFetch';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEnrollments: 0,
    pendingEnrollments: 0,
    totalPosts: 0,
    publishedPosts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetchStats();
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch enrollment stats
      const enrollData = await safeJsonFetch<{ enrollments?: Array<{ status?: string }> }>('/api/admin/enrollments');
      
      // Fetch blog stats
      const blogData = await safeJsonFetch<{ posts?: Array<{ published?: boolean }> }>('/api/admin/blog');

      setStats({
        totalEnrollments: enrollData.enrollments?.length || 0,
        pendingEnrollments: enrollData.enrollments?.filter((e: any) => e.status === 'pending').length || 0,
        totalPosts: blogData.posts?.length || 0,
        publishedPosts: blogData.posts?.filter((p: any) => p.published).length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      label: 'Total Enrollments', 
      value: stats.totalEnrollments, 
      gradient: 'from-blue-500 to-blue-600',
      lightGradient: 'from-blue-50 to-blue-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      link: '/admin/enrollments',
      change: '+12%',
      trend: 'up',
    },
    { 
      label: 'Pending Review', 
      value: stats.pendingEnrollments, 
      gradient: 'from-amber-500 to-amber-600',
      lightGradient: 'from-amber-50 to-amber-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: '/admin/enrollments',
      change: stats.pendingEnrollments > 0 ? 'Needs attention' : 'All clear',
      trend: stats.pendingEnrollments > 0 ? 'neutral' : 'up',
    },
    { 
      label: 'Blog Posts', 
      value: stats.totalPosts, 
      gradient: 'from-[#0A1236] to-[#1a2e5a]',
      lightGradient: 'from-indigo-50 to-indigo-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      link: '/admin/blog',
      change: '+8%',
      trend: 'up',
    },
    { 
      label: 'Published', 
      value: stats.publishedPosts, 
      gradient: 'from-emerald-500 to-emerald-600',
      lightGradient: 'from-emerald-50 to-emerald-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: '/admin/blog',
      change: `${stats.publishedPosts}/${stats.totalPosts}`,
      trend: 'up',
    },
  ];

  const quickActions = [
    {
      title: 'Create New Post',
      description: 'Share insights with your audience',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
        </svg>
      ),
      href: '/admin/blog/new',
      gradient: 'from-[#E62A2A] to-[#C91F1F]',
      accent: '#E62A2A',
    },
    {
      title: 'Review Applications',
      description: 'Check new student enrollments',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      href: '/admin/enrollments',
      gradient: 'from-[#0A1236] to-[#1a2e5a]',
      accent: '#0A1236',
    },
    {
      title: 'Manage Content',
      description: 'Edit and organize blog posts',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      href: '/admin/blog',
      gradient: 'from-purple-500 to-purple-600',
      accent: '#a855f7',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="flex flex-col items-center gap-8">
          {/* Modern Loader */}
          <div className="relative">
            {/* Outer glowing ring */}
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-r from-[#E62A2A]/30 to-[#E62A2A]/10 blur-2xl animate-pulse"></div>
            
            {/* Main loader */}
            <div className="relative w-20 h-20">
              {/* Background circle */}
              <div className="absolute inset-0 rounded-full border-4 border-gray-100 dark:border-gray-800"></div>
              
              {/* Animated gradient arc */}
              <svg className="w-20 h-20 animate-spin" viewBox="0 0 80 80">
                <defs>
                  <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E62A2A" />
                    <stop offset="50%" stopColor="#E62A2A" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#E62A2A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="url(#loaderGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="180"
                  strokeDashoffset="30"
                />
              </svg>
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E62A2A] to-[#C91F1F] flex items-center justify-center shadow-lg shadow-[#E62A2A]/20">
                  <span className="text-white font-bold text-lg font-outfit">A</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading text */}
          <div className="text-center">
            <p className="text-lg font-outfit font-light text-gray-600 dark:text-gray-400 mb-3">Loading Dashboard</p>
            <div className="flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E62A2A] animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-[#E62A2A]/70 animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-[#E62A2A]/40 animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Elegant Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="flex flex-col gap-6">
          <div>
            <motion.h1 
              className="font-outfit text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 dark:text-white mb-3 tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {greeting}
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 font-light"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Welcome back to your control center
            </motion.p>
          </div>
          
          {/* Date pill */}
          <motion.div 
            className="inline-flex items-center gap-3 self-start px-6 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-light text-gray-700 dark:text-gray-300">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Premium Stats Grid - Liquid Glass Effect */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.1 * index,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <Link href={stat.link} className="block group">
              {/* Liquid Glass Card */}
              <div className="relative overflow-hidden rounded-2xl p-6 h-full backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightGradient} dark:${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  {/* Icon and Trend */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {stat.icon}
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                      stat.trend === 'up' 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                        : stat.trend === 'down'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400'
                    }`}>
                      {stat.trend === 'up' && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      )}
                      {stat.change}
                    </div>
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <p className="text-5xl font-extralight text-gray-900 dark:text-white tracking-tight">
                      {stat.value}
                    </p>
                  </div>

                  {/* Label */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
                    {stat.label}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Premium Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h2 className="font-outfit text-2xl md:text-3xl font-light text-gray-900 dark:text-white mb-6">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6 + index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Link href={action.href} className="block group h-full">
                {/* Liquid Glass Action Card */}
                <div className="relative overflow-hidden rounded-2xl p-8 h-full backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white shadow-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {action.icon}
                    </div>

                    {/* Content */}
                    <h3 className="font-outfit text-xl font-light text-gray-900 dark:text-white mb-2 group-hover:text-[#E62A2A] dark:group-hover:text-[#E62A2A] transition-colors duration-300">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-4">
                      {action.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-[#E62A2A] dark:group-hover:text-[#E62A2A] transition-colors">
                      <span className="text-sm font-light">Get started</span>
                      <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* System Status & Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* System Status - Premium Glass */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="relative overflow-hidden rounded-2xl p-8 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700/30 shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-outfit text-2xl font-light text-gray-900 dark:text-white">
                System Status
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-light">All systems operational</p>
            </div>
          </div>

          {/* Status Items */}
          <div className="space-y-4">
            {[
              { name: 'Database Connection', status: 'Online' },
              { name: 'Email Service', status: 'Active' },
              { name: 'API Services', status: 'Running' },
              { name: 'Storage', status: 'Healthy' }
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-700/30 dark:to-transparent border border-gray-100/50 dark:border-gray-600/30"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
                  </div>
                  <span className="text-sm font-light text-gray-700 dark:text-gray-300">{item.name}</span>
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insights & Tips - Premium Glass */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative overflow-hidden rounded-2xl p-8 backdrop-blur-xl bg-gradient-to-br from-[#0A1236] to-[#1a2e5a] border border-white/10 shadow-2xl"
        >
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E62A2A]/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#E62A2A] flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-outfit text-2xl font-light text-white">
                   Pro Tip
                </h3>
                <p className="text-sm text-white/60 font-light">Boost your engagement</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <p className="text-white/90 leading-relaxed font-light">
                Consistency is key! Publishing 2-3 quality blog posts per week keeps your audience engaged and improves search rankings.
              </p>

              {/* Tips List */}
              <div className="space-y-3">
                {[
                  'Feature posts on the homepage',
                  'Add compelling images',
                  'Write engaging titles'
                ].map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    className="flex items-center gap-3 text-white/70"
                  >
                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-light">{tip}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}