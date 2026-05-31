import { NextRequest } from 'next/server';

function getApiBaseUrl() {
  return process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;
}

export function buildUpstreamUrl(request: NextRequest, path: string[]) {
  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) {
    return null;
  }

  const targetUrl = new URL(`/api/${path.join('/')}`, apiBaseUrl);
  targetUrl.search = request.nextUrl.search;

  return targetUrl;
}
