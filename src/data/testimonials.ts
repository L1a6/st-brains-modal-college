export interface Testimonial {
  id: number;
  name: string;
  role: string;
  cohort: string;
  image: string;
  quote: string;
  full_testimony: string;
  highlight: string;
  key_takeaways: string[];
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Edidiong Atainyang',
    role: 'Parent',
    cohort: 'Parent Community',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=450&q=80',
    quote:
      'The structure, discipline, and support system at ST Brains Modal College have transformed my daughter.',
    full_testimony:
      'Before joining ST Brains Modal College, my daughter struggled with confidence and consistency. Within a short period, we saw clear improvement in her study habits and communication.\n\nThe teachers are intentional, attentive, and always willing to support students beyond the classroom. The school environment is clean, safe, and highly motivating.\n\nToday she is more focused, more confident, and performs better academically. We are truly grateful for the quality of education and values the school provides.',
    highlight: 'Visible growth in confidence and academics',
    key_takeaways: [
      'Improved discipline and focus',
      'Stronger communication and confidence',
      'Excellent teacher support',
      'Better academic results',
    ],
  },
  {
    id: 2,
    name: 'Idy Xavier',
    role: 'Alumnus',
    cohort: 'Class of 2024',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=450&q=80',
    quote:
      'The school prepared me academically and personally for life after secondary school.',
    full_testimony:
      'ST Brains Modal College gave me more than good grades. It taught me how to lead, manage time, and work with others effectively.\n\nThe ICT and science practical sessions made learning real and exciting. I graduated with confidence and clarity about my next steps.\n\nI now recommend the school to younger students because the training is balanced: academics, discipline, and character.',
    highlight: 'Prepared for higher education and leadership',
    key_takeaways: [
      'Strong exam preparation',
      'Practical science and ICT exposure',
      'Leadership development',
      'Balanced academic and character training',
    ],
  },
  {
    id: 3,
    name: 'Regina Edem',
    role: 'Parent',
    cohort: 'Parent Community',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=450&q=80',
    quote:
      'The communication between the school and parents is excellent, and the outcomes are impressive.',
    full_testimony:
      'From day one, ST Brains Modal College kept us informed about academic progress, student welfare, and school activities.\n\nThis level of communication gave us confidence as parents and helped us support our child effectively at home.\n\nOur son is now more responsible and consistently performs better in class. The school has exceeded our expectations.',
    highlight: 'Excellent parent-school communication',
    key_takeaways: [
      'Consistent communication with parents',
      'Improved student responsibility',
      'Strong welfare and academic monitoring',
      'Positive home-school partnership',
    ],
  },
  {
    id: 4,
    name: 'Mary Edoho',
    role: 'Parent',
    cohort: 'Parent Community',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=450&q=80',
    quote:
      'The premium facilities and top-notch staff make a big difference in learning quality.',
    full_testimony:
      'One major reason we chose ST Brains Modal College was the quality of facilities, and we have not been disappointed.\n\nFrom classrooms to labs and learning resources, everything supports effective teaching. The staff are professional and truly committed to student success.\n\nMy child now enjoys school and participates actively in both academics and extracurricular activities.',
    highlight: 'Premium facilities with committed staff',
    key_takeaways: [
      'Modern learning facilities',
      'Professional and caring teachers',
      'Higher student engagement',
      'Strong all-round development',
    ],
  },
  {
    id: 5,
    name: 'Angela Eze',
    role: 'Parent',
    cohort: 'Parent Community',
    image:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=450&q=80',
    quote:
      'My daughter moved from average to outstanding with the school’s structured support.',
    full_testimony:
      'The academic structure at ST Brains Modal College is clear, rigorous, and supportive. Teachers identify weak areas early and provide practical support.\n\nThis personalized attention helped my daughter improve steadily over three terms.\n\nShe is now among the top performers in her class and has developed a stronger sense of responsibility.',
    highlight: 'From average to outstanding performance',
    key_takeaways: [
      'Early academic intervention',
      'Personalized teacher support',
      'Steady term-by-term progress',
      'Greater student responsibility',
    ],
  },
  {
    id: 6,
    name: 'Christopher Uche',
    role: 'Alumnus',
    cohort: 'Class of 2025',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=450&q=80',
    quote:
      'I left the school confident, prepared, and ready for the next academic level.',
    full_testimony:
      'As a student, I appreciated how the school combined discipline with encouragement. The expectations were high, but the support was always available.\n\nThe learning environment pushed me to improve academically and build better habits.\n\nBy graduation, I was more confident and better prepared for advanced studies and leadership opportunities.',
    highlight: 'Confident and future-ready at graduation',
    key_takeaways: [
      'Strong academic preparation',
      'Healthy discipline culture',
      'Confidence and leadership growth',
      'Readiness for next academic stage',
    ],
  },
];
