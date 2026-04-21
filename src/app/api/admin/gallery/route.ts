import { NextResponse } from 'next/server';
import { addGalleryImage, listGalleryImages, removeGalleryImage } from '@/data/gallery';

export async function GET() {
  try {
    const data = listGalleryImages();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { src, title, category } = body;

    if (!src || !title || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: src, title, category' },
        { status: 400 }
      );
    }

    const validCategories = ['candlelight', 'cultural', 'defence', 'field', 'graduation', 'dinner'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      );
    }

    const data = addGalleryImage({ src, title, category });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Gallery image ID is required' },
        { status: 400 }
      );
    }

    const removed = removeGalleryImage(Number(id));
    if (!removed) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
}
