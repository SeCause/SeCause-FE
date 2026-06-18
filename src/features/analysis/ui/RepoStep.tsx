'use client';

import Image from 'next/image';
import { useState } from 'react';

import {
  useAnalysisRepositories,
  useGithubAccounts,
} from '@/features/analysis/hooks/useAnalysisApi';
import type { AnalysisRepository } from '@/features/analysis/model/types';
import Dropdown from '@/shared/ui/Dropdown';
import SearchBar from '@/shared/ui/SearchBar';

import RepoIcon from './RepoIcon';

interface Props {
  value: AnalysisRepository | null;
  onChange: (repo: AnalysisRepository) => void;
}

export default function RepoStep({ value: selectedRepo, onChange }: Props) {
  const [search, setSearch] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<string | null>(
    () => selectedRepo?.owner ?? null,
  );

  const { data: accounts = [] } = useGithubAccounts();
  const activeAccount = selectedAccount ?? accounts[0]?.name ?? null;
  const { data: repositories = [], isLoading: isReposLoading } =
    useAnalysisRepositories(activeAccount);

  const accountOptions = accounts.map((account) => ({
    value: account.name,
    label: account.type === 'ORGANIZATION' ? `${account.name} (Organization)` : account.name,
  }));

  const filtered = repositories.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  const handleAccountChange = (accountName: string) => {
    setSelectedAccount(accountName);
    setSearch('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p id="account-label" className="text-label-md text-gray-900">
          Select Github Account
        </p>
        <Dropdown
          options={accountOptions}
          value={activeAccount}
          onChange={handleAccountChange}
          aria-labelledby="account-label"
          leadingIcon={
            <Image
              src="/icons/icon_github.svg"
              width={20}
              height={20}
              alt=""
              aria-hidden="true"
              className="brightness-0"
            />
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        <p id="repo-search-label" className="text-label-md text-gray-900">
          Import Git Repository
        </p>
        <SearchBar
          onChange={setSearch}
          placeholder="Search for repositories"
          aria-label="저장소 검색"
          containerClassName="mx-3.5"
        />
        <p
          aria-live="polite"
          aria-atomic="true"
          className="text-caption self-end pr-3.5 text-gray-700"
        >
          {!isReposLoading && `${filtered.length} results`}
        </p>

        <ul
          aria-labelledby="repo-search-label"
          className="scrollbar-custom-gray flex max-h-64 flex-col gap-2 overflow-y-auto px-3.5"
        >
          {isReposLoading ? (
            <li className="flex justify-center py-6">
              <span
                aria-label="레포지토리 불러오는 중"
                className="block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"
              />
            </li>
          ) : (
            filtered.map((repo) => (
              <li key={`${repo.owner}/${repo.name}`}>
                <button
                  onClick={() => onChange(repo)}
                  aria-pressed={
                    selectedRepo?.owner === repo.owner && selectedRepo?.name === repo.name
                  }
                  className={`text-body-md flex w-full items-center gap-3 rounded-lg border bg-white px-4 py-3 text-left font-medium transition-colors ${
                    selectedRepo?.owner === repo.owner && selectedRepo?.name === repo.name
                      ? 'border-blue bg-blue/5 text-blue font-semibold'
                      : 'border-gray-300 text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <RepoIcon name={repo.name} />
                  {repo.name}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
