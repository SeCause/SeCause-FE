'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import {
  AnalysisProgress,
  type AnalysisRepository,
  AnalysisSidebar,
  type AnalysisStep,
  BranchStep,
  RepoStep,
  useAnalysisStatus,
  useCreateAnalysisRequest,
} from '@/features/analysis';
import type { AnalysisRequestResult } from '@/features/analysis/model/types';
import { ROUTES } from '@/shared/config/routes';
import PageTransition from '@/shared/ui/PageTransition';
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

function AnalysisPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialAccountName = searchParams.get('account');
  const { showToast } = useToast();
  const [step, setStep] = useState<AnalysisStep>('repo');
  const [selectedRepo, setSelectedRepo] = useState<AnalysisRepository | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [analysisRequest, setAnalysisRequest] = useState<AnalysisRequestResult | null>(null);
  const { mutate: createAnalysisRequest, isPending } = useCreateAnalysisRequest();
  const { data: analysisStatus, isError: isStatusError } = useAnalysisStatus(
    analysisRequest?.analysisId ?? null,
  );

  useEffect(() => {
    if (analysisStatus?.analysisStatus === 'COMPLETED' && analysisRequest) {
      router.replace(ROUTES.repositoryDetail(analysisRequest.repositoryId));
    }
  }, [analysisRequest, analysisStatus?.analysisStatus, router]);

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
        onSuccess: (result) => {
          setAnalysisRequest(result);
          showToast('분석 요청을 접수했습니다.', 'success');
        },
        onError: () => showToast('분석 요청 중 오류가 발생했습니다.'),
      },
    );
  };

  if (analysisRequest) {
    return (
      <PageTransition>
        <AnalysisProgress
          status={analysisStatus?.analysisStatus ?? analysisRequest.analysisStatus}
          progressPercent={analysisStatus?.progressPercent ?? 0}
          failureReason={analysisStatus?.failureReason ?? null}
          isError={isStatusError}
          onBack={() => setAnalysisRequest(null)}
        />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="flex h-full flex-1 flex-col items-center bg-white px-6 py-7 md:px-10 md:py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <div className="border-b border-gray-900/15 pb-5">
            <p className="text-blue mb-2.5 font-mono text-[10px] tracking-[0.14em]">
              NEW ANALYSIS / {step === 'repo' ? '01' : '02'}
            </p>
            <h1 className="text-heading-lg text-gray-900">{HEADINGS[step].title}</h1>
            <p className="mt-2 text-sm text-gray-600">{HEADINGS[step].subtitle}</p>
          </div>

          <div className="flex flex-col gap-6 md:grid md:grid-cols-[1fr_280px] md:items-start md:gap-6">
            <div className="flex flex-col gap-4">
              {step === 'branch' && (
                <button
                  onClick={() => setStep('repo')}
                  className="text-body-md hover:border-blue hover:text-blue flex w-fit items-center gap-1 border-b border-gray-400 pb-1 text-gray-700"
                >
                  ← 저장소 선택으로 돌아가기
                </button>
              )}

              <div className="rounded-2xl border border-gray-900/10 bg-white p-5 shadow-[0_12px_32px_rgba(27,43,75,0.05)] md:p-6">
                {step === 'repo' ? (
                  <RepoStep
                    value={selectedRepo}
                    onChange={handleRepoSelect}
                    initialAccountName={initialAccountName}
                  />
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
    </PageTransition>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense fallback={null}>
      <AnalysisPageContent />
    </Suspense>
  );
}
