'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { testimonialsData } from '@/data/testimonials';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  cohort: string;
  image: string;
  quote: string;
  full_testimony: string;
  highlight: string;
  key_takeaways?: string[];
}

const oldTestimonials = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=450&q=80',
    name: 'Edidiong Atainyang',
    role: 'BGS, 11th Cohort',
    cohort: '11th Cohort',
    quote: 'ST Brains Modal College transformed me from a nervous presenter into a confident keynote speaker. The techniques I learned here changed my entire career trajectory.',
    fullTestimony: `When I first joined ST Brains Modal College, I could barely stand in front of five people without my voice trembling. Public speaking was my greatest fear, and it was holding me back in my career.

From the very first module on Cognitive Architecture of Opening and Closing, I began to understand the psychology behind impactful communication. The facilitators didn't just teach techniques—they helped me understand WHY these methods work.

The Executive Presence module was transformative. I learned how to command a room not through loudness, but through strategic positioning, deliberate pauses, and authentic connection with my audience.

What surprised me most was the focus on linguistic precision. I never realized how much my word choices affected my credibility. The training on Standard English competence gave me confidence in any professional setting.

Today, I regularly speak at conferences and corporate events. Last month, I delivered a keynote to over 500 professionals. The version of me from before ST Brains Modal College would never have believed this was possible.

To anyone considering ST Brains Modal College: invest in yourself. This program doesn't just teach you to speak—it transforms who you are as a communicator and leader.`,
    highlight: 'From stage fright to keynote speaker',
    keyTakeaways: [
      'Overcame severe stage anxiety through systematic training',
      'Mastered cognitive architecture for impactful openings',
      'Developed executive presence and authentic connection',
      'Now speaks to audiences of 500+ professionals'
    ]
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=450&q=80',
    name: 'Idy Xavier',
    role: 'Public Speaker',
    cohort: '9th Cohort',
    quote: 'From stage fright to TEDx stages. The facilitators truly understand the psychology of impactful communication.',
    fullTestimony: `My journey with ST Brains Modal College began after I bombed a critical presentation at work. I knew something had to change.

The program's approach to Applied Psychophysiology of Confidence was eye-opening. I learned that my stage anxiety wasn't a character flaw—it was a conditioned response that could be systematically addressed.

Through the breathing techniques, cognitive reframing, and somatic control methods taught in the program, I gradually conquered my fears. But more than that, I discovered that I actually LOVED being on stage.

The Vocal Engineering module helped me find my authentic voice. I learned about tonal modulation, strategic pacing, and how to use my voice as an instrument of influence.

Six months after completing the program, I delivered my first TEDx talk. It was a moment I'll never forget—standing on that red dot, sharing my story with hundreds of people, feeling completely at home.

ST Brains Modal College gave me more than skills. It gave me a new identity as a speaker. The community of alumni continues to support and inspire me. This is truly a life-changing experience.`,
    highlight: 'TEDx speaker and communication coach',
    keyTakeaways: [
      'Transformed stage anxiety into stage presence',
      'Mastered vocal engineering and tonal modulation',
      'Delivered TEDx talk 6 months after program',
      'Built lasting network through alumni community'
    ]
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=450&q=80',
    name: 'Uduakabasi Etuk',
    role: 'Computer Engineer and Public Speaker',
    cohort: '10th Cohort',
    quote: 'The most transformative 10 weeks of my professional life. Every session pushed me beyond what I thought possible.',
    fullTestimony: `As a computer engineer, I always thought my technical skills would carry my career. But I kept hitting a ceiling—I couldn't effectively communicate my ideas to non-technical stakeholders.

ST Brains Modal College changed everything. The Strategic Oratory Design module taught me how to structure complex information in ways that resonate with any audience. I learned to translate technical jargon into compelling narratives.

The Structural Transition Mechanics training was particularly valuable. I now know how to guide my audience through complex presentations with seamless flow and logical coherence.

What I appreciated most was the practical, hands-on approach. Every week, we practiced in front of the cohort and received detailed feedback. The improvement was measurable and immediate.

Since completing the program, I've been promoted twice. My ability to present technical proposals to executives has become a key differentiator in my career.

The ST Brains Modal College community is also incredible. Fellow alumni regularly share opportunities and support each other's growth. It's not just a training program—it's a lifelong network of exceptional communicators.`,
    highlight: 'Bridging tech and communication excellence',
    keyTakeaways: [
      'Learned to translate technical concepts for any audience',
      'Mastered structural transition mechanics',
      'Promoted twice since completing program',
      'Became key technical-to-executive communicator'
    ]
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=450&q=80',
    name: 'Regina Edem',
    role: 'Administrative Lead, ST Brains Modal College',
    cohort: '7th Cohort',
    quote: 'I went from avoiding presentations to actively seeking speaking opportunities. The supportive community made all the difference.',
    fullTestimony: `I still remember my first day at ST Brains Modal College. I was terrified. I had spent years avoiding any situation that required public speaking.

The environment at ST Brains Modal College is unlike anything I've experienced. There's no judgment, only genuine support and encouragement. The facilitators create a safe space where it's okay to make mistakes and grow.

The Neurocognitive Memory Optimisation module was a game-changer for me. I always worried about forgetting my content. Learning the memory enhancement systems gave me the confidence to speak without relying on notes.

Week by week, I watched myself transform. By the end of the 10 weeks, I was volunteering to go first in presentations. That alone was a miracle.

Today, I'm not just a speaker—I'm part of the ST Brains Modal College family as the Administrative Lead. I get to witness other people's transformations, and it's the most rewarding experience.

If you're on the fence about joining, let me tell you: the investment is worth every kobo. ST Brains Modal College doesn't just teach you to speak—it helps you find your voice.`,
    highlight: 'From participant to team member',
    keyTakeaways: [
      'Overcame years of presentation avoidance',
      'Mastered neurocognitive memory optimization',
      'Transformed from fearful to volunteer presenter',
      'Joined ST Brains Modal College team as Administrative Lead'
    ]
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=450&q=80',
    name: 'Mary Edoho',
    role: 'Startup Founder',
    cohort: '8th Cohort',
    quote: 'ST Brains Modal College gave me the confidence to pitch to Fortune 500 companies. The persuasion techniques were game-changing.',
    fullTestimony: `As a startup founder, my ability to communicate directly impacts my company's survival. I needed to pitch to investors, convince partners, and inspire my team—all requiring exceptional speaking skills.

ST Brains Modal College delivered beyond my expectations. The Global Communication Protocols module helped me understand how to adapt my message for different cultural contexts. This was crucial as I expanded internationally.

The Executive Presence training was transformative. I learned that presence isn't about dominating a room—it's about authentic connection and strategic communication. The kinaesthetic awareness techniques helped me project confidence naturally.

The most valuable skill I gained was the ability to structure persuasive arguments. The frameworks for conceptual mapping and message engineering have helped me close deals worth millions.

Since ST Brains Modal College, I've successfully raised funding from top-tier investors and secured partnerships with Fortune 500 companies. My startup has grown 10x, and our communication culture reflects the principles I learned.

To fellow entrepreneurs: public speaking skills are your secret weapon. ST Brains Modal College will give you the edge you need to succeed.`,
    highlight: 'Scaling startups through communication',
    keyTakeaways: [
      'Mastered global communication protocols',
      'Secured Fortune 500 partnerships',
      'Raised funding from top-tier investors',
      'Grew startup 10x post-program'
    ]
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=450&q=80',
    name: 'James Wilson',
    role: 'Award-Winning Orator',
    cohort: '6th Cohort',
    quote: 'The storytelling frameworks helped me win a national oratory competition. This institute is world-class.',
    fullTestimony: `I had been competing in oratory competitions for years with moderate success. But something was missing. My speeches were technically sound but didn't move audiences the way I wanted.

ST Brains Modal College showed me what I was lacking. The Strategic Oratory Design module introduced me to storytelling frameworks that transformed my speeches from informative to unforgettable.

The training on rhetorical flow design was particularly impactful. I learned how to create emotional journeys for my audience, building tension and delivering powerful resolutions.

The Vocal Engineering module refined my delivery. I discovered how subtle variations in tone, pace, and emphasis could dramatically amplify my message's impact.

Three months after completing ST Brains Modal College, I entered the National Oratory Competition. I won first place, competing against speakers from across the country. The judges specifically praised my storytelling and vocal variety—exactly what ST Brains Modal College had taught me.

For anyone serious about oratory excellence, ST Brains Modal College is the gold standard. The training is rigorous, the feedback is honest, and the results speak for themselves.`,
    highlight: 'National champion orator',
    keyTakeaways: [
      'Transformed speeches from informative to unforgettable',
      'Mastered rhetorical flow and emotional journeys',
      'Won national oratory competition',
      'Praised for storytelling and vocal variety'
    ]
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=450&q=80',
    name: 'Linda Adeyemi',
    role: 'Marketing Director',
    cohort: '12th Cohort',
    quote: 'My presentations now command attention. The transformation in my confidence has been remarkable.',
    fullTestimony: `As a Marketing Director, I present regularly to clients, executives, and large teams. But despite years of experience, I always felt like something was missing. My presentations were competent but not compelling.

ST Brains Modal College gave me the tools to elevate my communication. The Cognitive Architecture module taught me how first and last impressions are formed, and how to strategically design openings and closings for maximum impact.

The Linguistic Precision training refined my language. I learned to choose words that create vivid images and emotional connections. My marketing pitches became significantly more persuasive.

What I valued most was the practice environment. Every week, we presented and received detailed feedback. The facilitators have an incredible eye for improvement opportunities.

Since completing the program, client win rates have increased dramatically. My team has noticed the change in my presence and confidence. I've also become a mentor for junior team members, passing on the principles I learned.

ST Brains Modal College is not just for people who fear public speaking. It's for anyone who wants to become an exceptional communicator. The investment pays dividends throughout your career.`,
    highlight: 'Transforming marketing through oratory',
    keyTakeaways: [
      'Elevated presentations from competent to compelling',
      'Mastered cognitive architecture for impact',
      'Dramatically increased client win rates',
      'Now mentors junior team members'
    ]
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=450&q=80',
    name: 'Robert Nwankwo',
    role: 'Executive Coach',
    cohort: '5th Cohort',
    quote: 'ST Brains Modal College equipped me with skills I now use to train other leaders. The investment paid for itself many times over.',
    fullTestimony: `I was already an executive coach when I joined ST Brains Modal College. I wanted to deepen my understanding of communication to better serve my clients.

What I found was a comprehensive system that transformed my coaching practice. The program's evidence-based approach to public speaking gave me frameworks I could teach with confidence.

The Applied Psychophysiology module was particularly valuable. Understanding the neurological basis of performance anxiety allowed me to help clients at a deeper level.

The Global Communication Protocols module expanded my perspective. I now help executives prepare for international audiences with cultural nuance and sensitivity.

Since ST Brains Modal College, I've incorporated their methodologies into my coaching practice. Client satisfaction has increased, and I've been able to command higher fees for my specialized communication coaching.

But beyond business impact, ST Brains Modal College rekindled my own passion for speaking. I now actively seek keynote opportunities and have become known as the "communication coach's coach."

For fellow professionals in the development space: ST Brains Modal College is essential learning. It will transform both your practice and your own capabilities.`,
    highlight: 'Coaching excellence through ST Brains Modal College principles',
    keyTakeaways: [
      'Enhanced coaching practice with ST Brains Modal College frameworks',
      'Mastered applied psychophysiology',
      'Increased client satisfaction and fees',
      'Known as "communication coach\'s coach"'
    ]
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=450&q=80',
    name: 'Grace Obi',
    role: 'Legal Counsel',
    cohort: '11th Cohort',
    quote: 'My courtroom presentations have never been more persuasive. The techniques are applicable across all professional contexts.',
    fullTestimony: `As a lawyer, persuasive communication is my profession. Yet I knew I could be more effective. ST Brains Modal College offered exactly what I needed.

The Strategic Oratory Design module transformed my approach to legal arguments. I learned to structure cases as compelling narratives, not just logical progressions.

The Vocal Engineering training was invaluable for courtroom dynamics. Controlling the pace, emphasizing key points, and using strategic pauses—these techniques have won cases.

What surprised me was how applicable the training was beyond the courtroom. Client meetings, negotiations, and professional presentations all benefited from the ST Brains Modal College approach.

The practice sessions were rigorous. Receiving feedback from facilitators and peers pushed me to constantly improve. The environment is demanding but supportive.

Since completing the program, my courtroom win rate has increased significantly. Colleagues have noticed the change in my presence and delivery. I've also been invited to speak at legal conferences—something I never imagined.

For fellow legal professionals: communication skills are as important as legal knowledge. ST Brains Modal College will make you a more effective advocate and a more persuasive professional.`,
    highlight: 'Winning cases through powerful advocacy',
    keyTakeaways: [
      'Transformed legal arguments into compelling narratives',
      'Mastered vocal engineering for courtroom impact',
      'Significantly increased win rate',
      'Now speaks at legal conferences'
    ]
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=450&q=80',
    name: 'Daniel Thompson',
    role: 'Sales Director',
    cohort: '9th Cohort',
    quote: 'Our team revenue increased by 40% after I applied what I learned. Communication is everything in sales.',
    fullTestimony: `Sales is communication. Every pitch, every negotiation, every closing relies on how effectively you connect with prospects. I knew I was leaving money on the table due to communication gaps.

ST Brains Modal College addressed this directly. The Executive Presence module taught me how to project confidence and credibility from the first handshake.

The Linguistic Precision training transformed my sales conversations. I learned to use language that resonates emotionally while maintaining professional credibility.

The most impactful module for sales was the strategic structuring of presentations. I now design pitches with psychological principles in mind—opening with impact, building tension, and closing with compelling calls to action.

Within six months of completing ST Brains Modal College, our team revenue increased by 40%. The techniques I learned, I've now trained my entire sales team on.

But it's not just about revenue. ST Brains Modal College taught me to communicate authentically. Sales conversations feel less like pitches and more like genuine consultations. Clients trust us more, and relationships last longer.

For anyone in sales or business development: ST Brains Modal College is the best investment you can make in your career. The ROI is immediate and substantial.`,
    highlight: '40% revenue growth through communication',
    keyTakeaways: [
      'Increased team revenue by 40% in 6 months',
      'Mastered executive presence from first contact',
      'Trained entire sales team on ST Brains Modal College principles',
      'Built stronger, trust-based client relationships'
    ]
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=450&q=80',
    name: 'Angela Eze',
    role: 'University Lecturer',
    cohort: '10th Cohort',
    quote: 'My students are more engaged than ever. ST Brains Modal College taught me how to truly connect with an audience.',
    fullTestimony: `I've been teaching for over a decade. My content was strong, but student engagement was always a challenge. ST Brains Modal College changed how I approach every lecture.

The Cognitive Architecture module taught me that openings and closings are crucial for learning retention. I now start every class with a compelling hook and end with memorable takeaways.

The Vocal Engineering training transformed my delivery. I learned that monotone delivery, even of excellent content, fails to engage. Strategic variation in pace, tone, and emphasis keeps students attentive.

The Executive Presence module helped me command the classroom differently. It's not about authority—it's about authentic engagement and strategic positioning.

Student feedback has improved dramatically. Attendance is up. Participation has increased. Most importantly, learning outcomes have improved measurably.

I've also started incorporating ST Brains Modal College principles into my curriculum. Students now receive public speaking training as part of their education.

For fellow educators: teaching is public speaking, every day. ST Brains Modal College will transform how you connect with your students and how effectively you transmit knowledge.`,
    highlight: 'Revolutionizing classroom engagement',
    keyTakeaways: [
      'Dramatically improved student engagement',
      'Increased attendance and participation',
      'Enhanced learning outcomes measurably',
      'Integrated ST Brains Modal College into curriculum'
    ]
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=450&q=80',
    name: 'Christopher Uche',
    role: 'Tech Entrepreneur',
    cohort: '8th Cohort',
    quote: 'Investor pitches became my strength after ST Brains Modal College. The program gave me the tools to communicate my vision effectively.',
    fullTestimony: `When I started my tech company, I had a great product but struggled to communicate its value. Investor meetings were painful. I knew the product was revolutionary, but I couldn't convey that effectively.

ST Brains Modal College transformed my ability to pitch. The Strategic Oratory Design module taught me to structure presentations that build excitement and urgency.

The training on memory optimization was crucial. I no longer needed slides as a crutch. I could deliver passionate, confident pitches from memory, maintaining eye contact and connection throughout.

The Executive Presence module helped me project the confidence investors look for. Startups are risky—investors bet on founders as much as products. ST Brains Modal College helped me become the kind of founder investors want to back.

Since completing the program, I've raised multiple rounds of funding. Investors now comment on the clarity and passion of my pitches. The company has grown from 5 to 50 employees.

But beyond fundraising, ST Brains Modal College improved all my stakeholder communication—with employees, partners, and customers. It's a foundational skill for any entrepreneur.

For fellow tech founders: your technical skills got you here, but communication skills will take you further. ST Brains Modal College is essential.`,
    highlight: 'From technical founder to compelling visionary',
    keyTakeaways: [
      'Transformed investor pitches into funding successes',
      'Mastered memory optimization for slide-free presenting',
      'Raised multiple funding rounds',
      'Grew company from 5 to 50 employees'
    ]
  },
];

