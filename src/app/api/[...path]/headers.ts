import { NextRequest } from 'next/server';

type HeadersWithSetCookie = Headers & { getSetCookie(): string[] };

const HOP_BY_HOP_HEADERS = [
  'connection',
  'content-encoding',
  'content-length',
  'host',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
];

const UPSTREAM_REQUEST_HEADERS = [
  'accept',
  'accept-language',
  'content-type',
  'cookie',
  'if-match',
  'if-none-match',
  'origin',
  'range',
  'referer',
  'user-agent',
  'x-csrf-token',
  'x-request-id',
];

export function buildUpstreamHeaders(request: NextRequest) {
  const headers = new Headers();

  UPSTREAM_REQUEST_HEADERS.forEach((name) => {
    const value = request.headers.get(name);
    if (value !== null) headers.set(name, value);
  });

  return headers;
}

export function buildClientHeaders(upstreamResponse: Response, request: NextRequest) {
  const responseHeaders = new Headers(upstreamResponse.headers);
  const setCookieHeaders = (upstreamResponse.headers as HeadersWithSetCookie).getSetCookie();

  HOP_BY_HOP_HEADERS.forEach((header) => responseHeaders.delete(header));
  responseHeaders.delete('set-cookie');

  setCookieHeaders.forEach((cookie) => {
    responseHeaders.append('set-cookie', adaptSetCookie(cookie, request));
  });

  return responseHeaders;
}

function adaptSetCookie(cookie: string, request: NextRequest) {
  let nextCookie = cookie.replace(/;\s*Domain=[^;]*/i, '');

  if (request.nextUrl.hostname === 'localhost') {
    nextCookie = nextCookie
      .replace(/;\s*Secure/i, '')
      .replace(/;\s*SameSite=None/i, '; SameSite=Lax');
  }

  return nextCookie;
}
