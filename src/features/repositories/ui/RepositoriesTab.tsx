'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { ROUTES } from '@/shared/config/routes';
import Button from '@/shared/ui/Button';
import SearchBar from '@/shared/ui/SearchBar';

import { MOCK_REPOSITORIES } from '../model/mocks';
import Pagination from './Pagination';
import RepositoryCard from './RepositoryCard';

const ITEMS_PER_PAGE = 5;

export default function RepositoriesTab() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [starredIds, setStarredIds] = useState<Set<number>>(
    () => new Set(MOCK_REPOSITORIES.map((r) => r.repositoryId)),
  );

  const filtered = MOCK_REPOSITORIES.filter((repo) =>
    repo.title.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleToggleStar = (id: number) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
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
        {paginated.length > 0 ? (
          paginated.map((repo) => (
            <RepositoryCard
              key={repo.repositoryId}
              repo={repo}
              starred={starredIds.has(repo.repositoryId)}
              onToggleStar={handleToggleStar}
            />
          ))
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
