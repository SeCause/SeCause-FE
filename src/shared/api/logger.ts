type ApiLogLayer = 'client' | 'bff';

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
