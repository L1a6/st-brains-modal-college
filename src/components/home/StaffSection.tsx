'use client';

import { useRef, useState } from 'react';
import Script from 'next/script';

type StaffCard = {
  id: string;
  name: string;
  image: string;
  status: 'Online' | 'Offline';
  description: string;
};

export default function StaffSection() {
  const [cards, setCards] = useState<StaffCard[]>([
    {
      id: 'teacher-1',
      name: 'Amina Okon',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80',
      status: 'Online',
      description: 'English teacher building confident communication and clear expression.',
    },
    {
      id: 'teacher-2',
      name: 'Chinonso Etim',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80',
      status: 'Online',
      description: 'Mathematics teacher turning complex concepts into simple, practical steps.',
    },
    {
      id: 'teacher-3',
      name: 'David Effiong',
      image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=900&q=80',
      status: 'Offline',
      description: 'Science teacher guiding students with data-driven, hands-on learning.',
    },
  ]);

  const [dragId, setDragId] = useState<string | null>(null);
  const [handleReadyId, setHandleReadyId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', id);
    }
    play('https://cdn.freesound.org/previews/582/582898_5965684-lq.mp3');
  };

  const handleDrop = (targetId: string) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const sourceId = event.dataTransfer?.getData('text/plain') || dragId;

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
    <section className="brains-staff-wrapper" ref={containerRef}>
      <header className="header">
        <h2 className="section-title">Our Staff</h2>
        <p className="section-subtitle">Meet the teachers guiding every learner with care.</p>
      </header>

      <section className="cards">
        {cards.map((staff) => (
          <div
            className={`card-wrap ${dragId === staff.id ? 'is-dragging' : ''}`}
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
          >
            <div className="card">
              <div className="card-filter"></div>
              <img src={staff.image} alt="bg" className="card-bg" draggable="false" />

              <div className="card-status">
                <div className={`card-status-dot ${staff.status === 'Online' ? 'online' : 'offline'}`}></div>
                <div className="card-status-text">{staff.status}</div>
              </div>

              <div
                className="card-handle grab"
                onMouseDown={() => setHandleReadyId(staff.id)}
                onMouseUp={() => setHandleReadyId(null)}
                onMouseLeave={() => setHandleReadyId(null)}
                onTouchStart={() => setHandleReadyId(staff.id)}
                onTouchEnd={() => setHandleReadyId(null)}
              >
                <div className="card-handle-tip" aria-label="Drag" role="tooltip">
                  <span className="iconify handle" data-icon="ic:outline-drag-indicator"></span>
                </div>
              </div>

              <div className="card-content">
                <div className="card-name-wrap">
                  <div className="card-name">{staff.name}</div>
                  <div className="card-verfied" aria-label="Verified" role="tooltip">
                    <span className="card-verification iconify" data-icon="si:verified-fill"></span>
                  </div>
                </div>

                <div className="card-description">
                  {staff.description}
                </div>

                <div className="card-button pointer">
                  <div className="card-button-text pointer">Get In Touch</div>
                  <div className="card-button-call pointer">
                    <span className="card-button-call-icon iconify pointer" data-icon="line-md:phone-call-loop"></span>
                  </div>
                </div>
              </div>

              <div className="card-fade"></div>
            </div>
          </div>
        ))}
      </section>

      {/* Required for the icons */}
      <Script src="https://code.iconify.design/3/3.1.0/iconify.min.js" strategy="lazyOnload" />

      <style dangerouslySetInnerHTML={{ __html: `
        /*=================
               VARS
        ===================*/
        .brains-staff-wrapper {
          --bg: #ffffff;
          --text: #000000;
          --accent: #dc2626; /* BRAND RED for call icon */
          --radius: 2.5rem; /* Pill shape! */
          --shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.1);
          --anim: cubic-bezier(0, 0, 0.25, 1);
          
          background: #ffffff; /* BRAND COLOR: WHITE BACKGROUND */
          color: #000;
          display: flex;
          flex-flow: column;
          padding: 4rem 0;
          min-height: 100vh;
          cursor: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIyMyIgdmlld0JveD0iMCAwIDI0IDI0Ij4KCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlkOWQ5ZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJtMyAzbDcgMTlsMi4wNTEtNi4xNTRhNiA2IDAgMCAxIDMuNzk1LTMuNzk1TDIyIDEweiIgLz4KPC9zdmc+"), default;
        }
        
        .brains-staff-wrapper * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-family: inherit;
        }
        
        .brains-staff-wrapper *::selection {
          background: rgba(220, 38, 38, 0.3);
        }
        
        .brains-staff-wrapper .pointer,
        .brains-staff-wrapper a,
        .brains-staff-wrapper button {
          cursor: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIyMyIgdmlld0JveD0iMCAwIDE0IDE0Ij4KCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2I1YjFiMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMTAuNSA2LjEzYTIgMiAwIDAgMSAxLjU5IDIuMjRsLS42MSA0LjI3YTEgMSAwIDAgMS0xIC44Nkg0YTEgMSAwIDAgMS0uOTMtLjYzTDIgMTAuMjFhMiAyIDAgMCAxIDEtMi41M0w0LjM1IDdWMmExLjUgMS41IDAgMCAxIDMgMHYzLjV6IiBzdHJva2Utd2lkdGg9IjEiIC8+Cjwvc3ZnPg=="), default;
        }
        
        .brains-staff-wrapper .grab {
          cursor: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIyMyIgdmlld0JveD0iMCAwIDI0IDI0Ij4KCTxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y5ZjlmOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPgoJCTxwYXRoIGQ9Ik0xOCAxMS41VjlhMiAyIDAgMCAwLTItMmEyIDIgMCAwIDAtMiAydjEuNG0wLS40VjhhMiAyIDAgMCAwLTItMmEyIDIgMCAwIDAtMiAydjJtMC0uMVY5YTIgMiAwIDAgMC0yLTJhMiAyIDAgMCAwLTIgMnY1bTAgMGEyIDIgMCAwIDAtMi0yYTIgMiAwIDAgMC0yIDIiIC8+CgkJPHBhdGggZD0iTTE4IDExYTIgMiAwIDEgMSA0IDB2M2E4IDggMCAwIDEtOCA4aC00YTggOCAwIDAgMS04LThhMiAyIDAgMSAxIDQgMCIgLz4KCTwvZz4KPC9zdmc+"), grab;
        }
        
        /* The global grabbing cursor is handled via JS document.body.classList */
        body.grabbing {
          cursor: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIyMyIgdmlld0JveD0iMCAwIDI0IDI0Ij4KCTxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPgoJCTxwYXRoIGQ9Ik0xOCAxMS41VjlhMiAyIDAgMCAwLTItMmEyIDIgMCAwIDAtMiAydjEuNG0wLS40VjhhMiAyIDAgMCAwLTItMmEyIDIgMCAwIDAtMiAydjJtMC0uMVY5YTIgMiAwIDAgMC0yLTJhMiAyIDAgMCAwLTIgMnY1bTAgMGEyIDIgMCAwIDAtMi0yYTIgMiAwIDAgMC0yIDIiIC8+CgkJPHBhdGggZD0iTTE4IDExYTIgMiAwIDEgMSA0IDB2M2E4IDggMCAwIDEtOCA4aC00YTggOCAwIDAgMS04LThhMiAyIDAgMSAxIDQgMCIgLz4KCTwvZz4KPC9zdmc+"), grabbing !important;
        }
        
        .brains-staff-wrapper .by {
          font-size: 0.5rem;
          opacity: 0.5;
          letter-spacing: 0.2rem;
          text-align: center;
          display: flex;
          justify-content: center;
          align-content: center;
          margin-bottom: 0.15rem;
        }
        
        .brains-staff-wrapper .header {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-flow: column;
          margin: 1rem 0 2.5rem 0;
          text-align: center;
          padding: 0 1rem;
        }

        .brains-staff-wrapper .section-title {
          font-size: clamp(2rem, 3.8vw, 3.1rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0;
          color: #111111;
        }

        .brains-staff-wrapper .section-subtitle {
          margin: 0.75rem 0 0;
          max-width: 40rem;
          color: #4b5563;
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
        }
        
        .brains-staff-wrapper .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -1rem;
        }
        
        .brains-staff-wrapper .made {
          color: black; /* Contrast to full white background */
          justify-content: center;
          align-items: center;
          flex-flow: column;
          opacity: 0;
          animation: madeIn 0.8s forwards;
        }
        
        @keyframes madeIn {
          from { opacity: 0; transform: scale(0.75); }
          to { opacity: 0.75; transform: scale(1); }
        }
        
        .brains-staff-wrapper .made:hover {
          opacity: 1;
          transform: scale(1.02);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .brains-staff-wrapper .logo-img {
          height: 1.75rem;
          margin-right: 0.3rem;
          pointer-events: none;
          user-select: none;
          filter: invert(1); /* the original logo is white, invert makes it black since on white background */
        }
        
        .brains-staff-wrapper .logo-text {
          font-weight: 800;
          font-size: 1.3rem;
        }
        
        /*=================
               CARDS
        ===================*/
        .brains-staff-wrapper .cards {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 0.75rem;
        }
        
        .brains-staff-wrapper .card-wrap {
          position: relative;
        }
        
        .brains-staff-wrapper .card-filter {
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
        
        .brains-staff-wrapper .card {
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
          border: 1px solid rgba(0, 0, 0, 0.1); /* Adjusted border for light mode */
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          position: relative;
          color: white; /* Ensures text over image is white */
          background: rgba(0,0,0,0.8);
          animation: cardIn 0.8s forwards;
          transition: transform 0.3s var(--anim);
        }

        .brains-staff-wrapper .card:hover {
          transform: translateY(-4px);
        }
        
        .brains-staff-wrapper .card-wrap.is-dragging .card {
          opacity: 0.5 !important;
          filter: blur(0.5rem) !important;
          transform: scale(0.8) !important;
          box-shadow: none;
          border: none;
        }
        
        @keyframes cardIn {
          from { opacity: 0; filter: blur(1rem); }
          to { opacity: 1; filter: blur(0); }
        }
        
        .brains-staff-wrapper .card-bg {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          z-index: -1;
          pointer-events: none;
          user-select: none;
          object-fit: cover;
          animation: pulseBg 15s infinite alternate linear;
        }
        
        @keyframes pulseBg {
          0% { transform: scale(1); }
          100% { transform: scale(1.2); }
        }
        
        .brains-staff-wrapper .card-content {
          position: relative;
          z-index: 3;
          padding: 0 0.25rem;
          width: 100%; /* For full layout inside */
        }
        
        .brains-staff-wrapper .card-status {
          margin: 0.25rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.4);
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
        
        .brains-staff-wrapper .card-status-dot {
          height: 0.3rem;
          width: 0.3rem;
          border-radius: 50%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 0.75rem;
        }
        
        @keyframes pulse {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(3); opacity: 0; }
        }
        
        .brains-staff-wrapper .card-status-dot:after {
          content: "";
          height: 100%;
          width: 100%;
          background: inherit;
          border-radius: 50%;
          animation: pulse 1s var(--anim) infinite;
        }
        
        .brains-staff-wrapper .card-status-dot.online { background: mediumseagreen; }
        .brains-staff-wrapper .card-status-dot.offline { background: grey; }
        .brains-staff-wrapper .card-status-dot.offline:after { animation: none; }
        
        .brains-staff-wrapper .card-status-text {
          font-size: 0.7rem;
          opacity: 0.9;
          color: white;
        }
        
        .brains-staff-wrapper .card-handle {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(0.1rem);
          border-radius: var(--radius);
          position: absolute;
          top: 1rem;
          right: 1rem;
          height: 2.5rem;
          width: 2.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .brains-staff-wrapper .card-handle:hover {
          transform: scale(0.95);
        }
        
        .brains-staff-wrapper .card-handle-tip {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
        }
        
        .brains-staff-wrapper .handle {
          width: 100%;
          height: 1.25rem;
          color: black;
        }
        
        .brains-staff-wrapper .card-name-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          margin: 0.75rem 0;
          animation: slideUpIn 0.8s 0.3s both;
        }
        
        @keyframes slideUpIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .brains-staff-wrapper .card-name {
          font-size: 1.25rem;
          font-weight: 700;
          margin-right: 0.5rem;
          color: white;
        }
        
        .brains-staff-wrapper .card-verfied {
          font-size: 1.25rem;
        }
        
        .brains-staff-wrapper .card-verification {
          color: white;
          filter: drop-shadow(0 0 0.5rem black);
        }
        
        .brains-staff-wrapper .card-description {
          font-size: 0.8rem;
          line-height: 1.6;
          font-weight: 300;
          margin: 0.5rem 0 1rem 0;
          opacity: 0;
          animation: fadeInText 0.8s 0.5s both;
        }
        
        @keyframes fadeInText {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 0.9; }
        }
        
        .brains-staff-wrapper .card-button {
          padding: 0.3rem 0.3rem 0.3rem 0.5rem;
          border-radius: var(--radius); /* This is 2.5rem which is a PILL SHAPE! */
          background: rgba(255, 255, 255, 0.2);
          color: white !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.3s var(--anim), transform 0.2s var(--anim);
        }
        
        /* BRAND RED ONLY ON HOVER */
        .brains-staff-wrapper .card:hover .card-button {
          background: var(--accent); /* #dc2626 */
        }
        
        .brains-staff-wrapper .card-button:active {
          transform: scale(1.05);
        }
        
        .brains-staff-wrapper .card-button-call {
          background: white;
          min-height: 2.5rem;
          min-width: 2.5rem;
          border-radius: 50%;
          color: black;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
        }
        
        .brains-staff-wrapper .card-button-text {
          margin-left: 0.5rem;
          font-weight: 500;
          letter-spacing: -0.02rem;
          word-spacing: 0.05rem;
          font-size: 0.85rem;
          color: white;
        }
        
        .brains-staff-wrapper .card-button-call-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 100%;
          font-size: 1.2rem;
        }
        
        .brains-staff-wrapper .card-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 20rem;
          width: 100%;
          z-index: 0;
          opacity: 0.75;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
          pointer-events: none;
          transition: opacity 0.3s var(--anim);
        }
        
        .brains-staff-wrapper .card:hover .card-fade {
          opacity: 1; /* Darkens the gradient to highlight the red button on hover */
        }

        @media (max-width: 900px) {
          .brains-staff-wrapper {
            padding: 3rem 0;
            min-height: auto;
          }

          .brains-staff-wrapper .cards {
            padding: 0 1rem;
          }

          .brains-staff-wrapper .card {
            width: min(100%, 22rem);
            min-width: 0;
            max-width: 22rem;
            margin: 0.75rem auto;
          }
        }

        @media (max-width: 640px) {
          .brains-staff-wrapper {
            padding: 2.25rem 0;
          }

          .brains-staff-wrapper .header {
            margin: 0 0 1.5rem 0;
            padding: 0 1.1rem;
          }

          .brains-staff-wrapper .section-title {
            font-size: 2rem;
          }

          .brains-staff-wrapper .section-subtitle {
            font-size: 0.95rem;
          }

          .brains-staff-wrapper .cards {
            padding: 0 0.65rem;
          }

          .brains-staff-wrapper .card {
            width: 100%;
            max-width: none;
            min-height: 19.5rem;
            max-height: none;
            margin: 0.6rem 0;
          }

          .brains-staff-wrapper .card-content {
            padding: 0;
          }

          .brains-staff-wrapper .card-name {
            font-size: 1.15rem;
          }

          .brains-staff-wrapper .card-description {
            font-size: 0.78rem;
            line-height: 1.5;
          }
        }
        
        /*=================
               FOOTER
        ===================*/
        .brains-staff-wrapper .footer {
          margin: 4rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .brains-staff-wrapper .follow {
          color: black; /* contrast to white background */
          display: flex;
          justify-content: center;
          align-items: center;
          flex-flow: column;
          animation: madeIn 0.8s 0.25s forwards;
          opacity: 0;
        }
        
        .brains-staff-wrapper .follow:hover {
          opacity: 1;
          transform: scale(1.03);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .brains-staff-wrapper .follow-x {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 1rem 0;
        }
        
        .brains-staff-wrapper .follow-logo {
          height: 2rem;
          width: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.5rem;
          margin-right: 0.5rem;
          color: white;
          background: black; /* invert due to white background */
        }
        
        .brains-staff-wrapper .follow-text {
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          justify-content: center;
          flex-flow: column;
        }
        
        .brains-staff-wrapper .follow-us {
          text-transform: uppercase;
          opacity: 0.5;
          font-size: 0.7rem;
        }
        
        .brains-staff-wrapper .follow-handle {
          font-weight: 700;
          margin: 0.25rem 0;
        }
      ` }} />
    </section>
  );
}
