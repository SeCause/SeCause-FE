import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { githubAccountsKey, resolveActiveAccount } from '@/features/analysis';
import { getGithubAccountsServer } from '@/features/analysis/index.server';
import { getUserServer } from '@/features/auth/index.server';
import { repositoriesKey } from '@/features/repositories';
import { getRepositoriesServer } from '@/features/repositories/index.server';
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

  // 저장소 목록 쿼리 키에 계정명이 들어가므로 계정을 먼저 확정해야 한다. 여기서 건너뛰면
  // 클라이언트가 계정을 받는 순간 키가 바뀌어 프리페치한 목록이 버려진다.
  const [accounts, user] = await Promise.all([
    queryClient
      .fetchQuery({ queryKey: githubAccountsKey(), queryFn: getGithubAccountsServer })
      .catch(() => []),
    getUserServer().catch(() => null),
  ]);

  if (user) queryClient.setQueryData(['user'], user);

  const activeAccount = resolveActiveAccount(accounts, account ?? null);
  const params = activeAccount ? { accountName: activeAccount } : undefined;

  await queryClient.prefetchQuery({
    queryKey: repositoriesKey(params),
    queryFn: () => getRepositoriesServer(params),
  });

  return (
    <PageTransition>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={null}>
          <MyPageClient
            initialAccounts={accounts}
            initialActiveAccount={activeAccount}
            initialUser={user}
          />
        </Suspense>
      </HydrationBoundary>
    </PageTransition>
  );
}
