'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { testimonialsData, Testimonial } from '@/data/testimonials';

export default function TestimonialsPage() {
  const [testimonials] = useState<Testimonial[]>(testimonialsData);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check for hash on mount and when hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && testimonials.length > 0) {
        const id = parseInt(hash);
        const testimonial = testimonials.find((t: Testimonial) => t.id === id);
        if (testimonial) {
          setSelectedTestimonial(testimonial);
          setIsModalOpen(true);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [testimonials]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTestimonial(null);
    window.history.pushState(null, '', window.location.pathname);
  };

  const openTestimonial = (testimonial: typeof testimonials[0]) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
    window.history.pushState(null, '', `#${testimonial.id}`);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A1236] pt-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="brand-menu-overlay" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
            alt="Testimonials"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase text-white/90 mb-4 font-semibold"
          >
            Success Stories
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-outfit text-4xl md:text-6xl font-extralight text-white tracking-tight mb-6"
          >
            Testimonials from Students
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/85 max-w-2xl mx-auto"
          >
            Discover the journeys of students who transformed their confidence and academic growth through ST Brains Modal College
          </motion.p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                onClick={() => openTestimonial(testimonial)}
                className="group cursor-pointer"
              >
                <div className="relative rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] bg-white dark:bg-white/5"
                  style={{
                    backdropFilter: 'blur(40px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden rounded-t-[1.5rem]"
                    style={{
                      boxShadow: 'inset 0 -2px 10px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Cohort Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30">
                        {testimonial.cohort}
                      </span>
                    </div>
                    
                    {/* Name on image */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-outfit text-xl font-medium text-white mb-1">{testimonial.name}</h3>
                      <p className="text-sm text-white/80">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 bg-white dark:bg-[#081225]">
                    <p className="text-gray-600 dark:text-white text-sm leading-relaxed line-clamp-3 mb-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#0A1236] dark:text-white">{testimonial.highlight}</span>
                      <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-white/70 group-hover:text-[#0A1236] dark:group-hover:text-white transition-colors font-medium">
                        Read Story
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0A1236] to-[#0D1640]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-3xl md:text-5xl font-extralight text-white mb-6 tracking-tight">
            Ready to Write Your Story?
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
            Join students who are thriving through quality teaching, premium facilities, and top-notch staff.
          </p>
          <Link
            href="/enroll"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl group bg-[#0A1236]"
            style={{
              boxShadow: '0 20px 60px rgba(10, 18, 54, 0.4)',
            }}
          >
            <span className="relative z-10">Begin Your Transformation</span>
            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Full Story Modal */}
      {isModalOpen && selectedTestimonial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[1.5rem] bg-white dark:bg-[#0A1236]/95"
            style={{
              backdropFilter: 'blur(60px) saturate(200%)',
              WebkitBackdropFilter: 'blur(60px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 40px 120px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Hero Image */}
            <div className="relative h-80 md:h-96">
              <Image
                src={selectedTestimonial.image}
                alt={selectedTestimonial.name}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
              
              {/* Profile Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-end gap-6">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                    <Image
                      src={selectedTestimonial.image}
                      alt={selectedTestimonial.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-2 text-slate-800 dark:text-white"
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)',
                      }}
                    >
                      {selectedTestimonial.cohort}
                    </span>
                    <h2 className="font-outfit text-3xl font-medium text-[#0A1236]">{selectedTestimonial.name}</h2>
                    <p className="text-gray-600">{selectedTestimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Highlight */}
              <div className="mb-8 p-6 rounded-2xl border-l-4 bg-slate-50 dark:bg-[#0A1236]/50"
                style={{
                  backdropFilter: 'blur(20px)',
                  borderLeftColor: '#0A1236',
                }}
              >
                <p className="text-lg font-medium text-[#0A1236] dark:text-white">{selectedTestimonial.highlight}</p>
              </div>

              {/* Quote */}
              <blockquote className="mb-8 text-xl text-gray-700 dark:text-white italic border-l-4 border-gray-200 dark:border-white/20 pl-6">
                &ldquo;{selectedTestimonial.quote}&rdquo;
              </blockquote>

              {/* Full Testimony - Shortened */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 dark:text-white leading-relaxed mb-4">
                  {selectedTestimonial.full_testimony.split('\n\n')[0].split(' ').slice(0, -1).join(' ')}...
                </p>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-wrap gap-4 justify-center">
                <Link
                  href={`/testimonials/${selectedTestimonial.id}`}
                  className="px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 bg-[#0A1236]"
                  style={{
                    boxShadow: '0 10px 30px rgba(10, 18, 54, 0.3)',
                  }}
                >
                  View Full Story
                </Link>
                <button
                  onClick={closeModal}
                  className="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 bg-white dark:bg-white/10 text-gray-700 dark:text-white"
                  style={{
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  Back to Stories
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}
