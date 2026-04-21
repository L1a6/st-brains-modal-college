'use client';

import { createElement } from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Script from 'next/script';

const spokenPhrases = [
  'You can excel.',
  'You can lead.',
  'You can innovate.',
  'You can achieve.',
  'Your future starts here.',
  'Discipline creates greatness.',
  'Excellence is our culture.',
  'Learning never stops.',
];

export default function ClosingSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % spokenPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[var(--bg-secondary)] transition-colors duration-500">
      <Script
        src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
        type="module"
        strategy="afterInteractive"
      />

      
      {/* ===== SUBTLE BACKGROUND FOR LIGHT/DARK ===== */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.18),transparent_40%),radial-gradient(circle_at_82%_75%,rgba(220,38,38,0.16),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,31,68,0.06),transparent_45%,rgba(220,38,38,0.08))]" />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-10 md:py-12 lg:py-14">
        
        {/* Lottie Animation with Single Floating Phrase */}
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Lottie Animation Container */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Single Floating Phrase - One at a time */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhrase}
                  className="absolute right-[5%] md:right-[-10%] top-[20%] md:top-[25%]"
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ 
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: 30, 
                    y: -10,
                    scale: 0.9 
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <span className="text-[10px] md:text-sm font-light text-gray-500 dark:text-white/60 tracking-[0.1em] md:tracking-[0.15em] uppercase whitespace-nowrap">
                    {spokenPhrases[currentPhrase]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Lottie Player */}
            <div className="w-[300px] h-[300px] md:w-[430px] md:h-[430px] lg:w-[500px] lg:h-[500px]">
              {createElement('dotlottie-player', {
                src: '/education new color scheme.lottie',
                loop: true,
                autoplay: true,
                speed: '1.12',
                style: { width: '100%', height: '100%' },
              })}
            </div>

            {/* Static glow behind animation */}
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-[var(--adeips-blue)]/20 via-transparent to-[var(--adeips-red)]/20 blur-3xl opacity-50" />
          </motion.div>
        </div>

        {/* ===== BLENDED CTA (NO BOX) ===== */}
        <motion.div
          className="relative mt-4 md:mt-8 lg:mt-10 w-full max-w-3xl mx-auto text-center px-2"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[var(--text-secondary)] mb-3">
            Enroll For The Next Session
          </p>

          <h2 className="font-outfit text-3xl md:text-5xl lg:text-6xl font-extralight text-[var(--adeips-navy)] dark:text-white mb-4 tracking-tight">
            Your Future Starts Here
          </h2>

          <p className="text-[var(--text-secondary)] text-sm md:text-base mb-8 font-light max-w-xl mx-auto">
            Join a premium secondary school with top-notch staff, modern facilities, and a culture of excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/enroll"
              className="group relative px-12 py-4 rounded-full bg-[var(--adeips-blue)] text-white font-medium text-center overflow-hidden transition-all duration-700 hover:shadow-[0_18px_50px_rgba(37,99,235,0.35)] hover:scale-[1.02]"
            >
              <span className="relative z-10 text-sm tracking-wide">Start Admission</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </Link>

            <Link
              href="/gallery"
              className="group relative px-12 py-4 rounded-full font-medium text-center transition-all duration-700 hover:scale-[1.02] overflow-hidden border border-[var(--adeips-red)]/30 text-[var(--adeips-navy)] dark:text-white hover:bg-[var(--adeips-red)]/10"
            >
              <span className="relative z-10 text-sm tracking-wide flex items-center justify-center gap-2">
                View Facilities
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.4 }}
        />
      </div>

      {/* CSS Animations for performance */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
