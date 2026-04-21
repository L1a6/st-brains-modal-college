import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface WelcomeEmailProps {
  fullName: string;
  email: string;
  phone: string;
  message?: string;
}

export default function WelcomeEmail({ 
  fullName, 
  email, 
  phone, 
  message 
}: WelcomeEmailProps) {
  // Use production URL by default, fallback to env variable for local development
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.includes('localhost') 
    ? 'https://stbrainsmodalcollege.vercel.app'
    : (process.env.NEXT_PUBLIC_SITE_URL || 'https://stbrainsmodalcollege.vercel.app');
  
  return (
    <Html>
      <Head />
      <Preview>Welcome to ST Brains Modal College - Your Journey to Excellence Begins</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80"
              width="180"
              height="60"
              alt="ST Brains Modal College"
              style={logo}
            />
          </Section>

          {/* Hero Section */}
          <Section style={heroSection}>
            <Heading style={h1}>Welcome to ST Brains Modal College</Heading>
            <Text style={heroText}>
              Your Journey to Excellence Begins Here
            </Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={paragraph}>
              Dear <strong>{fullName}</strong>,
            </Text>
            <Text style={paragraph}>
              Thank you for your interest in the <strong>ST Brains Modal College</strong>. 
              We are thrilled to receive your enrollment application and excited about the 
              possibility of guiding you on your journey through premium secondary education.
            </Text>

            {/* Info Box */}
            <Section style={infoBox}>
              <Heading as="h2" style={h2}>
                What Happens Next?
              </Heading>
              <Text style={listItem}>
                <strong>1. Application Review</strong>
                <br />
                Our team will carefully review your application within 24-48 hours.
              </Text>
              <Text style={listItem}>
                <strong>2. Personal Consultation</strong>
                <br />
                We'll contact you via email or phone to discuss your goals and recommend the best program for you.
              </Text>
              <Text style={listItem}>
                <strong>3. Enrollment Confirmation</strong>
                <br />
                Once approved, you'll receive detailed information about program dates, fees, and next steps.
              </Text>
            </Section>

            {/* Your Details */}
            <Section style={detailsBox}>
              <Heading as="h3" style={h3}>Your Application Details</Heading>
              <Text style={detailText}>
                <strong>Name:</strong> {fullName}<br />
                <strong>Email:</strong> {email}<br />
                <strong>Phone:</strong> {phone}
                {message && (
                  <>
                    <br />
                    <strong>Message:</strong> {message}
                  </>
                )}
              </Text>
            </Section>

            <Text style={paragraph}>
              In the meantime, feel free to explore our website to learn more about our school,
              facilities, and the student experience that awaits you.
            </Text>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Link href={`${siteUrl}/courses`} style={button}>
                Explore School Information
              </Link>
            </Section>

            <Hr style={hr} />

            {/* Contact Info */}
            <Section style={contactSection}>
              <Heading as="h3" style={h3}>Questions?</Heading>
              <Text style={contactText}>
                We're here to help! Feel free to reach out:
              </Text>
              <Text style={contactText}>
                Email: <Link href="mailto:admissions@stbrainsmodalcollege.edu.ng" style={link}>admissions@stbrainsmodalcollege.edu.ng</Link><br />
                Web: <Link href={siteUrl} style={link}>ST Brains Modal College Website</Link>
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerText}>
              <strong>ST Brains Modal College</strong><br />
              Premium Secondary Education in Uyo
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} ST Brains Modal College. All rights reserved.
            </Text>
            <Text style={footerLinks}>
              <Link href={`${siteUrl}/about`} style={footerLink}>About</Link> • 
              <Link href={`${siteUrl}/gallery`} style={footerLink}>Gallery</Link> • 
              <Link href={`${siteUrl}/enroll`} style={footerLink}>Enroll</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f6f6',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '40px 40px 20px',
  textAlign: 'center' as const,
  backgroundColor: '#7F1D1D',
};

const logo = {
  margin: '0 auto',
};

const heroSection = {
  backgroundColor: '#7F1D1D',
  padding: '20px 40px 40px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: '300',
  lineHeight: '1.3',
  margin: '0 0 8px',
};

const heroText = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: '300',
  lineHeight: '1.5',
  margin: '0',
  opacity: '0.9',
};

const content = {
  padding: '40px',
};

const paragraph = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const h2 = {
  color: '#7F1D1D',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 20px',
};

const h3 = {
  color: '#7F1D1D',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 12px',
};

const infoBox = {
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #e5e7eb',
};

const listItem = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const detailsBox = {
  backgroundColor: '#f0f9ff',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #bfdbfe',
};

const detailText = {
  color: '#1e40af',
  fontSize: '15px',
  lineHeight: '1.8',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#0A1236',
  borderRadius: '50px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const contactSection = {
  margin: '32px 0',
};

const contactText = {
  color: '#6b7280',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 8px',
};

const link = {
  color: '#0A1236',
  textDecoration: 'underline',
};

const footer = {
  padding: '0 40px 40px',
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '8px 0',
  textAlign: 'center' as const,
};

const footerLinks = {
  textAlign: 'center' as const,
  margin: '16px 0 0',
};

const footerLink = {
  color: '#6b7280',
  fontSize: '14px',
  textDecoration: 'none',
  margin: '0 8px',
};

// Export for preview/testing
WelcomeEmail.PreviewProps = {
  fullName: 'John Doe',
  email: 'john@example.com',
  phone: '+234 123 456 7890',
  message: 'I am interested in improving my public speaking skills for corporate presentations.',
} as WelcomeEmailProps;