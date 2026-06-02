import '@/app/globals.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import { Header } from '@/widgets/header';

import Providers from './providers';

export const metadata: Metadata = {
  title: 'SeCause',
  description: 'AI 기반 코드 보안 취약점 분석 및 수정 가이드 제공 서비스',
  openGraph: {
    title: 'SeCause',
    description: 'AI 기반 코드 보안 취약점 분석 및 수정 가이드 제공 서비스',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="scrollbar-hide h-full scroll-smooth antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
