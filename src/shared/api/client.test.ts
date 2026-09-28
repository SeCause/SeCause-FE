import { afterEach, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  post: vi.fn(),
  retry: vi.fn(),
  extend: vi.fn(() => ({})),
}));
vi.mock('ky', () => ({
  default: { create: () => ({ post: mocks.post, extend: mocks.extend }), retry: mocks.retry },
  isHTTPError: (error: unknown) =>
    Boolean(error && typeof error === 'object' && 'response' in error),
}));
vi.mock('./logger', () => ({
  isApiLoggingEnabled: () => false,
  logApiRequest: vi.fn(),
  logApiResponse: vi.fn(),
  readResponseBodyForLog: vi.fn(),
}));

afterEach(() => vi.unstubAllGlobals());

it.each(['expired', 'renewed', 'server-error', 'retry-unauthorized', 'outside-mypage'])(
  'handles final authentication failure: %s',
  async (scenario) => {
    vi.resetModules();
    const replace = vi.fn();
    vi.stubGlobal('location', {
      pathname: scenario === 'outside-mypage' ? '/' : '/mypage',
      replace,
    });
    const error = { response: { status: scenario === 'server-error' ? 500 : 401 } };
    if (scenario === 'renewed') mocks.post.mockResolvedValue({});
    else mocks.post.mockRejectedValue(error);
    await import('./client');
    const options = mocks.extend.mock.calls[0] as unknown as [
      { hooks: { afterResponse: Array<(args: unknown) => Promise<unknown>> } },
    ];
    const handle = options[0].hooks.afterResponse[1];
    const request = new Request('https://example.com/api/users/me');
    const task = handle({
      request,
      response: new Response(null, { status: 401 }),
      retryCount: scenario === 'retry-unauthorized' ? 1 : 0,
    });
    if (scenario === 'server-error') await expect(task).rejects.toBe(error);
    else await task;
    if (scenario === 'expired' || scenario === 'retry-unauthorized')
      expect(replace).toHaveBeenCalledWith('/login');
    else expect(replace).not.toHaveBeenCalled();
    if (scenario === 'renewed') expect(mocks.retry).toHaveBeenCalledWith({ request });
  },
);
