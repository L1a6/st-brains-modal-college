export interface Facilitator {
  id: string;
  name: string;
  title: string;
  image: string;
  bio?: string;
  specializations?: string[];
}

export const facilitators: Facilitator[] = [
  {
    id: '1',
    name: 'Raphael Edem',
    title: 'Senior Teacher',
    image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=800&q=80',
    specializations: ['English Language', 'Communication Skills'],
  },
  {
    id: '2',
    name: 'Ini Ememobong',
    title: 'Academic Coordinator',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80',
    specializations: ['Leadership Development', 'Student Mentoring'],
  },
  {
    id: '3',
    name: 'Mrs Eno Ekong',
    title: 'Lead Tutor',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
    specializations: ['Mathematics', 'Academic Coaching'],
  },
  {
    id: '4',
    name: 'Aniekeme Finbarr',
    title: 'Science Teacher',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    specializations: ['Physics', 'Laboratory Practicals'],
  },
  {
    id: '5',
    name: 'Aniekan Usoroh',
    title: 'ICT Instructor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    specializations: ['Computer Studies', 'Digital Skills'],
  },
];

