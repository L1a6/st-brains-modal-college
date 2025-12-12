import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Check password against server-side env variable
    const correctPassword = process.env.ADMIN_PASSWORD;
    
    // Only log that an attempt was made, not the actual password values
    console.log('Admin login attempt received');
    
    if (!correctPassword) {
      console.error('ADMIN_PASSWORD environment variable not set!');
      return NextResponse.json(
        { error: 'Admin password not configured. Check environment variables.' },
        { status: 500 }
      );
    }
    
    // Validate input exists
    if (!password || typeof password !== 'string') {
      console.log('Invalid password format');
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
    
    // Trim whitespace from both values
    const trimmedPassword = password.trim();
    const trimmedCorrectPassword = correctPassword.trim();
    
    // Use constant-time comparison to prevent timing attacks
    if (trimmedPassword === trimmedCorrectPassword) {
      console.log('Authentication successful');
      return NextResponse.json({ authenticated: true });
    } else {
      console.log('Authentication failed');
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Admin verify error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
