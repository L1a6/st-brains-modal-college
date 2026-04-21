'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { safeJsonFetch } from '@/lib/safeJsonFetch';

interface SiteSettings {
  registration_open: boolean;
  current_cohort: number;
  cohort_message: string;
}

export default function EnrollSection() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await safeJsonFetch<{ settings?: SiteSettings }>('/api/settings');
        if (data.settings) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const getCohortTitle = () => {
    return 'Enroll for the Next Session';
  };

  const getCohortMessage = () => {
    if (settings?.cohort_message) {
      return settings.cohort_message;
    }
    return 'Admissions are now open for students ready to thrive in a premium secondary school with modern facilities and top-notch staff.';
  };

  return (
    <section id="enroll" className="relative h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80"
          alt="Enroll for next session"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F44]/60 via-[#1E3A8A]/55 to-[#0A1F44]/60" />

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl px-6">
          <h2 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6 tracking-tight leading-[1.15] opacity-0 animate-fade-in-up">
            {getCohortTitle()}
          </h2>
          
          <p className="text-lg md:text-xl text-white/95 mb-10 font-light leading-relaxed max-w-2xl mx-auto opacity-0 animate-fade-in animate-delay-200">
            {getCohortMessage()}
          </p>

          <div className="opacity-0 animate-scale-in animate-delay-400">
            <a
              href="/enroll"
              className="inline-block px-10 py-4 rounded-full text-sm font-medium bg-[#E62A2A] text-white transition-all duration-400 hover:bg-[#D12020] hover:-translate-y-0.5 shadow-lg hover:shadow-xl hover:shadow-red-500/30"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}