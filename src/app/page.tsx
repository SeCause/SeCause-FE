import FaqSection from '@/widgets/landing/ui/FaqSection';
import HeroSection from '@/widgets/landing/ui/HeroSection';
import HowItWorksSection from '@/widgets/landing/ui/HowItWorksSection';

export default function Home() {
  return (
    <>
      <div className="bg-mesh fixed inset-0 -z-10" />
      <div className="bg-dot-grid fixed inset-0 -z-10" />
      <HeroSection />
      <HowItWorksSection />
      <FaqSection />
    </>
  );
}
