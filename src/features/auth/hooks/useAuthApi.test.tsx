import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { expect, it, vi } from 'vitest';

import { deleteUser, postLogout } from '../api/auth';
import { useLogout, useWithdraw } from './useAuthApi';

vi.mock('../api/auth', () => ({ postLogout: vi.fn(), deleteUser: vi.fn() }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn(), refresh: vi.fn() }),
}));
vi.mock('../lib/sessionHint', () => ({ clearSessionHint: vi.fn() }));

it.each([
  { name: 'logout', useHook: useLogout, request: postLogout },
  { name: 'withdrawal', useHook: useWithdraw, request: deleteUser },
])(
  'clears private caches and cancels in-flight queries after $name',
  async ({ useHook, request }) => {
    vi.mocked(request).mockResolvedValue(undefined);
    const client = new QueryClient();
    client.setQueryData(['user'], { id: 1 });
    client.setQueryData(['analysisAccounts'], ['previous-account']);
    client.setQueryData(['repositories', 1], { private: true });
    let resolve!: (value: string[]) => void;
    const pending = client
      .fetchQuery({
        queryKey: ['repositories'],
        queryFn: () =>
          new Promise<string[]>((done) => {
            resolve = done;
          }),
      })
      .catch(() => undefined);
    const { result, unmount } = renderHook(() => useHook(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      ),
    });
    await act(async () => {
      await result.current.mutateAsync();
    });
    resolve(['old-private-data']);
    await pending;
    expect(client.getQueryCache().getAll()).toHaveLength(0);
    unmount();
    client.clear();
  },
);

it('preserves private caches when withdrawal fails', async () => {
  vi.mocked(deleteUser).mockRejectedValue(new Error('Server error'));
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  client.setQueryData(['user'], { id: 1 });
  client.setQueryData(['repositories'], ['private-repository']);
  const { result, unmount } = renderHook(() => useWithdraw(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    ),
  });

  await act(async () => {
    await expect(result.current.mutateAsync()).rejects.toThrow('Server error');
  });

  expect(client.getQueryData(['user'])).toEqual({ id: 1 });
  expect(client.getQueryData(['repositories'])).toEqual(['private-repository']);
  unmount();
  client.clear();
});
