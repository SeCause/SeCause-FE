'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { queryClient } from '@/shared/lib/queryClient';
import { ToastProvider } from '@/shared/ui/Toast';

// 개발 환경에서만 렌더링되므로, 프로덕션 번들이 devtools 청크를 아예 받아오지 않도록 지연 로드한다.
const ReactQueryDevtools = dynamic(
  () => import('@tanstack/react-query-devtools').then((mod) => mod.ReactQueryDevtools),
  { ssr: false },
);

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    history.scrollRestoration = 'manual';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        {children}
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </ToastProvider>
    </QueryClientProvider>
  );
}
