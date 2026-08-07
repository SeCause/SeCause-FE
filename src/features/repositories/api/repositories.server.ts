import type {
  RepositoryDashboard,
  RepositoryListParams,
  RepositoryListResult,
} from '@/features/repositories/model/types';
import { ENDPOINTS } from '@/shared/api/endpoints';
import { serverApiGet } from '@/shared/api/server';

// 서버 컴포넌트(prefetchQuery) 전용. `next/headers`(serverApiGet)를 사용하므로,
// 'use client' 훅(useRepositoriesApi.ts)이 있는 ./repositories.ts와는 별도 모듈로 둔다 —
// 같은 모듈로 합치면 클라이언트 번들에 next/headers가 딸려 들어가 빌드가 깨진다.

export function getRepositoriesServer(
  params?: RepositoryListParams,
): Promise<RepositoryListResult> {
  return serverApiGet<RepositoryListResult>(ENDPOINTS.repositories.list, {
    searchParams: params as Record<string, string>,
  });
}

export function getRepositoryDashboardServer(repositoryId: number): Promise<RepositoryDashboard> {
  return serverApiGet<RepositoryDashboard>(ENDPOINTS.repositories.dashboard(repositoryId));
}
