'use client';

import Image from 'next/image';
import Link from 'next/link';
import { facilitators } from '@/data/facilitators';

export default function StaffSection() {
  const featuredStaff = facilitators.slice(0, 3);

  return (
    <section className="section-spacing bg-[var(--bg-primary)] overflow-hidden">
      <div className="container-custom">
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.32em] text-[var(--adeips-blue)] mb-4">
            Meet Our Staff
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl lg:text-6xl font-light text-[var(--adeips-navy)] dark:text-white tracking-tight mb-4">
            Exceptional Educators, Real Mentors
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-3xl mx-auto">
            Our facilitators combine academic depth with personal mentorship to help every student grow with confidence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredStaff.map((staff) => (
            <article
              key={staff.id}
              className="group relative min-h-[440px] overflow-hidden rounded-[2rem] border border-[var(--adeips-blue)]/15 shadow-[0_20px_50px_rgba(10,31,68,0.14)]"
            >
              <Image
                src={staff.image}
                alt={staff.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071734]/95 via-[#071734]/45 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-br from-[var(--adeips-red)]/20 via-transparent to-[var(--adeips-blue)]/20" />

              <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/90">
                Staff Profile
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                <h3 className="font-outfit text-2xl font-medium text-white tracking-tight mb-1">
                  {staff.name}
                </h3>
                <p className="text-white/80 text-sm mb-4">{staff.title}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {(staff.specializations || []).slice(0, 2).map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs text-white/95"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <Link
                  href="/about/facilitators"
                  className="inline-flex items-center gap-2 rounded-full bg-[#C81D25] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#B41820] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(200,29,37,0.4)]"
                >
                  View Staff Team
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
