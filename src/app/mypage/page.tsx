import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { getUserServer } from '@/features/auth/index.server';
import { repositoriesKey } from '@/features/repositories';
import { getRepositoriesServer } from '@/features/repositories/index.server';
import type { Repository } from '@/features/repositories/model/types';
import { createServerQueryClient } from '@/shared/lib/queryClient';
import PageTransition from '@/shared/ui/PageTransition';

import MyPageClient from './MyPageClient';

export const metadata: Metadata = {
  title: '마이페이지',
};

interface Props {
  searchParams: Promise<{ account?: string }>;
}

export default async function MyPage({ searchParams }: Props) {
  const { account } = await searchParams;
  const queryClient = createServerQueryClient();

  // GitHub 계정 목록(/user/orgs)은 느려서 기다리지 않는다. 기본 계정은 개인 계정(githubLoginId)이다.
  const user = await getUserServer().catch(() => null);
  if (user) queryClient.setQueryData(['user'], user);

  const activeAccount = account ?? user?.githubLoginId ?? null;
  const params = activeAccount ? { accountName: activeAccount } : undefined;

  let initialRepositories: Repository[] | null = null;
  try {
    const result = await queryClient.fetchQuery({
      queryKey: repositoriesKey(params),
      queryFn: () => getRepositoriesServer(params),
    });
    initialRepositories = result.repositories;
  } catch {
    // The client query retries if the server-side request fails.
  }

  return (
    <PageTransition>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={null}>
          <MyPageClient
            initialActiveAccount={activeAccount}
            initialRepositories={initialRepositories}
            initialUser={user}
          />
        </Suspense>
      </HydrationBoundary>
    </PageTransition>
  );
}
