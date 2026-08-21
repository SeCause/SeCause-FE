import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { getRepositoriesServer } from '@/features/repositories/api/repositories.server';
import { repositoriesKey } from '@/features/repositories/model/queryKeys';
import { createServerQueryClient } from '@/shared/lib/queryClient';
import PageTransition from '@/shared/ui/PageTransition';

import MyPageClient from './MyPageClient';

export const metadata: Metadata = {
  title: '마이페이지',
};

export default async function MyPage() {
  const queryClient = createServerQueryClient();
  // 기본 진입 탭이 'repositories'이므로 그 목록만 미리 가져온다. 실패해도 던지기만 할 뿐
  // 여기서 잡지 않는다 — 실패한 쿼리는 dehydrate 대상에서 빠지고 클라이언트가 재요청한다.
  await queryClient.prefetchQuery({
    queryKey: repositoriesKey(),
    queryFn: () => getRepositoriesServer(),
  });

  return (
    <PageTransition>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyPageClient />
      </HydrationBoundary>
    </PageTransition>
  );
}
