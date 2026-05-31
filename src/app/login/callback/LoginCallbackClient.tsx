'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useGithubLogin } from '@/features/auth/hooks/useAuthApi';
import { ROUTES } from '@/shared/config/routes';
import { useToast } from '@/shared/ui/Toast';

export default function LoginCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useToast();
  const { mutate, isPending } = useGithubLogin();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      mutate(code, {
        onError: () => {
          showToast('로그인 중 오류가 발생했습니다.');
          router.replace(ROUTES.login);
        },
      });
    } else {
      router.replace(ROUTES.login);
    }
  }, [mutate, searchParams, router, showToast]);

  return (
    <div className="flex flex-1 items-center justify-center">
      {isPending && (
        <div className="border-blue h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
      )}
    </div>
  );
}
