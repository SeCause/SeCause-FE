'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

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

export default function RepositoriesTab() {
  const router = useRouter();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useRepositories();
  const { mutate: deleteRepository, isPending: isDeleting } = useDeleteRepository();

  const repositories = data?.repositories ?? [];
  const filtered = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleDelete = (repositoryId: number) => {
    deleteRepository(repositoryId, {
      onError: () => showToast('레포지토리 삭제 중 오류가 발생했습니다.'),
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h1 className="text-heading-lg text-gray-900">My Repositories</h1>
        <Button className="w-full px-4! sm:w-auto" onClick={() => router.push(ROUTES.analysis)}>
          Analyze New Repository
        </Button>
      </div>

      <SearchBar
        onChange={handleSearch}
        placeholder="Search analyzed repositories ..."
        containerClassName="mb-4 w-full sm:max-w-xs"
        aria-label="레포지토리 검색"
      />

      <div className="flex min-h-100 flex-col gap-2.5">
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
              isDeleting={isDeleting}
            />
          ))
        ) : repositories.length === 0 ? (
          <p className="text-body-md m-auto text-gray-500">분석한 레포지토리가 없습니다.</p>
        ) : (
          <p className="text-body-md m-auto text-gray-500">검색 결과가 없습니다.</p>
        )}
      </div>

      <div className="mt-4">
        <Pagination current={page} total={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
