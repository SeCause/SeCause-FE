import ky, { type AfterResponseHook, type BeforeRequestHook } from 'ky';

import { ENDPOINTS } from './endpoints';
import { logApiRequest, logApiResponse, readResponseBodyForLog } from './logger';
import type { ApiResponse } from './types';

const requestStartTimes = new WeakMap<Request, number>();

const baseClient = ky.create({
  prefix: '/api',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
});

const logRequest: BeforeRequestHook = ({ request }) => {
  requestStartTimes.set(request, performance.now());
  logApiRequest({ layer: 'client', method: request.method, url: request.url });
};

const logResponse: AfterResponseHook = async ({ request, response }) => {
  const startedAt = requestStartTimes.get(request) ?? performance.now();

  logApiResponse({
    layer: 'client',
    method: request.method,
    url: request.url,
    status: response.status,
    durationMs: performance.now() - startedAt,
    body: await readResponseBodyForLog(response),
  });
};

const handleUnauthorized: AfterResponseHook = async ({ request, response, retryCount }) => {
  if (response.status !== 401 || retryCount > 0) return;

  const reissued = await baseClient
    .post(ENDPOINTS.auth.reissue)
    .then(() => true)
    .catch(() => false);
  if (reissued) return ky.retry({ request });
};

const kyClient = baseClient.extend({
  hooks: {
    beforeRequest: [logRequest],
    afterResponse: [logResponse, handleUnauthorized],
  },
});

export const apiClient = {
  get: <T>(url: string, options?: Parameters<typeof kyClient.get>[1]) =>
    kyClient.get(url, options).json<ApiResponse<T>>(),

  post: <T>(url: string, options?: Parameters<typeof kyClient.post>[1]) =>
    kyClient.post(url, options).json<ApiResponse<T>>(),

  put: <T>(url: string, options?: Parameters<typeof kyClient.put>[1]) =>
    kyClient.put(url, options).json<ApiResponse<T>>(),

  patch: <T>(url: string, options?: Parameters<typeof kyClient.patch>[1]) =>
    kyClient.patch(url, options).json<ApiResponse<T>>(),

  delete: <T>(url: string, options?: Parameters<typeof kyClient.delete>[1]) =>
    kyClient.delete(url, options).json<ApiResponse<T>>(),
};
