import { QueryClient } from '@tanstack/react-query';

// RSC에서 prefetch한 데이터가 hydration 직후 stale 처리되어 동일 API를 다시 호출하지 않도록 한다.
// mutation 성공 시 invalidateQueries를 호출하는 흐름은 staleTime과 관계없이 즉시 갱신된다.
const STALE_TIME_MS = 30_000;

const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MS,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
} as const;

// 브라우저 전역에서 공유하는 싱글턴 (Providers에서 사용)
export const queryClient = new QueryClient(queryClientConfig);

// 서버 컴포넌트의 prefetchQuery용 — 요청마다 새로 만들어야 사용자 간 캐시가 섞이지 않는다.
export function createServerQueryClient() {
  return new QueryClient(queryClientConfig);
}
