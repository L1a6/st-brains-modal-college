'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { leadershipTeam } from '@/data/leadership';

export default function LeadershipPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-[#0A1236] dark:via-[#0d1a40] dark:to-[#0A1236] pt-24">
      {/* Hero Section - Uniform with Gallery/Facilitators */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="brand-menu-overlay"></div>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80"
            alt="Leadership"
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
            Our Leadership
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-outfit text-4xl md:text-6xl font-extralight text-white tracking-tight"
          >
            Guiding Excellence
          </motion.h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Our leadership team brings together decades of experience in education and school administration, driving ST Brains Modal College toward lasting excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {leadershipTeam.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-700 border border-gray-100 dark:border-gray-700/50">
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A1236]/0 via-transparent to-[#E62A2A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
                
                {/* Image container with premium effects */}
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  
                  {/* Floating title badge on image */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <motion.div 
                      className="inline-block px-4 py-1.5 rounded-full mb-3"
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      <span className="text-xs font-medium text-white tracking-wider uppercase">{member.title}</span>
                    </motion.div>
                    <h3 className="font-outfit text-3xl font-light text-white tracking-tight">
                      {member.name}
                    </h3>
                  </div>
                </div>
                
                {/* Content section */}
                <div className="p-8 relative">
                  {member.bio && (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                      {member.bio}
                    </p>
                  )}
                  
                  {/* Decorative line */}
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-[#0A1236]/20 via-[#E62A2A]/30 to-transparent dark:from-white/20 dark:via-[#E62A2A]/30"></div>
                      <span className="text-xs font-medium text-[#0A1236] dark:text-white/60 tracking-widest uppercase">School Leadership</span>
                    </div>
                  </div>
                </div>

                {/* Premium corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#E62A2A]/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[#0A1236]/10 to-transparent dark:from-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1236] to-[#1a2d5c] rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-[#0A1236] to-[#0d1a40] rounded-3xl p-12 md:p-16 border border-white/10">
              <h3 className="font-outfit text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
                Join Our Vision
              </h3>
              <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
                Become part of an institution dedicated to transforming lives through the power of exceptional communication.
              </p>
              <a
                href="/enroll"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#0A1236] font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span>Start Your Journey</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}