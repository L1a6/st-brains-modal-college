'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { testimonialsData, Testimonial } from '@/data/testimonials';

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [testimonials] = useState<Testimonial[]>(testimonialsData);

  // Auto-scroll animation effect - MUST be called before any early returns
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let lastTime = Date.now();

    const animate = () => {
      if (!isPausedRef.current && scrollContainer) {
        const currentTime = Date.now();
        const delta = currentTime - lastTime;
        
        scrollContainer.scrollLeft += (delta / 1000) * 50;

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
        
        lastTime = currentTime;
      } else {
        lastTime = Date.now();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? 260 : 380;
      const newScroll = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
      
      isPausedRef.current = true;
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => {
        isPausedRef.current = false;
      }, 2000);
    }
  }, []);

  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="section-spacing bg-[var(--bg-primary)] overflow-hidden">
      <div className="container-custom mb-8 md:mb-16">
        <h2 className="font-outfit text-3xl md:text-5xl lg:text-6xl font-extralight text-[var(--adeips-navy)] dark:text-[var(--text-primary)] text-center mb-3 md:mb-4 tracking-tight opacity-0 animate-fade-in-up">
          Testimonials from Students
        </h2>
        <p className="text-center text-[var(--text-secondary)] text-base md:text-lg opacity-0 animate-fade-in animate-delay-200 px-4">
          Real stories from students of ST Brains Modal College
        </p>
      </div>

      <div className="relative">
        {/* Liquid Glass Navigation Arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
          aria-label="Scroll left"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 text-[var(--adeips-navy)] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
          aria-label="Scroll right"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 text-[var(--adeips-navy)] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-scroll scrollbar-hide px-4 md:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
            setHoveredCard(null);
          }}
          onTouchStart={() => {
            isPausedRef.current = true;
          }}
          onTouchEnd={() => {
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
            pauseTimeoutRef.current = setTimeout(() => {
              isPausedRef.current = false;
            }, 3000);
          }}
        >
          {doubledTestimonials.map((testimonial, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard(index)}
              className="group relative w-[240px] h-[320px] md:w-[340px] md:h-[440px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2"
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                quality={95}
                priority={index < 4}
                sizes="(max-width: 768px) 240px, 340px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Content overlay - shows on hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-[#0A1F44]/95 via-[#0A1F44]/70 to-[#0A1F44]/20 flex flex-col justify-end p-4 md:p-6 transition-all duration-500 ${
                  hoveredCard === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                <p className="text-white text-sm md:text-base mb-3 md:mb-4 leading-relaxed font-light line-clamp-3">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mb-3">
                  <h4 className="text-white font-semibold text-base md:text-lg">{testimonial.name}</h4>
                  <p className="text-white/80 text-xs md:text-sm">{testimonial.role}</p>
                </div>
                
                {/* Read More Link */}
                <Link 
                  href={`/testimonials/${testimonial.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="inline-flex items-center gap-2 text-white/90 text-xs md:text-sm font-medium hover:text-white transition-colors w-fit relative z-50"
                >
                  <span>Read More</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Default state with name at bottom */}
              <div 
                className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#0A1F44]/90 to-transparent transition-opacity duration-400 ${
                  hoveredCard === index ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <h4 className="text-white font-semibold text-base md:text-lg">{testimonial.name}</h4>
                <p className="text-white/80 text-xs md:text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}