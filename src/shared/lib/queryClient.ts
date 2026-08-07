import { QueryClient } from '@tanstack/react-query';

const queryClientConfig = {
  defaultOptions: {
    queries: {
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
