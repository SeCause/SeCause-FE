import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '분석 요청',
  robots: { index: false, follow: false },
};

export default function AnalysisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
