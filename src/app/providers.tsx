'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';

import { queryClient } from '@/shared/lib/queryClient';
import { ToastProvider } from '@/shared/ui/Toast';

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
