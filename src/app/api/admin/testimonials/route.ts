import { NextResponse } from 'next/server';
import { testimonialsData } from '@/data/testimonials';

const LOCAL_MODE_MESSAGE =
  'Testimonials are running in local-file mode. Admin writes are disabled for now.';

export async function GET() {
  return NextResponse.json(testimonialsData);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(
    {
      error: LOCAL_MODE_MESSAGE,
      payload: body,
    },
    { status: 501 }
  );
}

export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json(
    {
      error: LOCAL_MODE_MESSAGE,
      payload: body,
    },
    { status: 501 }
  );
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  return NextResponse.json(
    {
      error: LOCAL_MODE_MESSAGE,
      id,
    },
    { status: 501 }
  );
}
