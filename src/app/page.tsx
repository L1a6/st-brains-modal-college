import HeroSection from '@/components/home/HeroSection';
import TransformSection from '@/components/home/TransformSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StaffSection from '@/components/home/StaffSection';
import EnrollSection from '@/components/home/EnrollSection';
import FAQSection from '@/components/home/FAQSection';
import ClosingSection from '@/components/home/ClosingSection';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <TransformSection />
      <TestimonialsSection />
      <StaffSection />
      <EnrollSection />
      <FAQSection />
      <ClosingSection />
    </main>
  );
}