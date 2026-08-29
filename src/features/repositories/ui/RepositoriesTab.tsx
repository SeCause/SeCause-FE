'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

import {
  useDeleteRepository,
  useRepositories,
} from '@/features/repositories/hooks/useRepositoriesApi';
import { ROUTES } from '@/shared/config/routes';
import Button from '@/shared/ui/Button';
import SearchBar from '@/shared/ui/SearchBar';
import { useToast } from '@/shared/ui/Toast';

import Pagination from './Pagination';
import RepositoryCard from './RepositoryCard';

const ITEMS_PER_PAGE = 5;

interface Props {
  accountName?: string | null;
}

export default function RepositoriesTab({ accountName }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useRepositories(accountName ? { accountName } : undefined);
  const { mutate: deleteRepository } = useDeleteRepository();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const repositories = data?.repositories ?? [];
  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();
    return (data?.repositories ?? []).filter((repo) => repo.name.toLowerCase().includes(keyword));
  }, [data, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(page, 1), totalPages || 1);
  const paginated = useMemo(
    () => filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filtered, currentPage],
  );

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleDelete = (repositoryId: number) => {
    setDeletingId(repositoryId);
    deleteRepository(repositoryId, {
      onError: () => showToast('레포지토리 삭제 중 오류가 발생했습니다.'),
      onSettled: () => setDeletingId(null),
    });
  };

  const handleAnalyzeRepository = () => {
    const query = accountName ? `?account=${encodeURIComponent(accountName)}` : '';
    router.push(`${ROUTES.analysis}${query}`);
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-5 flex flex-col gap-4 border-b border-gray-900/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-blue text-label-mono mb-2 font-mono">YOUR WORKSPACE</p>
          <h1 className="text-heading-lg text-gray-900">Repositories</h1>
          <p className="mt-2 text-sm text-gray-500">분석한 프로젝트의 보안 상태를 확인하세요.</p>
        </div>
        <Button className="w-full px-4! sm:w-auto" onClick={handleAnalyzeRepository}>
          Analyze New Repository
        </Button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <SearchBar
          onChange={handleSearch}
          placeholder="Search repositories"
          containerClassName="w-full sm:max-w-sm"
          aria-label="레포지토리 검색"
        />
        <span className="text-num-mono hidden font-mono text-gray-400 sm:block">
          {filtered.length} PROJECTS
        </span>
      </div>

      <div className="flex min-h-100 flex-col gap-3">
        {isLoading ? (
          <p className="text-body-md m-auto text-gray-500">불러오는 중...</p>
        ) : isError ? (
          <p className="text-body-md m-auto text-gray-500">레포지토리를 불러오지 못했습니다.</p>
        ) : paginated.length > 0 ? (
          paginated.map((repo) => (
            <RepositoryCard
              key={repo.repositoryId}
              repo={repo}
              onDelete={handleDelete}
              isDeleting={deletingId === repo.repositoryId}
            />
          ))
        ) : repositories.length === 0 ? (
          <p className="text-body-md m-auto text-gray-500">분석한 레포지토리가 없습니다.</p>
        ) : (
          <p className="text-body-md m-auto text-gray-500">검색 결과가 없습니다.</p>
        )}
      </div>

      <div className="mt-4">
        <Pagination current={currentPage} total={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
