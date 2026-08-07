import { QueryClient } from '@tanstack/react-query';

// RSC에서 prefetch한 데이터가 hydration 직후 stale 처리되어 동일 API를 다시 호출하지 않도록 한다.
// mutation 성공 시 invalidateQueries를 호출하는 흐름은 staleTime과 관계없이 즉시 갱신된다.
const STALE_TIME_MS = 30_000;

const browserQueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MS,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
} as const;

// 브라우저 전역에서 공유하는 싱글턴 (Providers에서 사용)
export const queryClient = new QueryClient(browserQueryClientConfig);

// 서버에서는 실패한 prefetch를 재시도하지 않고 클라이언트 쿼리에 복구를 맡긴다.
// 요청마다 새 인스턴스를 생성해 사용자별 캐시가 섞이지 않도록 한다.
export function createServerQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_MS,
        retry: false,
      },
    },
  });
}
