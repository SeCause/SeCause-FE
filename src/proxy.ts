import { type NextRequest, NextResponse } from 'next/server';

import { isProtectedRoute, ROUTES } from '@/shared/config/routes';

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = isProtectedRoute(pathname);
  const hasAuthCookie = request.cookies.has('access_token') || request.cookies.has('refresh_token');

  if (isProtected && !hasAuthCookie) {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/mypage/:path*', '/analysis/:path*'],
};
