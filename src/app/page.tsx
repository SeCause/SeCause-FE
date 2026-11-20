import type { Metadata } from 'next';

import { SITE_NAME, SITE_URL } from '@/shared/config/site';
import PageTransition from '@/shared/ui/PageTransition';
import { FaqSection, HeroSection, HowItWorksSection, LandingFooter } from '@/widgets/landing';

export const metadata: Metadata = {
  title: 'GitHub 코드 보안 분석',
  description:
    'GitHub 저장소의 보안 취약점을 분석하고 심각도별 현황, 원인 설명과 수정 방법을 확인하세요.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'GitHub 코드 보안 분석 | SeCause',
    description:
      'GitHub 저장소의 보안 취약점을 분석하고 심각도별 현황, 원인 설명과 수정 방법을 확인하세요.',
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: '/open_graph.jpg', width: 1200, height: 630 }],
  },
};

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
