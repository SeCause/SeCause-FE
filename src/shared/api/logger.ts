type ApiLogLayer = 'client' | 'bff' | 'rsc';

interface ApiLogBase {
  layer: ApiLogLayer;
  method: string;
  url: string;
}

interface ApiResponseLog extends ApiLogBase {
  status: number;
  durationMs: number;
  body?: unknown;
}

const MAX_TEXT_BODY_LENGTH = 5000;

export function isApiLoggingEnabled() {
  return process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_API_DEBUG === 'true';
}

export function logApiRequest({ layer, method, url }: ApiLogBase) {
  if (!isApiLoggingEnabled()) return;

  console.info(`[api:${layer}] -> ${method} ${url}`);
}

export function logApiResponse({ layer, method, url, status, durationMs, body }: ApiResponseLog) {
  if (!isApiLoggingEnabled()) return;

  const statusLabel = status >= 400 ? 'error' : 'ok';
  const message = `[api:${layer}] <- ${method} ${url} ${status} ${statusLabel} ${Math.round(
    durationMs,
  )}ms`;

  if (body === undefined) {
    console.info(message);
    return;
  }

  console.info(message, body);
}

/**
 * "요청 하나를 감싸서" 시작 로그 → fetch 실행 → 응답 로그를 한 번에 처리하는 헬퍼.
 * route.ts(BFF)와 server.ts(RSC prefetch)처럼 fetch를 직접 호출하는 서버 쪽 코드에서 쓴다.
 * client.ts는 ky의 beforeRequest/afterResponse 훅으로 시점이 나뉘어 있어 이 모양으로
 * 감쌀 수 없으므로 대상에서 제외한다.
 */
export async function withApiLogging(
  base: ApiLogBase,
  run: () => Promise<Response>,
): Promise<Response> {
  const startedAt = performance.now();
  logApiRequest(base);

  const response = await run();

  logApiResponse({
    ...base,
    status: response.status,
    durationMs: performance.now() - startedAt,
    body: await readResponseBodyForLog(response),
  });

  return response;
}

export async function readResponseBodyForLog(response: Response) {
  if (!isApiLoggingEnabled()) return undefined;

  const contentType = response.headers.get('content-type') ?? '';

  try {
    if (contentType.includes('application/json')) {
      return await response.clone().json();
    }

    const text = await response.clone().text();

    if (!text) return undefined;

    return text.length > MAX_TEXT_BODY_LENGTH
      ? `${text.slice(0, MAX_TEXT_BODY_LENGTH)}... [truncated]`
      : text;
  } catch {
    return '[unreadable response body]';
  }
}
