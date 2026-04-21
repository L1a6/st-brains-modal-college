'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80',
    eyebrow: 'Academic Excellence',
    title: 'Building Brilliant Minds For Tomorrow',
    subtitle:
      'A premium secondary school where discipline, innovation, and achievement grow together.',
  },
  {
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80',
    eyebrow: 'Top-Notch Staff',
    title: 'Learn From Dedicated Expert Teachers',
    subtitle:
      'Experienced educators committed to each student’s growth inside and outside the classroom.',
  },
  {
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1920&q=80',
    eyebrow: 'Modern Facilities',
    title: 'Study In Spaces Designed For Success',
    subtitle:
      'From smart classrooms to practical labs, every space is built for confident learning.',
  },
  {
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=1920&q=80',
    eyebrow: 'Character and Leadership',
    title: 'Raise Leaders With Strong Values',
    subtitle:
      'We combine rigorous academics with character development to shape future-ready students.',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Image Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={`Hero slide ${index + 1}`}
              fill
              quality={95}
              sizes="100vw"
              className="object-cover scale-110"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#081A3C]/90 via-[#183A8C]/76 to-[#4D0C0C]/76" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.1),transparent_48%)]" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-5xl px-6 md:px-12">
          <p className="text-xs md:text-sm font-normal tracking-[0.3em] uppercase text-white/90 mb-6 animate-[fadeInUp_1.2s_ease_0.3s_both]">
            {slides[currentSlide].eyebrow}
          </p>

          <h1 className="font-outfit text-4xl sm:text-5xl md:text-7xl lg:text-6xl xl:text-7xl font-light text-white mb-8 md:mb-12 tracking-tight leading-[1.15] [text-shadow:0_4px_24px_rgba(0,0,0,0.45)] animate-[fadeInUp_1.8s_ease_0.8s_both]">
            {slides[currentSlide].title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-normal text-white mb-12 md:mb-16 max-w-3xl mx-auto [text-shadow:0_3px_18px_rgba(0,0,0,0.35)] animate-[fadeInUp_1.8s_ease_1.1s_both]">
            {slides[currentSlide].subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-[fadeInUp_1.2s_ease_1.2s_both]">
            <Link href="/enroll" className="group relative px-10 py-4 rounded-full text-sm font-semibold text-white bg-[var(--adeips-blue)] transition-all duration-400 hover:-translate-y-0.5 hover:scale-[1.02] shadow-[0_14px_40px_rgba(37,99,235,0.35)] text-center overflow-hidden">
              <span className="relative z-10">Enroll for Next Session</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-[140%] group-hover:translate-x-[140%] transition-transform duration-700" />
            </Link>

            <Link href="/gallery" className="group relative px-10 py-4 rounded-full text-sm font-semibold text-white/95 border border-white/45 bg-white/10 backdrop-blur-md transition-all duration-400 hover:-translate-y-0.5 hover:bg-white/18 text-center">
              <span className="relative z-10 inline-flex items-center gap-2">
                Explore Campus
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Simple thin arrow */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer group animate-[scrollPulse_2s_ease-in-out_infinite]"
        aria-label="Scroll down"
      >
        <svg 
          width="20" 
          height="32" 
          viewBox="0 0 20 32" 
          fill="none" 
          className="opacity-80 group-hover:opacity-100 transition-opacity"
        >
          <line x1="10" y1="0" x2="10" y2="24" stroke="white" strokeWidth="1.5"/>
          <polyline points="5 19 10 24 15 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </button>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scrollPulse {
          0%, 100% { 
            transform: translateY(0);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(8px);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}