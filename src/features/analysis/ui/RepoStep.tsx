'use client';

import Image from 'next/image';
import { useState } from 'react';

import { MOCK_ACCOUNTS, MOCK_REPOS } from '@/features/analysis/model/mocks';
import type { Repo } from '@/features/analysis/model/types';
import Dropdown from '@/shared/ui/Dropdown';
import SearchBar from '@/shared/ui/SearchBar';

import RepoIcon from './RepoIcon';

const ACCOUNT_OPTIONS = MOCK_ACCOUNTS.map((a) => ({ value: a, label: a }));

interface Props {
  value: Repo | null;
  onChange: (repo: Repo) => void;
}

export default function RepoStep({ value: selectedRepo, onChange }: Props) {
  const [search, setSearch] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(MOCK_ACCOUNTS[0]);

  const filtered = MOCK_REPOS.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p id="account-label" className="text-label-md text-gray-900">
          Select Github Account
        </p>
        <Dropdown
          options={ACCOUNT_OPTIONS}
          value={selectedAccount}
          onChange={setSelectedAccount}
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
          {filtered.length} results
        </p>

        <ul
          aria-labelledby="repo-search-label"
          className="scrollbar-custom-gray flex max-h-64 flex-col gap-2 overflow-y-auto px-3.5"
        >
          {filtered.map((repo) => (
            <li key={repo.id}>
              <button
                onClick={() => onChange(repo)}
                aria-pressed={selectedRepo?.id === repo.id}
                className={`text-body-md flex w-full items-center gap-3 rounded-lg border bg-white px-4 py-3 text-left font-medium transition-colors ${
                  selectedRepo?.id === repo.id
                    ? 'border-blue bg-blue/5 text-blue font-semibold'
                    : 'border-gray-300 text-gray-900 hover:bg-gray-100'
                }`}
              >
                <RepoIcon name={repo.name} />
                {repo.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
