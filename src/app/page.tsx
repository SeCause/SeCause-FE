import FaqSection from '@/widgets/landing/ui/FaqSection';
import HeroSection from '@/widgets/landing/ui/HeroSection';
import HowItWorksSection from '@/widgets/landing/ui/how-it-works/HowItWorksSection';

export default function Home() {
  return (
    <>
      <div className="bg-mesh z-below fixed inset-0" />
      <div className="bg-dot-grid z-below fixed inset-0" />
      <HeroSection />
      <HowItWorksSection />
      <FaqSection />
    </>
  );
}
