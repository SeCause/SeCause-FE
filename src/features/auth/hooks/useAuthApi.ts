'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postGithubLogin, postLogout } from '@/features/auth/api/auth';
import type { LoginData } from '@/features/auth/model/types';

export function useGithubLogin() {
  const router = useRouter();

  return useMutation<LoginData, Error, string>({
    mutationFn: (code: string) => postGithubLogin({ code }),
    onSuccess: (data) => {
      document.cookie = `access_token=${data.accessToken}; path=/; SameSite=Lax`;
      router.replace('/');
    },
  });
}

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      document.cookie = 'access_token=; path=/; max-age=0';
      router.replace('/login');
    },
  });
}