export default function TestimonialDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const normalized = testimonialsData as unknown as Testimonial[];
    setAllTestimonials(normalized);
    const found = normalized.find((t) => t.id === id);
    setTestimonial(found || null);
    setLoading(false);
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;
    const title = `${testimonial?.name}'s Success Story - ST Brains Modal College`;
    const text = testimonial?.quote || '';

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setShowShareMenu(true);
        }
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowShareMenu(false);
  };

  const shareToSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${testimonial?.name}'s Success Story - ST Brains Modal College`);
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-[#0A1236] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1236] dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-white">Loading testimonial...</p>
        </div>
      </main>
    );
  }

  if (!testimonial) {
    notFound();
  }

  // Get next testimonial for recommendation
  // Find current index and get next one, or loop back to first if at the end
  const currentIndex = allTestimonials.findIndex(t => t.id === id);
  const nextTestimonial = currentIndex >= 0 && currentIndex < allTestimonials.length - 1
    ? allTestimonials[currentIndex + 1]
    : allTestimonials[0]; // Loop back to first testimonial if we're at the last one

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-[#0A0F1E] dark:via-[#0D1428] dark:to-[#0A0F1E]">
      {/* Reading Progress Bar - Premium Gradient */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <motion.div
          className="h-full bg-[#0A1236]"
          style={{ 
            width: `${scrollProgress}%`,
            boxShadow: '0 0 20px rgba(10, 18, 54, 0.5)',
          }}
        />
      </div>

      {/* Hero Section with Liquid Glass Effect */}
      <section className="relative pt-24 md:pt-28 lg:pt-32 pb-10 md:pb-14 lg:pb-20 px-4 md:px-6 overflow-hidden">
        {/* Animated Background Gradient - Sophisticated Colors */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-3xl animate-pulse" />
          <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-amber-500/5 via-orange-500/5 to-yellow-500/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-cyan-500/5 via-teal-500/5 to-emerald-500/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Back Button and Share Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center justify-between"
          >
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 hover:-translate-x-1 hover:shadow-2xl group bg-white/85 dark:bg-[#081225]"
              style={{
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              }}
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 text-slate-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-slate-700 dark:text-white">All Stories</span>
            </Link>

            <div className="relative">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 hover:shadow-2xl group bg-white/85 dark:bg-[#081225]"
                style={{
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                }}
              >
                <svg className="w-4 h-4 text-slate-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="text-slate-700 dark:text-white">Share Story</span>
              </button>

              {/* Share Menu Dropdown */}
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#081225] shadow-2xl border border-white/20 overflow-hidden z-50"
                  style={{
                    backdropFilter: 'blur(40px) saturate(180%)',
                  }}
                >
                  <div className="p-2">
                    <button
                      onClick={copyLink}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-left"
                    >
                      {copied ? (
                        <>
                          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 text-slate-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-medium text-slate-700 dark:text-white">Copy Link</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => shareToSocial('whatsapp')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-left"
                    >
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span className="text-sm font-medium text-slate-700 dark:text-white">WhatsApp</span>
                    </button>

                    <button
                      onClick={() => shareToSocial('twitter')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-left"
                    >
                      <svg className="w-5 h-5 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span className="text-sm font-medium text-slate-700 dark:text-white">Twitter</span>
                    </button>

                    <button
                      onClick={() => shareToSocial('facebook')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-left"
                    >
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="text-sm font-medium text-slate-700 dark:text-white">Facebook</span>
                    </button>

                    <button
                      onClick={() => shareToSocial('linkedin')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-left"
                    >
                      <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="text-sm font-medium text-slate-700 dark:text-white">LinkedIn</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Click outside to close share menu */}
          {showShareMenu && (
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowShareMenu(false)}
            />
          )}

          <div className="grid md:grid-cols-2 gap-12 items-center">{/* Tablet layout now matches desktop */}
            {/* Left: Image with Liquid Glass Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div
                className="relative rounded-[1.5rem] overflow-hidden group"
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(60px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(60px) saturate(200%)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 40px 120px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.4) inset, 0 2px 4px rgba(255, 255, 255, 0.3) inset',
                  padding: '0.25rem',
                }}
              >
                <div className="relative aspect-[3/4] rounded-[1rem] overflow-hidden shadow-2xl">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    priority
                    quality={95}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Cohort Badge in Top Left Corner */}
                  <div className="absolute top-6 left-6">
                    <div className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-white/20 backdrop-blur-sm text-white border border-white/30">
                      {testimonial.cohort}
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Right: Intro Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-sm tracking-[0.3em] uppercase text-[#0A1236] dark:text-white/90 mb-4 font-semibold">
                Success Story
              </p>
              <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-extralight text-[#0A1236] dark:text-white tracking-tight mb-4">
                {testimonial.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-white/70 mb-8">
                {testimonial.role}
              </p>

              {/* Highlight Quote */}
              <div
                className="p-8 rounded-2xl mb-8 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500 bg-white/90 dark:bg-[#081225]"
                style={{
                  backdropFilter: 'blur(40px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  borderLeft: '4px solid #0A1236',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                }}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#0A1236] opacity-70" />
                <p className="text-lg font-medium text-slate-800 dark:text-white italic leading-relaxed relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Key Achievement Badge */}
              <div 
                className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3.5 rounded-full transition-all duration-300 hover:scale-105 bg-white/90 dark:bg-[#081225]"
                style={{
                  backdropFilter: 'blur(40px) saturate(180%)',
                  border: '1px solid rgba(10, 18, 54, 0.2)',
                  boxShadow: '0 10px 30px rgba(10, 18, 54, 0.1)',
                }}
              >
                <svg className="w-5 h-5 text-[#0A1236] dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold text-slate-800 dark:text-white">
                  {testimonial.highlight}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Story Content */}
      <section className="py-10 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* The Journey */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-outfit text-2xl md:text-3xl lg:text-4xl font-extralight text-slate-900 dark:text-white mb-4 md:mb-6 lg:mb-8 tracking-tight">
              The Journey
            </h2>
            
            <div
              className="p-10 md:p-14 rounded-[2rem] prose prose-lg max-w-none hover:shadow-2xl transition-all duration-700 bg-white dark:bg-[#081225]"
              style={{
                backdropFilter: 'blur(60px) saturate(200%)',
                WebkitBackdropFilter: 'blur(60px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 40px 120px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 2px 8px rgba(255, 255, 255, 0.1) inset',
              }}
            >
              {testimonial.full_testimony.split('\n\n').map((paragraph: string, index: number) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-slate-700 dark:text-white leading-relaxed mb-6 last:mb-0 text-base md:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Key Takeaways */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-outfit text-3xl md:text-4xl font-extralight text-slate-900 dark:text-white mb-8 tracking-tight">
              Key Takeaways
            </h2>
            
            <div className="grid md:grid-cols-2 gap-5">
              {testimonial.key_takeaways?.map((takeaway: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 rounded-2xl group hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#081225]"
                  style={{
                    backdropFilter: 'blur(40px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'rgba(10, 18, 54, 0.9)',
                      boxShadow: '0 5px 20px rgba(10, 18, 54, 0.3)',
                    }}
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm md:text-base text-slate-700 dark:text-white leading-relaxed">{takeaway}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center p-12 md:p-16 rounded-[2rem] hover:shadow-2xl transition-all duration-700 bg-white dark:bg-[#081225]"
            style={{
              backdropFilter: 'blur(60px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 40px 120px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <h3 className="font-outfit text-2xl md:text-4xl font-extralight text-slate-900 dark:text-white mb-4 tracking-tight">
              Ready to Begin Your Transformation?
            </h3>
            <p className="text-slate-600 dark:text-white mb-10 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Join {testimonial.name} and hundreds of others who have mastered the art of impactful communication through ST Brains Modal College.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/enroll"
                className="px-10 py-4 rounded-full font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl group relative overflow-hidden bg-[#0A1236] text-white"
                style={{
                  boxShadow: '0 20px 60px rgba(10, 18, 54, 0.3)',
                }}
              >
                <span className="relative z-10">Enroll Now</span>
              </Link>
              <Link
                href="/testimonials"
                className="px-10 py-4 rounded-full font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                  color: '#1e293b',
                }}
              >
                More Stories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Next Story Suggestion */}
      {nextTestimonial && (
        <section className="py-20 px-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
          }}
        >
          {/* Ambient Glow Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-sm tracking-[0.3em] uppercase text-white/40 mb-4 text-center font-semibold">
              Next Story
            </p>
            <h2 className="font-outfit text-3xl md:text-4xl font-extralight text-white mb-12 text-center tracking-tight">
              Continue Reading
            </h2>
            
            <Link href={`/testimonials/${nextTestimonial.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div
                  className="relative p-8 md:p-10 rounded-[2rem] overflow-hidden transition-all duration-700 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 40px 120px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden"
                      style={{
                        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4)',
                      }}
                    >
                      <Image
                        src={nextTestimonial.image}
                        alt={nextTestimonial.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-wide mb-4 text-white"
                        style={{
                          background: 'rgba(10, 18, 54, 0.8)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        {nextTestimonial.cohort}
                      </span>
                      <h3 className="font-outfit text-2xl md:text-3xl font-medium text-white mb-2">
                        {nextTestimonial.name}
                      </h3>
                      <p className="text-white/60 text-sm mb-4">{nextTestimonial.role}</p>
                      <p className="text-white/80 mb-6 line-clamp-3 leading-relaxed">
                        &ldquo;{nextTestimonial.quote}&rdquo;
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3 text-white">
                        Read {nextTestimonial.name.split(' ')[0]}'s Story
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </section>
      )}

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}
