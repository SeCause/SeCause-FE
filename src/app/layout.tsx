import '@/app/globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SeCause',
  description: 'AI 기반 코드 보안 취약점 분석 및 수정 가이드 제공 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
