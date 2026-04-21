export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio?: string;
}

export const leadershipTeam: LeadershipMember[] = [
  {
    id: '1',
    name: 'Dr. Brain',
    title: 'Principal',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&q=80',
    bio: 'Leading ST Brains Modal College with a vision for discipline, excellence, and student success.',
  },
  {
    id: '2',
    name: 'Professor Effiong Johnson',
    title: 'Chairman, Board of Studies',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=80',
    bio: 'Guiding academic quality, curriculum depth, and continuous school improvement.',
  },
  {
    id: '3',
    name: 'Regina Edem',
    title: 'Administrative Lead',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
    bio: 'Ensuring smooth operations, efficient systems, and excellent student support services.',
  },
  {
    id: '4',
    name: 'Ubong S. Akpan',
    title: 'Head of Communications',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    bio: 'Managing school communications and parent-community engagement initiatives.',
  },
];