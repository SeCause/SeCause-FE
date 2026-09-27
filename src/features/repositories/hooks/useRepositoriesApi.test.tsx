import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, expect, it, vi } from 'vitest';

import { getRepositoryIssues } from '../api/repositories';
import { useRepositoryIssues } from './useRepositoriesApi';

vi.mock('../api/repositories', () => ({ getRepositoryIssues: vi.fn() }));
const clients: QueryClient[] = [];
function wrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  clients.push(client);
  return function TestProvider({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}
afterEach(() => {
  clients.forEach((client) => client.clear());
});

it('keeps the previous page only within the same repository, file and severity', async () => {
  const data = { content: [], page: 1, size: 5, totalElements: 10, totalPages: 2, hasNext: true };
  vi.mocked(getRepositoryIssues)
    .mockResolvedValueOnce(data)
    .mockImplementation(() => new Promise(() => {}));
  const { result, rerender } = renderHook(
    ({
      id,
      filePath,
      severity,
      page,
    }: {
      id: number;
      filePath: string;
      severity: 'ALL' | 'HIGH';
      page: number;
    }) => useRepositoryIssues(id, { filePath, severity, page, size: 5 }),
    {
      wrapper: wrapper(),
      initialProps: { id: 1, filePath: 'a.ts', severity: 'ALL' as 'ALL' | 'HIGH', page: 1 },
    },
  );
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  rerender({ id: 1, filePath: 'a.ts', severity: 'ALL', page: 2 });
  expect(result.current.data).toEqual(data);
  expect(result.current.isPlaceholderData).toBe(true);
  rerender({ id: 1, filePath: 'b.ts', severity: 'ALL', page: 1 });
  expect(result.current.data).toBeUndefined();
  rerender({ id: 1, filePath: 'a.ts', severity: 'HIGH', page: 1 });
  expect(result.current.data).toBeUndefined();
  rerender({ id: 2, filePath: 'a.ts', severity: 'ALL', page: 1 });
  expect(result.current.data).toBeUndefined();
});
