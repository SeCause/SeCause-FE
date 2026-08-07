import { NextRequest } from 'next/server';

import { getApiBaseUrl } from '@/shared/api/env';

export function buildUpstreamUrl(request: NextRequest, path: string[]) {
  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) {
    return null;
  }

  const targetUrl = new URL(`/api/${path.join('/')}`, apiBaseUrl);
  targetUrl.search = request.nextUrl.search;

  return targetUrl;
}
