'use client';

import Image from 'next/image';

import Dropdown from '@/shared/ui/Dropdown';

import { MOCK_BRANCHES } from '../model/mocks';
import type { Repo } from '../model/types';

const BRANCH_OPTIONS = MOCK_BRANCHES.map((b) => ({ value: b, label: b }));

function RepoIcon({ name }: { name: string }) {
  return (
    <span className="bg-blue/10 text-blue text-label-sm flex h-7 w-7 shrink-0 items-center justify-center rounded uppercase">
      {name[0]}
    </span>
  );
}

interface Props {
  repo: Repo;
  value: string | null;
  onChange: (branch: string) => void;
}

export default function BranchStep({ repo, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-label-md text-gray-900">연결된 리포지토리</p>
        <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3">
          <RepoIcon name={repo.name} />
          <span className="text-body-md font-medium text-gray-900">{repo.name}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-label-md text-gray-900">Select branch</p>
        <Dropdown
          options={BRANCH_OPTIONS}
          value={value}
          onChange={onChange}
          placeholder="브랜치를 선택해주세요"
          leadingIcon={
            <Image
              src="/icons/icon_github.svg"
              width={20}
              height={20}
              alt="github 아이콘"
              className="brightness-0"
            />
          }
          fullWidth
        />
      </div>
    </div>
  );
}
