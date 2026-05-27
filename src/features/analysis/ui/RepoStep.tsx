'use client';

import Image from 'next/image';
import { useState } from 'react';

import { MOCK_ACCOUNTS, MOCK_REPOS } from '@/features/analysis/model/mocks';
import type { Repo } from '@/features/analysis/model/types';
import Dropdown from '@/shared/ui/Dropdown';
import SearchBar from '@/shared/ui/SearchBar';

const ACCOUNT_OPTIONS = MOCK_ACCOUNTS.map((a) => ({ value: a, label: a }));

function RepoIcon({ name }: { name: string }) {
  // 추후 변경
  return (
    <span className="bg-blue/10 text-blue text-label-sm flex h-7 w-7 shrink-0 items-center justify-center rounded uppercase">
      {name[0]}
    </span>
  );
}

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
        <p className="text-label-md text-gray-900">Select Github Account</p>
        <Dropdown
          options={ACCOUNT_OPTIONS}
          value={selectedAccount}
          onChange={setSelectedAccount}
          leadingIcon={
            <Image
              src="/icons/icon_github.svg"
              width={20}
              height={20}
              alt="github 아이콘"
              className="brightness-0"
            />
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-label-md text-gray-900">Import Git Repository</p>
        <SearchBar
          onChange={setSearch}
          placeholder="Search for repositories"
          containerClassName="mx-3.5"
        />
        <p className="text-caption self-end pr-3.5 text-gray-700">{filtered.length} results</p>

        <ul className="scrollbar-custom-gray flex max-h-64 flex-col gap-2 overflow-y-auto px-3.5">
          {filtered.map((repo) => (
            <li key={repo.id}>
              <button
                onClick={() => onChange(repo)}
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
