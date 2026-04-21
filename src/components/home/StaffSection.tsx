'use client';

import { useMemo, useState } from 'react';

type StaffCard = {
  id: string;
  name: string;
  image: string;
  status: 'Online' | 'Offline';
  rating: string;
  learners: string;
  description: string;
};

export default function StaffSection() {
  const initialCards = useMemo<StaffCard[]>(
    () => [
      {
        id: 'teacher-1',
        name: 'Amina Okon',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80',
        status: 'Online',
        rating: '4.5',
        learners: '3.1 K',
        description: 'English teacher building confident communication and clear expression.',
      },
      {
        id: 'teacher-2',
        name: 'Chinonso Etim',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80',
        status: 'Online',
        rating: '4.0',
        learners: '2.4 K',
        description: 'Mathematics teacher turning complex concepts into simple, practical steps.',
      },
      {
        id: 'teacher-3',
        name: 'David Effiong',
        image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=900&q=80',
        status: 'Offline',
        rating: '5.0',
        learners: '1.7 K',
        description: 'Science teacher guiding students with data-driven, hands-on learning.',
      },
    ],
    []
  );

  const [cards, setCards] = useState<StaffCard[]>(initialCards);
  const [dragId, setDragId] = useState<string | null>(null);
  const [handleReadyId, setHandleReadyId] = useState<string | null>(null);

  const play = (file: string, volume = 0.5) => {
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
    document.body.classList.add('grabbing');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', id);
    play('https://cdn.freesound.org/previews/582/582898_5965684-lq.mp3');
  };

  const handleDrop = (targetId: string) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData('text/plain') || dragId;

    if (!sourceId || sourceId === targetId) {
      document.body.classList.remove('grabbing');
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
    document.body.classList.remove('grabbing');
    setDragId(null);
  };

  return (
    <section className="section-spacing bg-[var(--bg-primary)] staff-shell">
      <div className="container-custom">
        <header className="header">
          <a href="/about" className="made" aria-label="Our teachers" role="tooltip">
            <div className="by">OUR STAFF</div>
            <div className="logo">
              <img
                src="https://i.imgur.com/aNnuxjo.png"
                alt="logo"
                className="logo-img"
                draggable={false}
              />
              <div className="logo-text">ST Brains</div>
            </div>
          </a>
        </header>

        <section className="cards" aria-label="Staff profile cards">
          {cards.map((staff) => (
            <div
              key={staff.id}
              draggable
              onDragStart={handleDragStart(staff.id)}
              onDragEnd={() => {
                document.body.classList.remove('grabbing');
                setDragId(null);
                setHandleReadyId(null);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop(staff.id)}
              className={`card-wrap ${dragId === staff.id ? 'is-dragging' : ''}`}
            >
              <div className="card">
                <div className="card-filter" />
                <img src={staff.image} alt={staff.name} className="card-bg" draggable={false} />

                <div className="card-status">
                  <div className={`card-status-dot ${staff.status === 'Online' ? 'online' : 'offline'}`} />
                  <div className="card-status-text">{staff.status}</div>
                </div>

                <div
                  className="card-handle grab"
                  onMouseDown={() => setHandleReadyId(staff.id)}
                  onMouseUp={() => setHandleReadyId(null)}
                  onMouseLeave={() => setHandleReadyId(null)}
                >
                  <div className="card-handle-tip" aria-label="Drag" role="tooltip">
                    <svg className="handle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01" />
                    </svg>
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-name-wrap">
                    <div className="card-name">{staff.name}</div>
                    <div className="card-verified" aria-label="Verified" role="tooltip">
                      ✓
                    </div>
                  </div>

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

                  <a href="/about/facilitators" className="card-button pointer">
                    <div className="card-button-text pointer">Get In Touch</div>
                    <div className="card-button-call pointer">
                      <svg className="card-button-call-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.11 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6.27 6.27l1.28-1.28a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                  </a>
                </div>

                <div className="card-fade" />
              </div>
            </div>
          ))}
        </section>

        <footer className="footer">
          <a className="follow" href="/about/facilitators">
            <div className="by">MORE ABOUT OUR STAFF?</div>
            <div className="follow-x">
              <div className="follow-logo">S</div>
              <div className="follow-text">
                <div className="follow-us">explore</div>
                <div className="follow-handle">our team</div>
              </div>
            </div>
          </a>
        </footer>
      </div>

      <style jsx>{`
        .staff-shell {
          --bg: #ffffff;
          --text: #ffffff;
          --accent: #000000;
          --radius: 2.5rem;
          --shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.1);
          --anim: cubic-bezier(0, 0, 0.25, 1);
          --brand-red: var(--adeips-red);
        }

        a {
          text-decoration: none;
        }

        .pointer,
        a,
        button {
          cursor: pointer;
        }

        .grab {
          cursor: grab;
        }

        .is-dragging,
        .is-dragging .grab {
          cursor: grabbing;
        }

        .by {
          font-size: 0.5rem;
          opacity: 0.5;
          letter-spacing: 0.2rem;
          text-align: center;
          display: flex;
          justify-content: center;
          margin-bottom: 0.15rem;
          text-transform: uppercase;
        }

        .header {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-flow: column;
          margin: 0 0 2.5rem 0;
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -1rem;
        }

        .made {
          color: var(--adeips-navy);
          justify-content: center;
          align-items: center;
          flex-flow: column;
          opacity: 0.8;
          display: flex;
        }

        .logo-img {
          height: 1.75rem;
          margin-right: 0.3rem;
          pointer-events: none;
          user-select: none;
        }

        .logo-text {
          font-weight: 800;
          font-size: 1.3rem;
        }

        .cards {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
        }

        .card-wrap {
          position: relative;
          transition: transform 0.25s var(--anim);
        }

        .card-wrap.is-dragging {
          transform: rotate(3deg) scale(0.98);
          z-index: 99;
        }

        .card-filter {
          position: absolute;
          height: 100%;
          width: 100%;
          left: 0;
          top: 0;
          background: rgba(255, 255, 255, 0.1);
          z-index: 9;
          pointer-events: none;
          backdrop-filter: blur(0.2rem);
          opacity: 0;
          transition: opacity 0.1s var(--anim);
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
          height: 22rem;
          width: 14rem;
          min-height: 22rem;
          min-width: 14rem;
          max-height: 22rem;
          max-width: 14rem;
          margin: 1rem;
          padding: 1rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          position: relative;
          transition: opacity 0.4s var(--anim), transform 0.3s var(--anim);
          background: #0a1236;
        }

        .card-bg {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: -1;
          pointer-events: none;
          user-select: none;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .card-wrap:hover .card-bg {
          transform: scale(1.08);
        }

        .card-content {
          position: relative;
          z-index: 3;
          padding: 0 0.25rem;
          width: 100%;
        }

        .card-status {
          margin: 0.25rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(0.5rem);
          width: 5rem;
          height: 1.5rem;
          border-radius: var(--radius);
          position: absolute;
          top: 1rem;
          left: 1rem;
          pointer-events: none;
          user-select: none;
        }

        .card-status-dot {
          height: 0.3rem;
          width: 0.3rem;
          border-radius: 50%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 0.75rem;
        }

        .card-status-dot:after {
          content: '';
          height: 100%;
          width: 100%;
          background: inherit;
          border-radius: 50%;
          animation: pulse 1s var(--anim) infinite;
        }

        .card-status-dot.online {
          background: mediumseagreen;
        }

        .card-status-dot.offline {
          background: grey;
        }

        .card-status-dot.offline:after {
          animation: none;
        }

        .card-status-text {
          font-size: 0.7rem;
          opacity: 0.85;
          color: #fff;
        }

        .card-handle {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(0.1rem);
          border-radius: var(--radius);
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
        }

        .card-handle-tip {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
        }

        .handle {
          width: 100%;
          height: 1.25rem;
        }

        .card-name-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          margin: 0.75rem 0;
        }

        .card-name {
          font-size: 1.2rem;
          font-weight: 700;
          margin-right: 0.5rem;
          color: #fff;
        }

        .card-verified {
          font-size: 0.95rem;
          color: #fff;
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.22);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .card-tags {
          display: flex;
          align-items: center;
          flex-flow: row;
          margin: 0.5rem 0;
        }

        .card-tag {
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(0.5rem);
          padding: 0.3rem 0.5rem;
          border-radius: var(--radius);
          font-size: 0.75rem;
          margin-right: 0.5rem;
          pointer-events: none;
          color: #fff;
        }

        .card-rating-text {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 0.5rem;
        }

        .card-rating-stars {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.5rem;
        }

        .card-description {
          color: #fff;
          font-size: 0.8rem;
          line-height: 1.6;
          font-weight: 300;
          margin: 0.5rem 0 1rem 0;
        }

        .card-button {
          padding: 0.3rem 0.3rem 0.3rem 0.5rem;
          border-radius: var(--radius);
          background: rgba(255, 255, 255, 0.2);
          color: var(--bg);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.2s var(--anim);
        }

        .card-wrap:hover .card-button {
          background: var(--brand-red);
        }

        .card-button-call {
          background: var(--bg);
          min-height: 2.5rem;
          min-width: 2.5rem;
          border-radius: 50%;
          color: var(--accent);
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
        }

        .card-button-text {
          margin-left: 0.5rem;
          font-weight: 500;
          letter-spacing: -0.02rem;
          word-spacing: 0.05rem;
          font-size: 0.85rem;
        }

        .card-button-call-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 1.1rem;
          height: 1.1rem;
        }

        .card-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 20rem;
          width: 100%;
          z-index: 0;
          opacity: 0.75;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
          pointer-events: none;
        }

        .footer {
          margin: 2.5rem 0 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .follow {
          color: var(--adeips-navy);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-flow: column;
        }

        .follow-x {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 1rem 0;
        }

        .follow-logo {
          height: 2rem;
          width: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.5rem;
          margin-right: 0.5rem;
          color: #fff;
          background: var(--adeips-navy);
          font-size: 0.8rem;
          font-weight: 700;
        }

        .follow-text {
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          justify-content: center;
          flex-flow: column;
        }

        .follow-us {
          text-transform: uppercase;
          opacity: 0.5;
          font-size: 0.7rem;
        }

        .follow-handle {
          font-weight: 700;
          margin: 0.25rem 0;
        }

        @keyframes pulse {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
