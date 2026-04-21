'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { facilitators } from '@/data/facilitators';

type StaffCard = {
  id: string;
  name: string;
  title: string;
  image: string;
  status: 'Online' | 'Offline';
  rating: string;
  learners: string;
  description: string;
  specializations: string[];
};

export default function StaffSection() {
  const initialCards = useMemo<StaffCard[]>(
    () =>
      facilitators.slice(0, 3).map((staff, index) => ({
        id: staff.id,
        name: staff.name,
        title: staff.title,
        image: staff.image,
        status: index === 2 ? 'Offline' : 'Online',
        rating: index === 0 ? '4.8' : index === 1 ? '4.6' : '4.9',
        learners: index === 0 ? '3.1K' : index === 1 ? '2.4K' : '1.7K',
        description:
          index === 0
            ? 'Builds confident communicators and academic leaders.'
            : index === 1
              ? 'Designs high-impact learning pathways across core subjects.'
              : 'Drives practical science coaching and analytical growth.',
        specializations: staff.specializations || [],
      })),
    []
  );

  const [cards, setCards] = useState<StaffCard[]>(initialCards);
  const [dragId, setDragId] = useState<string | null>(null);
  const [handleReadyId, setHandleReadyId] = useState<string | null>(null);

  const play = (file: string, volume = 0.45) => {
    const audio = new Audio(file);
    audio.volume = volume;
    void audio.play().catch(() => {});
  };

  const handleDragStart = (id: string) => (event: React.DragEvent<HTMLDivElement>) => {
    if (handleReadyId !== id) {
      event.preventDefault();
      return;
    }

    setDragId(id);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', id);
    play('https://cdn.freesound.org/previews/582/582898_5965684-lq.mp3');
  };

  const handleDrop = (targetId: string) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData('text/plain') || dragId;
    if (!sourceId || sourceId === targetId) {
      setDragId(null);
      return;
    }

    setCards((previous) => {
      const sourceIndex = previous.findIndex((item) => item.id === sourceId);
      const targetIndex = previous.findIndex((item) => item.id === targetId);
      if (sourceIndex < 0 || targetIndex < 0) return previous;

      const next = [...previous];
      const [moved] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });

    play('https://cdn.freesound.org/previews/370/370962_5450487-lq.mp3');
    setDragId(null);
  };

  return (
    <section className="section-spacing bg-[var(--bg-primary)] overflow-hidden staff-ux">
      <div className="container-custom">
        <div className="mb-10 md:mb-14 text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.32em] text-[var(--adeips-blue)] mb-4">
            Meet Our Staff
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl lg:text-6xl font-light text-[var(--adeips-navy)] dark:text-white tracking-tight mb-4">
            Meet the People Behind the School
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-3xl mx-auto">
            Our facilitators pair academic depth with steady mentorship and a strong school culture.
          </p>
        </div>

        <section className="staff-cards" aria-label="Draggable staff cards">
          {cards.map((staff) => (
            <div
              key={staff.id}
              draggable
              onDragStart={handleDragStart(staff.id)}
              onDragEnd={() => {
                setDragId(null);
                setHandleReadyId(null);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop(staff.id)}
              className={`card-wrap ${dragId === staff.id ? 'is-dragging' : ''}`}
            >
              <article className="card">
                <div className="card-filter" />
                <Image
                  src={staff.image}
                  alt={staff.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="card-bg"
                />

                <div className="card-status">
                  <div className={`card-status-dot ${staff.status === 'Online' ? 'online' : 'offline'}`} />
                  <div className="card-status-text">{staff.status}</div>
                </div>

                <div
                  className="card-handle grab"
                  onMouseDown={() => setHandleReadyId(staff.id)}
                  onMouseUp={() => setHandleReadyId(null)}
                  onMouseLeave={() => setHandleReadyId(null)}
                  aria-label="Drag card"
                  role="button"
                  tabIndex={0}
                >
                  <svg className="handle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01" />
                  </svg>
                </div>

                <div className="card-content">
                  <div className="card-name-wrap">
                    <div className="card-name">{staff.name}</div>
                    <div className="card-verified" aria-label="Verified" role="img">
                      ✓
                    </div>
                  </div>

                  <p className="card-subtitle">{staff.title}</p>

                  <div className="card-tags">
                    <div className="card-tag">
                      <div className="card-rating-text">{staff.rating}</div>
                      <div className="card-rating-stars">★★★★★</div>
                    </div>
                    <div className="card-tag">
                      <div className="card-rating-text">{staff.learners}</div>
                    </div>
                  </div>

                  <div className="card-description">{staff.description}</div>

                  <Link href="/about/facilitators" className="card-button pointer">
                    <div className="card-button-text pointer">Get In Touch</div>
                    <div className="card-button-call pointer">
                      <svg className="card-button-call-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </Link>
                </div>

                <div className="card-fade" />
              </article>
            </div>
          ))}

        </section>

        <footer className="staff-footer">
          <a className="follow" href="/about/facilitators">
            <div className="staff-by">MEET THE FULL TEAM</div>
            <div className="follow-text">Explore all facilitators</div>
          </a>
        </footer>
      </div>

      <style jsx>{`
        .staff-ux {
          --staff-red: var(--adeips-red);
          --staff-red-hover: #b91c1c;
          --radius: 2rem;
          --anim: cubic-bezier(0, 0, 0.25, 1);
        }

        .staff-footer {
          display: flex;
          justify-content: center;
        }

        .staff-footer {
          margin-top: 2.2rem;
        }

        .staff-made,
        .follow {
          color: var(--adeips-navy);
          text-align: center;
          display: flex;
          flex-flow: column;
          gap: 0.15rem;
          text-decoration: none;
        }

        .staff-by {
          font-size: 0.62rem;
          letter-spacing: 0.2rem;
          opacity: 0.65;
          text-transform: uppercase;
        }

        .follow-text {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .staff-cards {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          width: 100%;
        }

        .card-wrap {
          position: relative;
          transition: transform 0.25s var(--anim);
        }

        .card-wrap.is-dragging {
          transform: rotate(3deg) scale(0.98);
          z-index: 20;
        }

        .card-filter {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.12);
          z-index: 8;
          pointer-events: none;
          backdrop-filter: blur(0.2rem);
          opacity: 0;
          transition: opacity 0.2s var(--anim);
        }

        .card-wrap:hover .card-filter,
        .card-wrap.is-dragging .card-filter {
          opacity: 1;
        }

        .card {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-end;
          height: 24rem;
          width: 15rem;
          padding: 1rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: var(--radius);
          box-shadow: 0 0.45rem 1rem rgba(10, 31, 68, 0.2);
          position: relative;
          transition: transform 0.3s var(--anim), box-shadow 0.3s var(--anim);
          background: #071734;
        }

        .card-wrap:hover .card {
          transform: translateY(-4px);
          box-shadow: 0 1rem 2rem rgba(10, 31, 68, 0.28);
        }

        .card-bg {
          object-fit: cover;
          z-index: 0;
          transition: transform 0.8s ease;
        }

        .card-wrap:hover .card-bg {
          transform: scale(1.08);
        }

        .card-content {
          position: relative;
          z-index: 3;
          padding: 0 0.15rem;
          width: 100%;
        }

        .card-status {
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(0.45rem);
          width: 5rem;
          height: 1.5rem;
          border-radius: 999px;
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 4;
          color: #fff;
        }

        .card-status-dot {
          height: 0.32rem;
          width: 0.32rem;
          border-radius: 50%;
          margin-right: 0.6rem;
          position: relative;
        }

        .card-status-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          background: inherit;
          border-radius: 50%;
          animation: pulse 1s var(--anim) infinite;
        }

        .card-status-dot.online {
          background: mediumseagreen;
        }

        .card-status-dot.offline {
          background: #8b93a6;
        }

        .card-status-dot.offline::after {
          animation: none;
        }

        .card-status-text {
          font-size: 0.7rem;
          opacity: 0.88;
        }

        .card-handle {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(0.2rem);
          position: absolute;
          top: 1rem;
          right: 1rem;
          height: 2.5rem;
          width: 2.5rem;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #111;
          z-index: 5;
        }

        .handle {
          width: 1.25rem;
          height: 1.25rem;
        }

        .card-name-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          margin: 0.75rem 0;
          color: #fff;
        }

        .card-name {
          font-size: 1.1rem;
          font-weight: 700;
          margin-right: 0.4rem;
        }

        .card-subtitle {
          color: rgba(255, 255, 255, 0.82);
          font-size: 0.76rem;
          margin: 0.15rem 0 0.55rem;
          letter-spacing: 0.01em;
          text-transform: uppercase;
        }

        .card-verified {
          font-size: 0.95rem;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
        }

        .card-tags {
          display: flex;
          margin: 0.4rem 0;
        }

        .card-tag {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(0.4rem);
          padding: 0.28rem 0.5rem;
          border-radius: 999px;
          font-size: 0.72rem;
          margin-right: 0.45rem;
          color: #fff;
        }

        .card-rating-text {
          margin-right: 0.35rem;
        }

        .card-rating-stars {
          font-size: 0.5rem;
          letter-spacing: 0.02rem;
        }

        .card-description {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.74rem;
          line-height: 1.45;
          font-weight: 300;
          margin: 0.4rem 0 0.65rem 0;
        }

        .card-button {
          padding: 0.28rem 0.28rem 0.28rem 0.55rem;
          border-radius: 1.15rem;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 2.25rem;
          transition: background 0.2s var(--anim), border-color 0.2s var(--anim), transform 0.2s var(--anim);
          text-decoration: none;
        }

        .card-wrap:hover .card-button {
          background: var(--staff-red);
          border-color: var(--staff-red);
          transform: translateY(-1px);
        }

        .card-button-call {
          background: #fff;
          min-height: 2rem;
          min-width: 2rem;
          border-radius: 50%;
          color: #111;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
        }

        .card-button-text {
          margin-left: 0.4rem;
          font-weight: 600;
          font-size: 0.76rem;
        }

        .card-button-call-icon {
          width: 0.95rem;
          height: 0.95rem;
        }

        .card-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 18rem;
          width: 100%;
          z-index: 2;
          opacity: 0.86;
          background: linear-gradient(to bottom, rgba(7, 23, 52, 0), rgba(7, 23, 52, 1));
          pointer-events: none;
        }

        .grab {
          cursor: grab;
        }

        .is-dragging .grab,
        .is-dragging {
          cursor: grabbing;
        }

        @keyframes pulse {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(2.8);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
