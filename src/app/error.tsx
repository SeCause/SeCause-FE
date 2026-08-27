'use client';

import ErrorState from '@/shared/ui/ErrorState';

// 하위 라우트 세그먼트에 자체 error.tsx가 없을 때 걸리는 전역 fallback.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorState error={error} onRetry={reset} />;
}
