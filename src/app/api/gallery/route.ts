import { NextResponse } from 'next/server';
import { listGalleryImages } from '@/data/gallery';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const data = listGalleryImages(category || undefined);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
