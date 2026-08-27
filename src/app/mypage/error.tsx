'use client';

import ErrorState from '@/shared/ui/ErrorState';

export default function MyPageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      error={error}
      title="마이페이지를 불러오지 못했습니다."
      description="저장소 정보를 가져오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
      onRetry={reset}
    />
  );
}
