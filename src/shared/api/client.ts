import ky, { type AfterResponseHook } from 'ky';

import { ENDPOINTS } from './endpoints';

const baseClient = ky.create({
  prefix: '/api',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
});

const handleUnauthorized: AfterResponseHook = async ({ request, response, retryCount }) => {
  if (response.status !== 401 || retryCount > 0) return;

  const reissued = await baseClient
    .post(ENDPOINTS.auth.reissue)
    .then(() => true)
    .catch(() => false);
  if (reissued) return ky.retry({ request });
};

export const apiClient = baseClient.extend({
  hooks: {
    afterResponse: [handleUnauthorized],
  },
});
