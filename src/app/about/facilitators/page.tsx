'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { facilitators } from '@/data/facilitators';

export default function FacilitatorsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0A1236] pt-24">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="brand-menu-overlay"></div>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80"
            alt="Facilitators"
            fill
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
            Our Facilitators
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-outfit text-4xl md:text-6xl font-extralight text-white tracking-tight"
          >
            Expert Teachers
          </motion.h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our teachers are seasoned educators who combine subject mastery with student-focused mentoring in every class.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilitators.map((facilitator, index) => (
            <motion.div
              key={facilitator.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src={facilitator.image}
                  alt={facilitator.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-outfit text-2xl font-medium text-white mb-2">
                    {facilitator.name}
                  </h3>
                  <p className="text-sm text-white/80 mb-3">
                    {facilitator.title}
                  </p>
                  {facilitator.specializations && (
                    <div className="flex flex-wrap gap-2">
                      {facilitator.specializations.map((spec, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}