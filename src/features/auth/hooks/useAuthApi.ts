'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getUser, postGithubLogin, postLogout } from '@/features/auth/api/auth';
import type { GithubLoginResponse } from '@/features/auth/model/types';
import { ROUTES } from '@/shared/config/routes';

export function useGithubLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<GithubLoginResponse, Error, string>({
    mutationFn: (code: string) => postGithubLogin({ code }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.replace(ROUTES.home);
    },
  });
}

export function useUser({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      router.replace(ROUTES.login);
    },
  });
}
