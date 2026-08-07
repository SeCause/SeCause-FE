import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { RepositoryDashboard } from '@/features/repositories';
import { getRepositoryDashboardServer } from '@/features/repositories/api/repositories.server';
import { repositoryDashboardKey } from '@/features/repositories/model/queryKeys';
import { createServerQueryClient } from '@/shared/lib/queryClient';

export const metadata: Metadata = {
  title: '대시보드',
};

interface Props {
  params: Promise<{ repositoryId: string }>;
}

export default async function RepositoryDetailPage({ params }: Props) {
  const { repositoryId: repositoryIdParam } = await params;
  const repositoryId = Number(repositoryIdParam);

  if (!Number.isSafeInteger(repositoryId) || repositoryId <= 0) {
    notFound();
  }

  const queryClient = createServerQueryClient();
  // 실패(인증 만료 등)해도 던지기만 할 뿐 여기서 잡지 않는다 — prefetchQuery가 내부에서
  // 삼키고, 실패한 쿼리는 dehydrate 대상에서 빠지므로 클라이언트가 평소처럼 재요청한다.
  await queryClient.prefetchQuery({
    queryKey: repositoryDashboardKey(repositoryId),
    queryFn: () => getRepositoryDashboardServer(repositoryId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RepositoryDashboard repositoryId={repositoryId} />
    </HydrationBoundary>
  );
}
