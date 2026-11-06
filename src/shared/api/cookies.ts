import type { NextRequest } from 'next/server';

// 업스트림 Set-Cookie를 프론트 도메인 쿠키로 바꾼다. localhost에서는 Secure/SameSite=None을 푼다.
export function adaptSetCookie(cookie: string, request: NextRequest) {
  let nextCookie = cookie.replace(/;\s*Domain=[^;]*/i, '');

  if (request.nextUrl.hostname === 'localhost') {
    nextCookie = nextCookie
      .replace(/;\s*Secure/i, '')
      .replace(/;\s*SameSite=None/i, '; SameSite=Lax');
  }

  return nextCookie;
}
