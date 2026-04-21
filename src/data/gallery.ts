export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  created_at: string;
}

const seedImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&q=80',
    title: 'Candlelight Procession',
    category: 'candlelight',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1400&q=80',
    title: 'Cultural Day Performance',
    category: 'cultural',
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=80',
    title: 'Graduation Ceremony',
    category: 'graduation',
    created_at: new Date().toISOString(),
  },
];

let galleryImages = [...seedImages];
let nextId = seedImages.length + 1;

export function listGalleryImages(category?: string) {
  if (!category || category === 'all') {
    return [...galleryImages];
  }
  return galleryImages.filter((item) => item.category === category);
}

export function addGalleryImage(input: Omit<GalleryImage, 'id' | 'created_at'>) {
  const next: GalleryImage = {
    id: nextId++,
    src: input.src,
    title: input.title,
    category: input.category,
    created_at: new Date().toISOString(),
  };
  galleryImages.push(next);
  return next;
}

export function removeGalleryImage(id: number) {
  const before = galleryImages.length;
  galleryImages = galleryImages.filter((item) => item.id !== id);
  return galleryImages.length !== before;
}
