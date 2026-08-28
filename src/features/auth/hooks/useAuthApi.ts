'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSyncExternalStore } from 'react';

import { getUser, patchUser, postGithubLogin, postLogout } from '@/features/auth/api/auth';
import { clearSessionHint, hasSessionHint, setSessionHint } from '@/features/auth/lib/sessionHint';
import type {
  GetUserResponse,
  GithubLoginResponse,
  UpdateUserRequest,
} from '@/features/auth/model/types';
import { ROUTES } from '@/shared/config/routes';

export function useGithubLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<GithubLoginResponse, Error, string>({
    mutationFn: (code: string) => postGithubLogin({ code }),
    onSuccess: (user) => {
      setSessionHint();
      queryClient.setQueryData<GetUserResponse>(['user'], user);
      router.replace(ROUTES.mypage);
    },
  });
}

// 구독할 쿠키 변경 이벤트가 없다.
const noSubscription = () => () => {};
// 서버는 쿠키를 모른다. 하이드레이션 불일치를 막기 위해 false로 시작한다.
const notLoggedInOnServer = () => false;

export function useSessionHint() {
  return useSyncExternalStore(noSubscription, hasSessionHint, notLoggedInOnServer);
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
      clearSessionHint();
      queryClient.removeQueries({ queryKey: ['user'] });
      router.replace(ROUTES.login);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<GetUserResponse, Error, UpdateUserRequest>({
    mutationFn: patchUser,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
    },
  });
}
