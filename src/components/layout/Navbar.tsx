'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [blogDropdown, setBlogDropdown] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[10000] transition-all duration-500 translate-y-0">
      <div className="relative overflow-visible h-[72px]">
        <div 
          className="absolute inset-0 backdrop-blur-lg"
          style={{
            backgroundColor: 'color-mix(in srgb, #bbbbbc 12%, transparent)',
            backdropFilter: 'blur(8px) saturate(150%)',
            WebkitBackdropFilter: 'blur(8px) saturate(150%)',
          }}
        ></div>
        
        <div 
          className="absolute inset-0 dark:hidden"
          style={{
            boxShadow: `
              inset 1.8px 3px 0px -2px color-mix(in srgb, white 90%, transparent),
              inset -2px -2px 0px -2px color-mix(in srgb, white 60%, transparent),
              inset -0.3px -1px 4px 0px color-mix(in srgb, black 8%, transparent),
              inset -1.5px 2.5px 0px -2px color-mix(in srgb, black 15%, transparent),
              0px 1px 5px 0px color-mix(in srgb, black 10%, transparent),
              0px 6px 16px 0px color-mix(in srgb, black 8%, transparent)
            `,
          }}
        ></div>
        
        <div 
          className="hidden dark:block absolute inset-0"
          style={{
            backgroundColor: 'color-mix(in srgb, #bbbbbc 12%, transparent)',
            boxShadow: `
              inset 1.8px 3px 0px -2px color-mix(in srgb, white 27%, transparent),
              inset -2px -2px 0px -2px color-mix(in srgb, white 24%, transparent),
              inset -0.3px -1px 4px 0px color-mix(in srgb, black 24%, transparent),
              inset -1.5px 2.5px 0px -2px color-mix(in srgb, black 40%, transparent),
              0px 1px 5px 0px color-mix(in srgb, black 20%, transparent),
              0px 6px 16px 0px color-mix(in srgb, black 16%, transparent)
            `,
          }}
        ></div>
        
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center">
          <Link href="/" className="flex items-center flex-shrink-0">
            <span className="font-outfit text-lg md:text-xl font-semibold tracking-tight text-[#8B0000] dark:text-white">
              ST Brains Modal College
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-10">
            <li>
              <Link
                href="/"
                className={`text-sm font-normal transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#E62A2A] after:transition-all hover:after:w-full ${
                  isActive('/') 
                    ? 'text-[#E62A2A]' 
                    : 'text-gray-800 dark:text-white hover:text-[#E62A2A]'
                }`}
              >
                Home
              </Link>
            </li>
            
            <li 
              className="relative"
              onMouseEnter={() => setAboutDropdown(true)}
              onMouseLeave={() => setAboutDropdown(false)}
            >
              <button
                className={`text-sm font-normal transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#E62A2A] after:transition-all hover:after:w-full ${
                  pathname.startsWith('/about')
                    ? 'text-[#E62A2A]'
                    : 'text-gray-800 dark:text-white hover:text-[#E62A2A]'
                }`}
              >
                About Us
              </button>
              
              <div className={`absolute top-full left-0 pt-4 transition-all duration-300 ${
                aboutDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}>
                <div className="relative backdrop-blur-lg rounded-lg overflow-hidden shadow-2xl" style={{
                  backgroundColor: 'color-mix(in srgb, #ffffff 90%, transparent)',
                  backdropFilter: 'blur(12px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                  boxShadow: '0px 8px 32px rgba(0,0,0,0.12)',
                  minWidth: '220px'
                }}>
                  <Link href="/about" className="block px-5 py-3 text-sm text-gray-800 dark:text-white hover:bg-[#E62A2A]/10 transition-colors">
                    About ST Brains Modal College
                  </Link>
                  <Link href="/about/leadership" className="block px-5 py-3 text-sm text-gray-800 dark:text-white hover:bg-[#E62A2A]/10 transition-colors">
                    Leadership Team
                  </Link>
                  <Link href="/about/facilitators" className="block px-5 py-3 text-sm text-gray-800 dark:text-white hover:bg-[#E62A2A]/10 transition-colors">
                    Facilitators
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/courses"
                className={`text-sm font-normal transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#E62A2A] after:transition-all hover:after:w-full ${
                  isActive('/courses')
                    ? 'text-[#E62A2A]'
                    : 'text-gray-800 dark:text-white hover:text-[#E62A2A]'
                }`}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className={`text-sm font-normal transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#E62A2A] after:transition-all hover:after:w-full ${
                  isActive('/gallery')
                    ? 'text-[#E62A2A]'
                    : 'text-gray-800 dark:text-white hover:text-[#E62A2A]'
                }`}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/testimonials"
                className={`text-sm font-normal transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#E62A2A] after:transition-all hover:after:w-full ${
                  isActive('/testimonials')
                    ? 'text-[#E62A2A]'
                    : 'text-gray-800 dark:text-white hover:text-[#E62A2A]'
                }`}
              >
                Testimonials
              </Link>
            </li>
            
            <li 
              className="relative"
              onMouseEnter={() => setBlogDropdown(true)}
              onMouseLeave={() => setBlogDropdown(false)}
            >
              <button
                className={`text-sm font-normal transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#E62A2A] after:transition-all hover:after:w-full ${
                  pathname.startsWith('/blog')
                    ? 'text-[#E62A2A]'
                    : 'text-gray-800 dark:text-white hover:text-[#E62A2A]'
                }`}
              >
                Blog
              </button>
              
              <div className={`absolute top-full left-0 pt-4 transition-all duration-300 ${
                blogDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}>
                <div className="relative backdrop-blur-lg rounded-lg overflow-hidden shadow-2xl" style={{
                  backgroundColor: 'color-mix(in srgb, #ffffff 90%, transparent)',
                  backdropFilter: 'blur(12px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                  boxShadow: '0px 8px 32px rgba(0,0,0,0.12)',
                  minWidth: '200px'
                }}>
                  <Link href="/blog" className="block px-5 py-3 text-sm text-gray-800 dark:text-white hover:bg-[#E62A2A]/10 transition-colors">
                    All Posts
                  </Link>
                  <Link href="/blog?category=announcements" className="block px-5 py-3 text-sm text-gray-800 dark:text-white hover:bg-[#E62A2A]/10 transition-colors">
                    Announcements
                  </Link>
                  <Link href="/blog?category=tips" className="block px-5 py-3 text-sm text-gray-800 dark:text-white hover:bg-[#E62A2A]/10 transition-colors">
                    Tips & Guides
                  </Link>
                  <Link href="/blog?category=events" className="block px-5 py-3 text-sm text-gray-800 dark:text-white hover:bg-[#E62A2A]/10 transition-colors">
                    Events
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/enroll"
                className={`text-sm font-normal transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#E62A2A] after:transition-all hover:after:w-full ${
                  isActive('/enroll')
                    ? 'text-[#E62A2A]'
                    : 'text-gray-800 dark:text-white hover:text-[#E62A2A]'
                }`}
              >
                Enroll Next Session
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-800 dark:text-white hover:bg-white/30 dark:hover:bg-white/20 transition-all hover:rotate-180 duration-500 border border-white/20"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col gap-1 p-2"
              aria-label="Menu"
            >
              <span className={`w-5 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-5 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="relative md:hidden bg-white/95 dark:bg-[#0A1236]/95 backdrop-blur-xl shadow-2xl">
          <ul className="flex flex-col px-6 py-6">
            <li className="py-3">
              <Link href="/" className="text-sm font-normal text-gray-800 dark:text-white" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            
            <li className="py-3">
              <button 
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="text-sm font-normal text-gray-800 dark:text-white w-full text-left flex justify-between items-center"
              >
                About Us
                <svg 
                  className={`w-4 h-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileAboutOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/about" className="block py-2 text-sm text-gray-600 dark:text-gray-300" onClick={() => setIsOpen(false)}>
                    About ST Brains Modal College
                  </Link>
                  <Link href="/about/leadership" className="block py-2 text-sm text-gray-600 dark:text-gray-300" onClick={() => setIsOpen(false)}>
                    Leadership Team
                  </Link>
                  <Link href="/about/facilitators" className="block py-2 text-sm text-gray-600 dark:text-gray-300" onClick={() => setIsOpen(false)}>
                    Facilitators
                  </Link>
                </div>
              )}
            </li>

            <li className="py-3">
              <Link href="/courses" className="text-sm font-normal text-gray-800 dark:text-white" onClick={() => setIsOpen(false)}>
                Courses
              </Link>
            </li>
            <li className="py-3">
              <Link href="/gallery" className="text-sm font-normal text-gray-800 dark:text-white" onClick={() => setIsOpen(false)}>
                Gallery
              </Link>
            </li>
            <li className="py-3">
              <Link href="/testimonials" className="text-sm font-normal text-gray-800 dark:text-white" onClick={() => setIsOpen(false)}>
                Testimonials
              </Link>
            </li>
            
            <li className="py-3">
              <button 
                onClick={() => setMobileBlogOpen(!mobileBlogOpen)}
                className="text-sm font-normal text-gray-800 dark:text-white w-full text-left flex justify-between items-center"
              >
                Blog
                <svg 
                  className={`w-4 h-4 transition-transform ${mobileBlogOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileBlogOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/blog" className="block py-2 text-sm text-gray-600 dark:text-gray-300" onClick={() => setIsOpen(false)}>
                    All Posts
                  </Link>
                  <Link href="/blog?category=announcements" className="block py-2 text-sm text-gray-600 dark:text-gray-300" onClick={() => setIsOpen(false)}>
                    Announcements
                  </Link>
                  <Link href="/blog?category=tips" className="block py-2 text-sm text-gray-600 dark:text-gray-300" onClick={() => setIsOpen(false)}>
                    Tips & Guides
                  </Link>
                  <Link href="/blog?category=events" className="block py-2 text-sm text-gray-600 dark:text-gray-300" onClick={() => setIsOpen(false)}>
                    Events
                  </Link>
                </div>
              )}
            </li>

            <li className="py-3">
              <Link href="/enroll" className="text-sm font-normal text-gray-800 dark:text-white" onClick={() => setIsOpen(false)}>
                Enroll Next Session
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}