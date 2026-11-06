// @vitest-environment node
import { NextRequest } from 'next/server';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import proxy from './proxy';

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubEnv('API_BASE_URL', 'https://api.example.com');
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  fetchMock.mockReset();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function loginRequest(cookie?: string) {
  return new NextRequest('https://app.example.com/login', {
    headers: cookie ? { cookie } : undefined,
  });
}

function upstream(status: number, setCookie?: string) {
  const headers = new Headers();
  if (setCookie) headers.append('set-cookie', setCookie);
  return new Response(null, { status, headers });
}

it('shows login without calling upstream when there is no auth cookie', async () => {
  const response = await proxy(loginRequest());

  expect(fetchMock).not.toHaveBeenCalled();
  expect(response.headers.get('location')).toBeNull();
});

it('redirects to mypage when the session is valid', async () => {
  fetchMock.mockResolvedValueOnce(upstream(200));

  const response = await proxy(loginRequest('access_token=a; refresh_token=r'));

  expect(response.headers.get('location')).toBe('https://app.example.com/mypage');
  expect(fetchMock).toHaveBeenCalledOnce();
});

it('reissues an expired access token and forwards the new cookies', async () => {
  fetchMock
    .mockResolvedValueOnce(upstream(401))
    .mockResolvedValueOnce(
      upstream(200, 'access_token=new; Path=/; Domain=api.example.com; HttpOnly'),
    );

  const response = await proxy(loginRequest('refresh_token=r'));

  expect(response.headers.get('location')).toBe('https://app.example.com/mypage');
  expect(response.headers.get('set-cookie')).toBe('access_token=new; Path=/; HttpOnly');
});

it('clears stale auth cookies and stays on login when reissue fails', async () => {
  fetchMock.mockResolvedValueOnce(upstream(401)).mockResolvedValueOnce(upstream(401));

  const response = await proxy(loginRequest('access_token=a; refresh_token=r'));

  expect(response.headers.get('location')).toBeNull();
  const cleared = response.headers.getSetCookie().map((cookie) => cookie.split('=')[0]);
  expect(cleared).toEqual(['access_token', 'refresh_token', 'has_session']);
});

it('keeps cookies and shows login when upstream is unreachable', async () => {
  fetchMock.mockRejectedValueOnce(new Error('timeout'));

  const response = await proxy(loginRequest('access_token=a'));

  expect(response.headers.get('location')).toBeNull();
  expect(response.headers.getSetCookie()).toEqual([]);
});

it('redirects protected routes to login without an auth cookie', async () => {
  const response = await proxy(new NextRequest('https://app.example.com/mypage'));

  expect(response.headers.get('location')).toBe('https://app.example.com/login');
});
