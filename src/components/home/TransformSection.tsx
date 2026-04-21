'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TransformSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const target = section.querySelector('.js-fill > span') as HTMLElement | null;
    const triggerEl = section.querySelector('.js-fill') as HTMLElement | null;
    const copyEl = section.querySelector('.about-copy') as HTMLElement | null;
    const lottieEl = section.querySelector('.about-lottie') as HTMLElement | null;
    if (!target || !triggerEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(target, { backgroundSize: '200% 200%' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { backgroundSize: '0% 200%' },
        {
          backgroundSize: '200% 200%',
          ease: 'none',
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top 80%',
            end: 'bottom 35%',
            scrub: true,
          },
        }
      );

      if (copyEl) {
        gsap.fromTo(
          copyEl,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: copyEl,
              start: 'top 85%',
            },
          }
        );
      }

      if (lottieEl) {
        gsap.fromTo(
          lottieEl,
          { y: 30, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: lottieEl,
              start: 'top 85%',
            },
          }
        );
      }
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-spacing bg-[var(--bg-primary)] overflow-hidden">
      <Script
        src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
        type="module"
        strategy="afterInteractive"
      />
      <div className="container-custom">
        <div className="relative grid lg:grid-cols-[1.08fr_0.92fr] gap-12 items-center">
          <div className="absolute -top-10 -left-12 h-40 w-40 rounded-full bg-[var(--adeips-blue)]/15 blur-3xl" />
          <div className="absolute -bottom-10 right-0 h-44 w-44 rounded-full bg-[var(--adeips-red)]/15 blur-3xl" />

          <div className="relative z-10 about-copy">
            <p className="text-xs md:text-sm uppercase tracking-[0.34em] text-[var(--adeips-blue)] mb-5">
              About ST Brains
            </p>
            <h2 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-light text-[var(--adeips-navy)] dark:text-white leading-[1.05] tracking-tight mb-6">
              Premium learning. Strong character.
            </h2>

            <p className="js-fill about-fill-text mb-10">
              <span>
                ST Brains Modal College equips every student with academic depth, discipline, and confidence. Through mentorship and consistent standards, we prepare learners to lead in university, career, and life.
              </span>
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="group inline-flex items-center gap-2 rounded-full bg-[#C81D25] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B41820] hover:shadow-[0_14px_30px_rgba(200,29,37,0.38)]">
                Explore Our School
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="/enroll" className="inline-flex items-center gap-2 rounded-full border border-[var(--adeips-navy)]/25 dark:border-white/35 px-7 py-3.5 text-sm font-semibold text-[var(--adeips-navy)] dark:text-white bg-white/50 dark:bg-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80 dark:hover:bg-white/15">
                Enroll Next Session
              </Link>
            </div>
          </div>

          <div className="relative min-h-[320px] md:min-h-[380px] z-10 about-lottie">
            <div className="absolute inset-x-5 inset-y-7 bg-gradient-to-br from-[var(--adeips-blue)]/10 to-[var(--adeips-red)]/10 blur-2xl" />
            <div className="relative h-full">
              <dotlottie-player
                src="/education.lottie"
                background="transparent"
                speed="1"
                style={{ width: '100%', height: '100%' }}
                loop
                autoplay
              ></dotlottie-player>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-fill-text {
          margin: 0;
          font-size: clamp(1.05rem, 1.2vw + 0.85rem, 1.36rem);
          line-height: 1.58;
          letter-spacing: -0.008em;
          font-family: var(--font-outfit), 'Segoe UI', sans-serif;
          font-weight: 400;
          text-wrap: pretty;
        }

        .js-fill > span {
          -webkit-background-clip: text;
          background-clip: text;
          background-color: #94a3b8;
          background-image: linear-gradient(120deg, var(--adeips-navy) 46%, #94a3b8 62%);
          background-position: 0 0;
          background-repeat: no-repeat;
          background-size: 0% 200%;
          color: transparent;
          display: inline;
          will-change: background-size;
        }

        @media (prefers-reduced-motion: reduce) {
          .js-fill > span {
            background-size: 200% 200%;
          }
        }
      `}</style>
    </section>
  );
}