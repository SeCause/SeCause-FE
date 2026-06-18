'use client';

import Image from 'next/image';

import { useGithubBranches } from '@/features/analysis/hooks/useAnalysisApi';
import Dropdown from '@/shared/ui/Dropdown';

import type { AnalysisRepository } from '../model/types';
import RepoIcon from './RepoIcon';

interface Props {
  repo: AnalysisRepository;
  value: string | null;
  onChange: (branch: string) => void;
}

export default function BranchStep({ repo, value, onChange }: Props) {
  const { data: branches = [], isLoading } = useGithubBranches(repo.owner, repo.name);
  const branchOptions = branches.map((b) => ({ value: b.name, label: b.name }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-label-md text-gray-900">연결된 리포지토리</p>
        <div
          aria-label={`선택된 리포지토리: ${repo.name}`}
          className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3"
        >
          <RepoIcon name={repo.name} />
          <span className="text-body-md font-medium text-gray-900">{repo.name}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p id="branch-label" className="text-label-md text-gray-900">
          Select branch
        </p>
        <Dropdown
          options={branchOptions}
          value={value}
          onChange={onChange}
          placeholder={isLoading ? '불러오는 중...' : '브랜치를 선택해주세요'}
          aria-labelledby="branch-label"
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
          fullWidth
        />
      </div>
    </div>
  );
}
