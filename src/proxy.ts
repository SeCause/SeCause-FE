import { type NextRequest, NextResponse } from 'next/server';

import { adaptSetCookie } from '@/shared/api/cookies';
import { ENDPOINTS } from '@/shared/api/endpoints';
import { getApiBaseUrl } from '@/shared/api/env';
import { isProtectedRoute, ROUTES } from '@/shared/config/routes';

const AUTH_COOKIES = ['access_token', 'refresh_token'] as const;
const SESSION_HINT_COOKIE = 'has_session';
const SESSION_CHECK_TIMEOUT_MS = 2000;

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuthCookie = AUTH_COOKIES.some((name) => request.cookies.has(name));

  if (pathname === ROUTES.login) {
    return hasAuthCookie ? redirectIfSessionValid(request) : NextResponse.next();
  }

  if (isProtectedRoute(pathname) && !hasAuthCookie) {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }

  return NextResponse.next();
}

// 쿠키 존재만으로 보내면 만료 토큰에서 /login ↔ /mypage 루프가 생기므로 세션을 실제로 확인한다.
async function redirectIfSessionValid(request: NextRequest) {
  const me = await callUpstream(request, 'GET', ENDPOINTS.users.me);
  if (me?.ok) return redirectToMypage(request);
  if (me?.status !== 401) return NextResponse.next();

  const reissue = await callUpstream(request, 'POST', ENDPOINTS.auth.reissue);
  if (reissue?.ok) {
    const response = redirectToMypage(request);
    reissue.headers
      .getSetCookie()
      .forEach((cookie) => response.headers.append('set-cookie', adaptSetCookie(cookie, request)));
    return response;
  }

  const response = NextResponse.next();
  if (reissue?.status === 401) {
    [...AUTH_COOKIES, SESSION_HINT_COOKIE].forEach((name) => response.cookies.delete(name));
  }
  return response;
}

function redirectToMypage(request: NextRequest) {
  return NextResponse.redirect(new URL(ROUTES.mypage, request.url));
}

// 네트워크 오류·타임아웃은 null로 돌려 로그인 화면을 그대로 보여준다.
async function callUpstream(request: NextRequest, method: 'GET' | 'POST', path: string) {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) return null;

  try {
    return await fetch(new URL(`/api/${path}`, apiBaseUrl), {
      method,
      headers: {
        cookie: request.headers.get('cookie') ?? '',
        'content-type': 'application/json',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(SESSION_CHECK_TIMEOUT_MS),
    });
  } catch {
    return null;
  }
}

export const config = {
  matcher: ['/login', '/mypage/:path*', '/analysis/:path*'],
};
