'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useGithubLogin } from '@/features/auth/hooks/useAuthApi';

export default function LoginCallback() {
  const searchParams = useSearchParams();
  const { mutate, isPending, isError } = useGithubLogin();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) mutate(code);
  }, [mutate, searchParams]);

  if (isError) return <p className="text-text-secondary text-sm">로그인 중 오류가 발생했습니다.</p>;

  return (
    <div className="flex flex-1 items-center justify-center">
      {isPending && (
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
      )}
    </div>
  );
}
