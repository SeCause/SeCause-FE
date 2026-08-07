import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Repository } from '@/features/repositories/model/types';

import { useDeleteRepository, useRepositories } from '../hooks/useRepositoriesApi';
import RepositoriesTab from './RepositoriesTab';

vi.mock('next/navigation', () => ({ useRouter: vi.fn() }));
vi.mock('../hooks/useRepositoriesApi', () => ({
  useRepositories: vi.fn(),
  useDeleteRepository: vi.fn(),
}));
vi.mock('@/shared/ui/Toast', () => ({ useToast: () => ({ showToast: vi.fn() }) }));

const createRepository = (repositoryId: number, name: string): Repository => ({
  repositoryId,
  owner: 'SeCause',
  name,
  fullName: `SeCause/${name}`,
  branch: 'main',
  fileCount: 10,
  lineCount: 100,
  languages: ['TypeScript'],
  issueCounts: { critical: 1, high: 2, medium: 3, low: 0 },
  analysisStatus: 'COMPLETED',
  progressPercent: 100,
  analysisRequestedAt: '2026-08-01T00:00:00Z',
  completedAt: '2026-08-01T00:01:00Z',
});

const repositories = [
  createRepository(1, 'frontend'),
  createRepository(2, 'backend'),
  createRepository(3, 'security-worker'),
];

describe('RepositoriesTab', () => {
  const push = vi.fn();
  const mutate = vi.fn();

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({ push } as never);
    vi.mocked(useRepositories).mockReturnValue({
      data: { repositories },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useRepositories>);
    vi.mocked(useDeleteRepository).mockReturnValue({
      mutate,
      isPending: false,
    } as unknown as ReturnType<typeof useDeleteRepository>);
  });

  it('Given 분석 저장소 목록에서 When 이름을 검색하면 Then 일치하는 카드만 표시한다', async () => {
    // Given
    const user = userEvent.setup();
    render(<RepositoriesTab />);

    // When
    const searchInput = screen.getByRole('textbox', { name: '레포지토리 검색' });
    await user.type(searchInput, 'security{Enter}');

    // Then
    expect(screen.getByText('SeCause / security-worker')).toBeInTheDocument();
    expect(screen.queryByText('SeCause / frontend')).not.toBeInTheDocument();
    expect(screen.queryByText('SeCause / backend')).not.toBeInTheDocument();
  });

  it('Given 저장소 카드에서 When 삭제를 확인하면 Then 해당 저장소 ID로 삭제를 요청한다', async () => {
    // Given
    const user = userEvent.setup();
    render(<RepositoriesTab />);
    const frontendCard = screen.getByText('SeCause / frontend').closest('article');
    expect(frontendCard).not.toBeNull();

    // When
    await user.click(
      within(frontendCard as HTMLElement).getByRole('button', { name: '레포지토리 삭제' }),
    );
    const dialog = screen.getByRole('alertdialog', {
      name: "'frontend' 분석 기록을 삭제하시겠어요?",
    });
    await user.click(within(dialog).getByRole('button', { name: '삭제' }));

    // Then
    expect(mutate).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ onError: expect.any(Function) }),
    );
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('Given 저장소 카드가 있을 때 Then 키보드로 접근 가능한 상세 링크를 제공한다', () => {
    // Given
    render(<RepositoriesTab />);

    // Then
    expect(screen.getByRole('link', { name: 'SeCause / frontend 분석 결과 보기' })).toHaveAttribute(
      'href',
      '/mypage/repositories/1',
    );
  });
});
