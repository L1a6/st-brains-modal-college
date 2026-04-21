'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function IconicMoments() {
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentBgColor, setCurrentBgColor] = useState('#7F1D1D');
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const mobileContainerRef = useRef<HTMLElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Mark as ready after a brief delay to ensure layout is stable
    const timer = setTimeout(() => setIsReady(true), 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Only set body background when section is in view
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.style.backgroundColor = '#7F1D1D';
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Slow fade-in animation for title
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              titleRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 2.5, ease: 'power2.out' }
            );
            gsap.fromTo(
              subtitleRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 2.5, delay: 0.3, ease: 'power2.out' }
            );
          }
        });
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, []);

  // Mobile scroll-based color changes
  useEffect(() => {
    if (!isMobile || !mobileContainerRef.current) return;

    const cards = document.querySelectorAll('.moment-card');
    
    const observers = Array.from(cards).map((card, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setCurrentBgColor(moments[index].color);
              document.body.style.backgroundColor = moments[index].color;
            }
          });
        },
        { threshold: [0.5] }
      );
      
      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [isMobile]);

  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) return;

    // Set initial background
    document.body.style.backgroundColor = '#7F1D1D';

    const ctx = gsap.context(() => {
      // Set z-index for image stacking
      document.querySelectorAll('.arch__right .img-wrapper').forEach((element) => {
        const order = (element as HTMLElement).getAttribute('data-index');
        if (order !== null) {
          (element as HTMLElement).style.zIndex = order;
        }
      });

      const imgs = gsap.utils.toArray<HTMLElement>('.img-wrapper img');
      
      // All 4 colors - one for each facility showcase section
      const bgColors = ['#7F1D1D', '#991B1B', '#B91C1C', '#DC2626'];

      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.arch',
          start: 'top top',
          end: 'bottom bottom',
          pin: '.arch__right',
          scrub: true,
        },
      });

      gsap.set(imgs, {
        clipPath: 'inset(0)',
        objectPosition: '0px 0%',
      });

      // Create transitions for all 4 sections
      imgs.forEach((_, index) => {
        const currentImage = imgs[index];
        const nextImage = imgs[index + 1];

        const sectionTimeline = gsap.timeline();

        if (index < imgs.length - 1 && nextImage) {
          // Transition to next section
          sectionTimeline
            .to(
              'body',
              {
                backgroundColor: bgColors[index + 1],
                duration: 1,
                ease: 'power2.inOut',
              },
              0
            )
            .to(
              currentImage,
              {
                clipPath: 'inset(0px 0px 100%)',
                objectPosition: '0px 60%',
                duration: 1,
                ease: 'none',
              },
              0
            )
            .to(
              nextImage,
              {
                objectPosition: '0px 40%',
                duration: 1,
                ease: 'none',
              },
              0
            );
        }

        mainTimeline.add(sectionTimeline);
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  const moments = [
    {
      title: 'Modern Classrooms',
      description: 'Bright, well-equipped classrooms designed to keep students focused, engaged, and inspired every day.',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200&q=80',
      color: '#7F1D1D',
      link: '/gallery'
    },
    {
      title: 'Science Laboratories',
      description: 'Practical science environments where students explore, experiment, and develop critical thinking skills.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&q=80',
      color: '#991B1B',
      link: '/gallery'
    },
    {
      title: 'Library and ICT Hub',
      description: 'A calm and resource-rich learning space that supports reading culture, research, and digital literacy.',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80',
      color: '#B91C1C',
      link: '/gallery'
    },
    {
      title: 'Sports and Recreation',
      description: 'Safe and vibrant recreational spaces that encourage teamwork, fitness, and confidence beyond the classroom.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&q=80',
      color: '#DC2626',
      link: '/gallery'
    }
  ];

  // MOBILE: Smooth color transition layout
  if (isMobile) {
    return (
      <section 
        ref={(el) => {
          mobileContainerRef.current = el;
          if (el) sectionRef.current = el;
        }}
        className="mobile-iconic-moments" 
        style={{ 
          backgroundColor: currentBgColor, 
          padding: '40px 0',
          transition: 'background-color 0.8s ease',
          minHeight: '100vh',
          opacity: isReady ? 1 : 0,
          visibility: isReady ? 'visible' : 'hidden',
        }}
      >
        <style jsx>{`
          .mobile-iconic-moments h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 32px;
            font-weight: 300;
            text-align: center;
            margin-bottom: 12px;
            color: #FFFFFF;
            padding: 0 20px;
          }
          
          .mobile-iconic-moments .subtitle {
            text-align: center;
            color: rgba(255, 255, 255, 0.85);
            margin-bottom: 48px;
            font-size: 14px;
            padding: 0 20px;
          }
          
          .moment-card {
            margin-bottom: 60px;
            padding: 0;
          }
          
          .moment-image {
            width: calc(100% - 32px);
            margin: 0 auto 24px auto;
            height: 300px;
            border-radius: 12px;
            overflow: hidden;
            position: relative;
          }
          
          .moment-content {
            padding: 0 20px;
          }
          
          .moment-content h3 {
            font-family: 'Outfit', sans-serif;
            font-size: 28px;
            font-weight: 800;
            color: #FFFFFF;
            margin-bottom: 12px;
          }
          
          .moment-content p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
          }
          
          .moment-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1.5px solid rgba(255, 255, 255, 0.3);
            border-radius: 40px;
            color: #FFFFFF;
            font-weight: 500;
            text-decoration: none;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
          
          .moment-button:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
          }
          
          .gallery-button {
            text-align: center;
            margin-top: 40px;
            padding: 0 20px 40px 20px;
          }
          
          .gallery-button a {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 16px 32px;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1.5px solid rgba(255, 255, 255, 0.3);
            border-radius: 40px;
            color: #FFFFFF;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
          }
          
          .gallery-button a:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
          }
        `}</style>

        <h2 ref={titleRef}>Iconic Facilities at the School</h2>
        <p ref={subtitleRef} className="subtitle">Discover the spaces where students learn, create, and grow</p>

        {moments.map((moment, index) => (
          <div key={index} className="moment-card">
            <div className="moment-image">
              <Image
                src={moment.image}
                alt={moment.title}
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority={index === 0}
              />
            </div>
            <div className="moment-content">
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
              <a href={moment.link} className="moment-button">
                <span>View Facility Photos</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        ))}

        <div className="gallery-button">
          <a href="/gallery">
            <span>View Full Gallery</span>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    );
  }

  // DESKTOP: GSAP layout
  return (
    <section ref={sectionRef} style={{ opacity: isReady ? 1 : 0, transition: 'opacity 0.3s ease' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
        
        .desktop-iconic-moments {
          overflow: visible;
          background-color: transparent;
        }
        
        .container {
          max-width: 1440px;
          padding: 2rem;
          margin: 0 auto;
          background-color: transparent;
        }

        .spacer {
          width: 100%;
          height: 2vh;
        }
        
        .arch {
          display: flex;
          gap: 60px;
          justify-content: space-between;
          max-width: 1100px;
          margin-inline: auto;
        }

        .arch__left {
          display: flex;
          flex-direction: column;
          min-width: 300px;
        }

        .arch__left .arch__info {
          max-width: 356px;
          height: 100vh;
          display: grid;
          place-items: center;
        }

        .arch__left .arch__info h2 {
          font-family: Outfit;
          font-size: 42px;
          font-weight: 800;
          letter-spacing: -0.84px;
          color: #FFFFFF;
          margin-bottom: 6px;
        }

        .arch__left .arch__info p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
          letter-spacing: -0.54px;
          margin-bottom: 28px;
          line-height: 1.6;
        }

        .arch__left .arch__info a {
          text-decoration: none;
          padding: 16px 24px;
          color: #FFFFFF;
          border-radius: 40px;
          display: flex;
          gap: 8px;
          width: fit-content;
          align-items: center;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .arch__left .arch__info a:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .arch__right {
          flex-shrink: 1;
          height: 100vh;
          width: 100%;
          max-width: 540px;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .arch__right .img-wrapper {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          height: 450px;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          will-change: clip-path;
        }
        
        .gallery-button-desktop {
          text-align: center;
          margin-top: 60px;
          padding-bottom: 60px;
        }
        
        .gallery-button-desktop a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 36px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          border-radius: 40px;
          color: #FFFFFF;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          font-size: 16px;
        }
        
        .gallery-button-desktop a:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }
      `}</style>

      <section className="desktop-iconic-moments">
        <div className="container">
          <h2 ref={titleRef} style={{ 
            fontFamily: 'Outfit', 
            fontSize: '56px', 
            fontWeight: 300, 
            textAlign: 'center', 
            marginBottom: '12px',
            color: '#FFFFFF'
          }}>
            Iconic Facilities at the School
          </h2>
          <p ref={subtitleRef} style={{ 
            textAlign: 'center', 
            color: 'rgba(255, 255, 255, 0.85)', 
            marginBottom: '24px', 
            maxWidth: '600px', 
            marginLeft: 'auto', 
            marginRight: 'auto'
          }}>
            Discover the spaces where students learn, create, and grow
          </p>
        </div>

        <div className="arch">
          <div className="arch__left">
            {moments.map((moment, index) => (
              <div key={index} className="arch__info">
                <div>
                  <h2>{moment.title}</h2>
                  <p>{moment.description}</p>
                  <a href={moment.link}>
                    <span>View Facility Photos</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="arch__right">
            {moments.map((moment, index) => (
              <div key={index} className="img-wrapper" data-index={4 - index}>
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  sizes="25vw"
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="spacer" />
        
        <div className="gallery-button-desktop">
          <a href="/gallery">
            <span>View Full Gallery</span>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </section>
  );
}