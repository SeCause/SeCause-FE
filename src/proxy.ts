import { type NextRequest, NextResponse } from 'next/server';

import { ROUTES } from '@/shared/config/routes';

const PROTECTED_ROUTES = [ROUTES.mypage, ROUTES.analysis];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const hasAuthCookie = request.cookies.has('access_token') || request.cookies.has('refresh_token');

  if (isProtected && !hasAuthCookie) {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mypage/:path*', '/analysis/:path*'],
};
