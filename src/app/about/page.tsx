'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#08132B] pt-24">
      <Script
        src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
        type="module"
        strategy="afterInteractive"
      />

      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="brand-menu-overlay" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80"
            alt="ST Brains Modal College"
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
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-outfit text-4xl md:text-6xl font-extralight text-white tracking-tight"
          >
            ST Brains Modal College
          </motion.h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-[#F7FAFF] dark:bg-[#0D1D3D] p-6 md:p-8 border border-blue-100 dark:border-blue-900/50"
          >
            <div className="w-full h-[320px] md:h-[420px]">
              <dotlottie-player
                src="/education.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-outfit text-3xl md:text-5xl font-light text-[var(--adeips-navy)] dark:text-white mb-6 tracking-tight">
              A Brief Look at Our School
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              ST Brains Modal College is a premium secondary school dedicated to raising excellent students through quality teaching, strong discipline, and modern learning support.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Our school is located at Wellington Bassey Rd, Uyo, and we are proud of our reputation for top-notch staff, safe learning spaces, and premium facilities that help students thrive.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              We combine academic rigor with character development so every student grows into a confident, responsible, and future-ready leader.
            </p>

            <div className="space-y-3 text-[var(--adeips-navy)] dark:text-blue-100 font-medium">
              <p>Location: Wellington Bassey Rd, Uyo</p>
              <p>Brand Colors: Blue, Red, and White</p>
              <p>Standard: Premium facilities and top-notch staff</p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium text-white bg-[var(--adeips-blue)] hover:bg-[#1D4ED8] transition-all duration-300"
              >
                View Our Facilities
              </Link>
              <Link
                href="/enroll"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium text-[var(--adeips-navy)] bg-white border border-[var(--adeips-red)]/30 hover:bg-red-50/60 transition-all duration-300"
              >
                Enroll Next Session
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
