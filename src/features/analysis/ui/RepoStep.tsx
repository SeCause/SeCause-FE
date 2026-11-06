'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ExternalLink, RotateCw } from 'lucide-react';
import { useEffect, useEffectEvent, useRef, useState } from 'react';

import {
  useAnalysisRepositories,
  useGithubAccounts,
} from '@/features/analysis/hooks/useAnalysisApi';
import { githubAccountsKey } from '@/features/analysis/model/queryKeys';
import type { AnalysisRepository } from '@/features/analysis/model/types';
import { createGithubAccountOptions } from '@/features/analysis/ui/githubAccountOptions';
import { GITHUB_OAUTH_APP_SETTINGS_URL } from '@/shared/config/github';
import Dropdown from '@/shared/ui/Dropdown';
import SearchBar from '@/shared/ui/SearchBar';

import RepoIcon from './RepoIcon';

interface Props {
  value: AnalysisRepository | null;
  onChange: (repo: AnalysisRepository) => void;
  initialAccountName?: string | null;
}

export default function RepoStep({ value: selectedRepo, onChange, initialAccountName }: Props) {
  const [search, setSearch] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<string | null>(
    () => selectedRepo?.owner ?? null,
  );
  const preferredAccount = selectedAccount ?? initialAccountName ?? null;

  const queryClient = useQueryClient();
  const {
    data: accounts = [],
    isSuccess: isAccountsLoaded,
    isFetching: isAccountsFetching,
  } = useGithubAccounts();
  // 계정 목록이 오기 전에는 선호 계정으로 레포를 먼저 조회하고, 목록이 오면 유효성을 확인한다.
  const activeAccount = !isAccountsLoaded
    ? preferredAccount
    : accounts.some((account) => account.name === preferredAccount)
      ? preferredAccount
      : (accounts[0]?.name ?? null);
  const { data: repositories = [], isLoading: isReposLoading } =
    useAnalysisRepositories(activeAccount);

  const accountOptions = createGithubAccountOptions(accounts);

  const filtered = repositories.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  const [isRefreshing, setIsRefreshing] = useState(false);
  const openedGithubSettings = useRef(false);

  const refreshGithubAccess = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: githubAccountsKey() }),
        queryClient.invalidateQueries({ queryKey: ['analysisRepositories'] }),
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  // GitHub 설정 탭에서 돌아오면 권한 변경을 반영하도록 다시 조회한다.
  const handleWindowFocus = useEffectEvent(() => {
    if (!openedGithubSettings.current) return;
    openedGithubSettings.current = false;
    void refreshGithubAccess();
  });

  useEffect(() => {
    window.addEventListener('focus', handleWindowFocus);
    return () => window.removeEventListener('focus', handleWindowFocus);
  }, []);

  const handleAccountChange = (accountName: string) => {
    setSelectedAccount(accountName);
    setSearch('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p id="account-label" className="text-label-md text-foreground">
          Select Github Account
        </p>
        <Dropdown
          options={accountOptions}
          value={activeAccount}
          onChange={handleAccountChange}
          aria-labelledby="account-label"
          className="w-48"
          buttonClassName="w-full"
        />
        <div className="text-caption text-foreground-secondary flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>찾는 조직이 없나요?</span>
          <a
            href={GITHUB_OAUTH_APP_SETTINGS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              openedGithubSettings.current = true;
            }}
            className="text-blue inline-flex items-center gap-1 hover:underline"
          >
            GitHub에서 조직 접근 권한 관리
            <ExternalLink size={12} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => void refreshGithubAccess()}
            disabled={isRefreshing || isAccountsFetching}
            aria-label="GitHub 계정 및 레포지토리 목록 새로고침"
            className="text-foreground-secondary hover:text-foreground inline-flex items-center gap-1 disabled:opacity-50"
          >
            <RotateCw
              size={12}
              aria-hidden="true"
              className={isRefreshing || isAccountsFetching ? 'animate-spin' : ''}
            />
            새로고침
          </button>
        </div>
        <p className="text-caption text-foreground-tertiary">
          조직 멤버가 접근을 요청한 경우 조직 owner가 승인한 뒤 목록에 표시됩니다.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p id="repo-search-label" className="text-label-md text-foreground">
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
          className="text-caption text-foreground-secondary self-end pr-3.5"
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
                className="border-border-default block h-6 w-6 animate-spin rounded-full border-2 border-t-gray-600"
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
                  className={`text-body-md bg-surface flex w-full min-w-0 items-center gap-3 rounded-lg border px-4 py-3 text-left font-medium transition-colors ${
                    selectedRepo?.owner === repo.owner && selectedRepo?.name === repo.name
                      ? 'border-blue bg-blue/5 text-blue font-semibold'
                      : 'border-border-default text-foreground hover:bg-surface-muted'
                  }`}
                >
                  <RepoIcon name={repo.name} />
                  <span className="truncate">{repo.name}</span>
                  <span className="text-label-mono text-foreground-tertiary ml-auto shrink-0 font-mono">
                    {repo.private ? 'PRIVATE' : 'PUBLIC'}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
