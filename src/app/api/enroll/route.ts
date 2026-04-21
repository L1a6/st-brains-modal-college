import { NextRequest, NextResponse } from 'next/server';
import { createEnrollment } from '@/lib/supabase';
import { sendEmail } from '@/lib/nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, message } = body;

    // Validate required fields
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const enrollment = await createEnrollment({
      full_name: fullName,
      email,
      phone,
      message,
    });

    // Send emails (don't fail request if emails fail)
    let emailsSent = false;
    let emailError = null;
    
    try {
      console.log('📧 Attempting to send emails...');
      console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
      console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
      console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
      console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
      
      // Dynamic import of React component
      const { default: WelcomeEmail } = await import('@/components/emails/WelcomeEmail');
      
      // 1. Send welcome email to applicant
      console.log('📨 Sending welcome email to:', email);
      await sendEmail({
        to: email,
        subject: 'Welcome to ST Brains Modal College - Application Received',
        react: WelcomeEmail({
          fullName,
          email,
          phone,
          message,
        }),
      });

      // 2. Send notification to admin
      console.log('📨 Sending admin notification to:', process.env.ADMIN_EMAIL);
      await sendEmail({
        to: process.env.ADMIN_EMAIL!,
        subject: `New Enrollment: ${fullName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #7F1D1D; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .info-row { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #7F1D1D; }
              .info-label { font-weight: bold; color: #7F1D1D; }
              .button { display: inline-block; padding: 12px 24px; background: #7F1D1D; color: white; text-decoration: none; border-radius: 4px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Enrollment Application</h1>
              </div>
              <div class="content">
                <p>A new enrollment application has been submitted:</p>
                
                <div class="info-row">
                  <div class="info-label">Name:</div>
                  <div>${fullName}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">Email:</div>
                  <div><a href="mailto:${email}">${email}</a></div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">Phone:</div>
                  <div><a href="tel:${phone}">${phone}</a></div>
                </div>
                
                ${message ? `
                <div class="info-row">
                  <div class="info-label">Message:</div>
                  <div>${message}</div>
                </div>
                ` : ''}
                
                <div class="info-row">
                  <div class="info-label">Submitted:</div>
                  <div>${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</div>
                </div>
                
                <a href="${process.env.NEXT_PUBLIC_SITE_URL?.includes('localhost') ? 'https://stbrainsmodalcollege.vercel.app' : (process.env.NEXT_PUBLIC_SITE_URL || 'https://stbrainsmodalcollege.vercel.app')}/admin/enrollments" class="button">
                  View in Admin Dashboard →
                </a>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      console.log('✅ Emails sent successfully');
      emailsSent = true;
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      emailError = error instanceof Error ? error.message : 'Unknown email error';
      console.error('Email error details:', emailError);
      // Don't fail the entire request if email fails
      // The enrollment is still saved in database
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      enrollmentId: enrollment.id,
      emailsSent,
      emailError: emailError || undefined,
    });
  } catch (error) {
    console.error('❌ Enrollment error:', error);
    
    // Return more detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error ? error.stack : String(error);
    
    console.error('Error details:', errorDetails);
    
    return NextResponse.json(
      { 
        error: 'Failed to process enrollment',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}