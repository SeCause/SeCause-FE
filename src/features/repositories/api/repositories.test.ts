import { expect, it, vi } from 'vitest';

import { apiClient } from '@/shared/api/client';

import { getRepositoryIssues } from './repositories';

vi.mock('@/shared/api/client', () => ({ apiClient: { get: vi.fn() } }));

it('requests only the selected page and file ID', async () => {
  const result = {
    content: [],
    page: 2,
    size: 5,
    totalElements: 100,
    totalPages: 20,
    hasNext: true,
  };
  vi.mocked(apiClient.get).mockResolvedValueOnce({ result } as never);
  const params = {
    repositoryFileId: 33,
    severity: 'HIGH' as const,
    page: 2,
    size: 5,
  };
  await expect(getRepositoryIssues(7, params)).resolves.toEqual(result);
  expect(apiClient.get).toHaveBeenCalledTimes(1);
  expect(apiClient.get).toHaveBeenCalledWith('repositories/7/analysis/issues', {
    searchParams: params,
  });
});
