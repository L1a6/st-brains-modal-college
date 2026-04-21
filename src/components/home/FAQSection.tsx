'use client';

import { useState } from 'react';
import Image from 'next/image';

const faqs = [
  {
    question: 'What experience level is required?',
    answer: 'No prior experience needed. Our programs cater to beginners and advanced speakers with personalized coaching to meet you at your current level and elevate your skills.',
  },
  {
    question: 'How long is the program?',
    answer: 'Our flagship program runs for 10 weeks with intensive weekend sessions. We also offer accelerated programs and ongoing workshops for continued development.',
  },
  {
    question: 'Is certification provided?',
    answer: 'Yes. Students receive graduation documentation and academic records aligned with approved secondary school standards.',
  },
  {
    question: 'What is the class size?',
    answer: 'We maintain intimate cohorts of 12-15 participants to ensure personalized attention, meaningful feedback, and strong peer connections that last beyond graduation.',
  },
  {
    question: 'What is the investment required?',
    answer: 'Our 10-week program represents a career-transforming investment. Contact us for detailed pricing and flexible payment plans designed for working professionals.',
  },
  {
    question: 'Are there scholarship opportunities?',
    answer: 'Yes, we offer merit-based scholarships and early-bird discounts for qualified applicants. Apply early to maximize your chances of receiving financial assistance.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-spacing bg-[var(--bg-secondary)]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="relative opacity-0 animate-slide-in-left">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80"
                alt="Support"
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A1F44]/95 via-[#0A1F44]/85 to-transparent p-8">
                <h3 className="text-white font-semibold text-xl mb-4">Contact Us</h3>
                
                <div className="space-y-3 text-white/90 text-sm">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>admissions@stbrainsmodalcollege.edu.ng</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+234 810 000 0000</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>+234 810 000 0000</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Wellington Bassey Rd, Uyo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-outfit text-4xl md:text-5xl font-extralight text-[var(--adeips-navy)] dark:text-[var(--text-primary)] mb-12 tracking-tight opacity-0 animate-slide-in-right">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 opacity-0 animate-fade-in animate-delay-300">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-[var(--glass-border)] pb-4"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex justify-between items-center text-left group"
                  >
                    <span className="text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--adeips-red)] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <span
                      className={`text-2xl text-[var(--adeips-red)] transition-transform duration-300 flex-shrink-0 ${
                        openIndex === index ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${
                      openIndex === index ? 'max-h-96 mt-4' : 'max-h-0'
                    }`}
                  >
                    <p className="text-[var(--text-secondary)] leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}