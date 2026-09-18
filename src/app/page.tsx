import PageTransition from '@/shared/ui/PageTransition';
import { FaqSection, HeroSection, HowItWorksSection, LandingFooter } from '@/widgets/landing';

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
