import { cookies } from 'next/headers';

import { getApiBaseUrl } from './env';
import { withApiLogging } from './logger';
import type { ApiResponse } from './types';

// prefetch가 응답을 기다리다 페이지 렌더 자체를 오래 붙잡지 않도록 하는 상한선.
// 이 시간을 넘기면 실패로 간주하고 클라이언트 쪽 fetch로 넘긴다.
const PREFETCH_TIMEOUT_MS = 5000;

interface ServerGetOptions {
  searchParams?: Record<string, string | undefined>;
}

/**
 * 서버 컴포넌트(prefetch) 전용 GET 클라이언트.
 *
 * 브라우저용 apiClient(./client.ts)는 상대 경로 + credentials: 'include'에 의존해
 * 브라우저 환경에서만 동작하므로, 서버에서는 요청자의 쿠키를 직접 읽어 업스트림 API를
 * 호출한다. 실패(네트워크 오류, 4xx/5xx, 인증 만료 등) 시에는 조용히 넘기지 않고 그대로
 * throw한다 — react-query의 prefetchQuery는 실패한 쿼리를 dehydrate 대상에서 제외하므로,
 * 클라이언트의 useQuery가 마치 prefetch가 없었던 것처럼 정상적으로 재요청/재인증을 수행한다.
 */
export async function serverApiGet<T>(path: string, options?: ServerGetOptions): Promise<T> {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) {
    throw new Error('API base URL is not configured.');
  }

  const targetUrl = new URL(`/api/${path}`, apiBaseUrl);
  Object.entries(options?.searchParams ?? {}).forEach(([key, value]) => {
    if (value !== undefined) targetUrl.searchParams.set(key, value);
  });

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');

  const response = await withApiLogging(
    { layer: 'rsc', method: 'GET', url: targetUrl.toString() },
    () =>
      fetch(targetUrl, {
        headers: cookieHeader ? { cookie: cookieHeader } : undefined,
        cache: 'no-store',
        signal: AbortSignal.timeout(PREFETCH_TIMEOUT_MS),
      }),
  );

  if (!response.ok) {
    throw new Error(`Server prefetch failed: ${response.status} ${targetUrl.pathname}`);
  }

  const body = (await response.json()) as ApiResponse<T>;
  return body.result;
}
