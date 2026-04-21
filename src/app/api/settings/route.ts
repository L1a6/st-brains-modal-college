import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_SITE_SETTINGS, SiteSettings } from '@/data/site-settings';

let inMemorySettings: SiteSettings = { ...DEFAULT_SITE_SETTINGS };

// GET - Fetch site settings
export async function GET() {
  return NextResponse.json({ settings: inMemorySettings });
}

// PATCH - Update site settings
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { registration_open, current_cohort, cohort_message } = body;

    inMemorySettings = {
      registration_open: Boolean(registration_open),
      current_cohort: Number(current_cohort) || DEFAULT_SITE_SETTINGS.current_cohort,
      cohort_message:
        cohort_message?.trim() || DEFAULT_SITE_SETTINGS.cohort_message,
    };

    return NextResponse.json({ settings: inMemorySettings });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
