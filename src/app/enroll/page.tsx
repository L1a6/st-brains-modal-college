'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { safeJsonFetch } from '@/lib/safeJsonFetch';

interface SiteSettings {
  registration_open: boolean;
  current_cohort: number;
  cohort_message: string;
}

function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export default function EnrollPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | 'no-email'>(false);
  const [submitError, setSubmitError] = useState('');
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await safeJsonFetch<{ settings?: SiteSettings }>('/api/settings');
      if (data.settings) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      // Default to open if fetch fails
      setSettings({ registration_open: true, current_cohort: 15, cohort_message: '' });
    } finally {
      setLoadingSettings(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = response.headers.get('content-type')?.includes('application/json')
        ? await response.json()
        : { error: 'Unexpected non-JSON response from enrollment endpoint' };
      
      if (!response.ok) {
        const errorMsg = data.details || data.error || 'Submission failed';
        throw new Error(errorMsg);
      }
      
      setSubmitSuccess(data.emailsSent ? true : 'no-email');
      setFormData({ fullName: '', email: '', phone: '', message: '' });
      
      if (!data.emailsSent && data.emailError) {
        console.warn('Email notification failed:', data.emailError);
      }
      
      setTimeout(() => setSubmitSuccess(false), 8000);
    } catch (error) {
      console.error('Enrollment error:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Failed to submit application. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A1236] pt-24">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="brand-menu-overlay"></div>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
            alt="Enroll"
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
            {settings?.current_cohort ? `${settings.current_cohort}${getOrdinalSuffix(settings.current_cohort)} Cohort` : 'Join Us'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-outfit text-4xl md:text-6xl font-extralight text-white tracking-tight"
          >
            Start Your Journey
          </motion.h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        {/* Registration Closed Notice */}
        <AnimatePresence>
          {!loadingSettings && settings && !settings.registration_open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A1236] via-[#1a2e5a] to-[#0A1236] p-8 md:p-12 mb-12 shadow-2xl"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E62A2A]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h2 className="font-outfit text-3xl md:text-4xl font-extralight text-white mb-4">
                  Registration Temporarily Closed
                </h2>
                
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  We are not currently accepting new applications for this cohort. Please check back soon or follow us on social media for announcements about our next enrollment period.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#0A1236] font-medium hover:bg-gray-100 transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
                  >
                    <span>Back to Home</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </a>
                  <a
                    href="/courses"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium hover:bg-white/20 transition-all duration-300"
                  >
                    <span>View Courses</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Registration Form - Only show when open */}
        {(loadingSettings || (settings && settings.registration_open)) && (
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-outfit text-3xl font-light text-gray-900 dark:text-white mb-6">
                Ready to Join ST Brains Modal College?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Take the first step toward premium secondary education. Fill out the form and our admissions team will contact you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0A1236]/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#0A1236] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-outfit text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Experienced Teachers
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Learn from top-notch staff dedicated to academic excellence.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0A1236]/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#0A1236] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-outfit text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Small Class Sizes
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Personalized attention in intimate learning environments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0A1236]/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#0A1236] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-outfit text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Academic Records
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Receive complete academic records and graduation documentation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1236] dark:focus:ring-white transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1236] dark:focus:ring-white transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1236] dark:focus:ring-white transition-all"
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1236] dark:focus:ring-white transition-all resize-none"
                    placeholder="Tell us about your goals and expectations..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 rounded-full text-sm font-medium text-white bg-[#0A1236] dark:bg-white dark:text-[#0A1236] hover:bg-[#0A1236]/90 dark:hover:bg-gray-100 transition-all duration-400 hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-500 dark:border-emerald-600 shadow-lg"
                  >
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-emerald-800 dark:text-emerald-200 font-medium mb-1">
                          Application submitted successfully!
                        </p>
                        <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                          {submitSuccess === 'no-email' 
                            ? 'We have received your application. Our team will contact you soon.'
                            : 'Check your email for confirmation. Our team will contact you within 24 hours.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  >
                    <p className="text-red-800 dark:text-red-200 text-sm">
                      {submitError}
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </section>
    </main>
  );
}