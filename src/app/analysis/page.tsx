'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCreateAnalysisRequest } from '@/features/analysis/hooks/useAnalysisApi';
import type { AnalysisRepository, AnalysisStep } from '@/features/analysis/model/types';
import AnalysisSidebar from '@/features/analysis/ui/AnalysisSidebar';
import BranchStep from '@/features/analysis/ui/BranchStep';
import RepoStep from '@/features/analysis/ui/RepoStep';
import { ROUTES } from '@/shared/config/routes';
import { useToast } from '@/shared/ui/Toast';

const HEADINGS: Record<AnalysisStep, { title: string; subtitle: string }> = {
  repo: {
    title: 'New Project',
    subtitle: '보안 분석을 진행할 GitHub 저장소를 선택해주세요.',
  },
  branch: {
    title: 'Analysis Setup',
    subtitle: '보안 분석을 진행할 브랜치를 지정해주세요.',
  },
};

export default function AnalysisPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [step, setStep] = useState<AnalysisStep>('repo');
  const [selectedRepo, setSelectedRepo] = useState<AnalysisRepository | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const { mutate: createAnalysisRequest, isPending } = useCreateAnalysisRequest();

  const handleRepoSelect = (repo: AnalysisRepository) => {
    setSelectedRepo(repo);
    setSelectedBranch(null);
  };

  const handleGoToBranch = () => {
    if (!selectedRepo) return;
    setSelectedBranch(selectedRepo.defaultBranch);
    setStep('branch');
  };

  const handleRunAnalysis = () => {
    if (!selectedRepo || !selectedBranch) return;
    createAnalysisRequest(
      {
        owner: selectedRepo.owner,
        repositoryName: selectedRepo.name,
        branch: selectedBranch,
      },
      {
        onSuccess: () => {
          showToast('분석 요청이 완료됐습니다.', 'success');
          router.push(ROUTES.mypage);
        },
        onError: () => showToast('분석 요청 중 오류가 발생했습니다.'),
      },
    );
  };

  return (
    <div className="flex h-full flex-1 flex-col items-center px-6 py-7 md:px-16 md:py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-2.5">
          <h1 className="text-heading-lg text-gray-900">{HEADINGS[step].title}</h1>
          <p className="text-body-md text-gray-700">{HEADINGS[step].subtitle}</p>
        </div>

        <div className="flex flex-col gap-6 md:grid md:grid-cols-[1fr_300px] md:items-start md:gap-8">
          <div className="flex flex-col gap-4">
            {step === 'branch' && (
              <button
                onClick={() => setStep('repo')}
                className="text-body-md flex w-fit items-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:text-gray-900"
              >
                ← 저장소 선택으로 돌아가기
              </button>
            )}

            <div className="rounded-2xl border border-gray-300 bg-gray-100/40 p-6">
              {step === 'repo' ? (
                <RepoStep value={selectedRepo} onChange={handleRepoSelect} />
              ) : (
                <BranchStep
                  repo={selectedRepo!}
                  value={selectedBranch}
                  onChange={setSelectedBranch}
                />
              )}
            </div>
          </div>

          <AnalysisSidebar
            label={
              step === 'repo' ? 'Select Repository' : isPending ? 'Requesting...' : 'Run Analysis'
            }
            disabled={
              step === 'repo' ? selectedRepo === null : selectedBranch === null || isPending
            }
            onClick={step === 'repo' ? handleGoToBranch : handleRunAnalysis}
          />
        </div>
      </div>
    </div>
  );
}
