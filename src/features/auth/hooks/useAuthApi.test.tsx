import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { expect, it, vi } from 'vitest';

import { postLogout } from '../api/auth';
import { useLogout } from './useAuthApi';

vi.mock('../api/auth', () => ({ postLogout: vi.fn() }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn() }) }));
vi.mock('../lib/sessionHint', () => ({ clearSessionHint: vi.fn() }));

it('clears private caches and prevents an in-flight query from restoring them after logout', async () => {
  vi.mocked(postLogout).mockResolvedValue(undefined);
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
  const { result, unmount } = renderHook(() => useLogout(), {
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
});
