import PageTransition from '@/shared/ui/PageTransition';
import FaqSection from '@/widgets/landing/ui/FaqSection';
import HeroSection from '@/widgets/landing/ui/HeroSection';
import HowItWorksSection from '@/widgets/landing/ui/how-it-works/HowItWorksSection';
import LandingFooter from '@/widgets/landing/ui/LandingFooter';

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <HowItWorksSection />
      <FaqSection />
      <LandingFooter />
    </PageTransition>
  );
}
