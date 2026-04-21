'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const courseModules = [
  {
    id: 1,
    title: 'Cognitive Architecture of Opening - Closing For Impact',
    description: 'An advanced exploration of how memory sequencing, psychological anchoring, and impression hierarchies shape audience retention and persuasion.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    category: 'Psychology',
    duration: 'Comprehensive Module',
  },
  {
    id: 2,
    title: 'Executive Presence and High Impact Platform Dynamics',
    description: 'Mastery of stage psychology, kinaesthetic communication, posture engineering, and audience synchronization strategies for commanding any room.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    category: 'Leadership',
    duration: 'Advanced Training',
  },
  {
    id: 3,
    title: 'Linguistic Precision and Advanced Standard English Competence',
    description: 'Intensive training in phonological accuracy, syntactic refinement, strategic diction, and professional articulation for elite communicators.',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80',
    category: 'Language',
    duration: 'Intensive Program',
  },
  {
    id: 4,
    title: 'Neurocognitive Memory Optimisation for Orators',
    description: 'Cutting edge memory enhancement systems, retrieval pathways, and content internalization frameworks tailored for high pressure speaking environments.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
    category: 'Neuroscience',
    duration: 'Comprehensive Module',
  },
  {
    id: 5,
    title: 'Structural Transition Mechanics and Rhetorical Flow Design',
    description: 'Techniques for engineering seamless narrative progression, conceptual linkage, and logical coherence in extended presentations.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    category: 'Structure',
    duration: 'Full Program',
  },
  {
    id: 6,
    title: 'Applied Psychophysiology of Confidence and Stage Anxiety Dissolution',
    description: 'A scientific, stepwise methodology for deconstructing performance anxiety using behavioral conditioning, cognitive reframing, and somatic control.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    category: 'Psychology',
    duration: 'Core Module',
  },
  {
    id: 7,
    title: 'Vocal Engineering and Acoustic Expression Mastery',
    description: 'Development of tonal modulation, breath economy, resonance control, pacing intelligence, and expressive vocal architecture.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80',
    category: 'Voice',
    duration: 'Advanced Training',
  },
  {
    id: 8,
    title: 'Global Communication Protocols and Universal Laws of Public Speaking',
    description: 'Examination of internationally recognized principles, cross cultural speaking protocols, and the ethics of global public discourse.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    category: 'Global',
    duration: 'Comprehensive Module',
  },
  {
    id: 9,
    title: 'Strategic Oratory Design and High Level Speech Structuring',
    description: 'Frameworks for conceptual mapping, narrative construction, intellectual layering, and persuasive message engineering.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    category: 'Strategy',
    duration: 'Full Program',
  },
  {
    id: 10,
    title: 'Applied Executive Speechcraft Laboratory',
    description: 'Practical development of professional speech formats including ceremonial texts, leadership addresses, technical presentations, persuasive pitches, valedictory frameworks, eulogic constructs, and formal institutional communications.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    category: 'Practice',
    duration: 'Intensive Program',
  },
];

export default function CoursesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <main ref={containerRef} className="min-h-screen bg-white dark:bg-[#0A1236] pt-24">
      {/* Hero Section - Matching Gallery/About Style */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="brand-menu-overlay"></div>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1920&q=90"
            alt="Courses"
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
            Our Courses
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-outfit text-4xl md:text-6xl font-extralight text-white tracking-tight"
          >
            Transform Your Speaking Journey
          </motion.h1>
        </div>
      </section>

      {/* Modules Grid - Cinematic Layout */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {courseModules.map((module, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: '-100px' }}
                className="mb-32 last:mb-0"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                  {/* Image Side */}
                  <div className={`relative ${isEven ? '' : 'lg:col-start-2'}`}>
                    <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden">
                      <Image
                        src={module.image}
                        alt={module.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1236]/80 via-[#0A1236]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      
                      {/* Floating Number */}
                      <div className="absolute top-8 left-8">
                        <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                          <span className="font-outfit text-4xl font-light text-white">
                            {module.id.toString().padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-8 right-8">
                        <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
                          <span className="text-sm font-medium text-white">{module.category}</span>
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-8 right-8">
                        <div className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-xl">
                          <span className="text-sm font-medium text-[#0A1236]">{module.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#0A1236]/5 dark:bg-white/5">
                        <span className="text-sm font-medium text-[#0A1236] dark:text-white">
                          Module {module.id}
                        </span>
                      </div>
                      
                      <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-6 leading-[1.2]">
                        {module.title}
                      </h2>
                      
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {module.description}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
                          <svg className="w-5 h-5 text-[#0A1236] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {module.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
                          <svg className="w-5 h-5 text-[#0A1236] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Certificate Included
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
            alt="Join ST Brains Modal College"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0A1236]/95" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-outfit text-4xl md:text-6xl font-extralight text-white mb-6 leading-tight">
              Begin Your<br />Transformation
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join ST Brains Modal College and build a strong academic foundation in a learning environment designed for excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/enroll"
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#0A1236] hover:bg-gray-100 transition-all duration-500 hover:scale-105 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative font-medium">Enroll Now</span>
                <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-500"
              >
                <span className="font-medium">Learn More</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}