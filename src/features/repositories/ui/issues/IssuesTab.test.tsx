import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { useRepositoryIssues } from '@/features/repositories/hooks/useRepositoriesApi';

import IssuesTab from './IssuesTab';

vi.mock('next/navigation', async () => {
  const { useSyncExternalStore } = await import('react');
  return {
    useSearchParams: () => {
      const query = useSyncExternalStore(
        (notify) => {
          window.addEventListener('popstate', notify);
          return () => window.removeEventListener('popstate', notify);
        },
        () => window.location.search,
      );
      return new URLSearchParams(query);
    },
  };
});

beforeEach(() => {
  window.history.replaceState(null, '', '/mypage/repositories/1');
  const push = window.history.pushState.bind(window.history);
  vi.spyOn(window.history, 'pushState').mockImplementation((...args) => {
    push(...args);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
});

vi.mock('@/features/repositories/hooks/useRepositoriesApi', () => ({
  useRepositoryIssueFiles: () => ({
    data: [{ repositoryFileId: 33, filePath: 'a.ts', issueCount: 15 }],
  }),
  // 새 페이지 응답을 기다리는 동안 이전 응답이 유지된다.
  useRepositoryIssues: vi.fn(() => ({
    data: { content: [], page: 1, totalElements: 15, totalPages: 3 },
  })),
}));
afterEach(() => vi.restoreAllMocks());

vi.mock('./IssueCard', () => ({ default: () => null }));

it('advances the requested page while the previous response is displayed', () => {
  render(<IssuesTab repositoryId={1} />);
  fireEvent.click(screen.getByRole('button', { name: '다음 페이지' }));
  expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page');
  fireEvent.click(screen.getByRole('button', { name: '다음 페이지' }));
  expect(useRepositoryIssues).toHaveBeenLastCalledWith(
    1,
    { severity: 'ALL', repositoryFileId: 33, page: 3, size: 5 },
    { enabled: true },
  );
  expect(screen.getByRole('button', { name: '다음 페이지' })).toBeDisabled();
});

it('restores URL filters on mount and browser navigation', () => {
  window.history.replaceState(null, '', '?tab=issues&severity=HIGH&file=a.ts&page=2&keep=yes');
  const view = render(<IssuesTab repositoryId={1} />);
  expect(useRepositoryIssues).toHaveBeenLastCalledWith(
    1,
    { severity: 'HIGH', repositoryFileId: 33, page: 2, size: 5 },
    { enabled: true },
  );
  fireEvent.click(screen.getByRole('button', { name: '다음 페이지' }));
  expect(new URLSearchParams(window.location.search).get('page')).toBe('3');
  expect(new URLSearchParams(window.location.search).get('keep')).toBe('yes');
  act(() => {
    window.history.replaceState(null, '', '?tab=issues&severity=LOW&file=a.ts&page=1');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  expect(useRepositoryIssues).toHaveBeenLastCalledWith(
    1,
    { severity: 'LOW', repositoryFileId: 33, page: 1, size: 5 },
    { enabled: true },
  );
  view.unmount();
  render(<IssuesTab repositoryId={1} />);
  expect(useRepositoryIssues).toHaveBeenLastCalledWith(
    1,
    { severity: 'LOW', repositoryFileId: 33, page: 1, size: 5 },
    { enabled: true },
  );
});

it('uses safe defaults for invalid URL values', () => {
  window.history.replaceState(null, '', '?severity=unknown&page=-2');
  render(<IssuesTab repositoryId={1} />);
  expect(useRepositoryIssues).toHaveBeenLastCalledWith(
    1,
    { severity: 'ALL', repositoryFileId: 33, page: 1, size: 5 },
    { enabled: true },
  );
});
