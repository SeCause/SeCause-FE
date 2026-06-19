'use client';

import { useState } from 'react';

import { SECTION_IDS } from '@/shared/config/routes';

import AnalysisRequestPreview from './AnalysisRequestPreview';
import IssueDetailPreview from './IssueDetailPreview';
import RepoOverviewPreview from './RepoOverviewPreview';

const TABS = [
  {
    label: 'Analysis Request',
    description: 'GitHub 저장소를 선택하고 보안 분석을 요청하세요.',
  },
  {
    label: 'Repo Overview',
    description: '리포지토리의 보안 분석 결과와 위험도 분포를 한눈에 확인하세요.',
  },
  {
    label: 'Issue Detail',
    description: '코드 diff와 함께 취약점 원인과 수정 방법을 확인하세요.',
  },
] as const;

const TAB_PREVIEWS = [AnalysisRequestPreview, RepoOverviewPreview, IssueDetailPreview];

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState(0);
  const ActivePreview = TAB_PREVIEWS[activeTab];

  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="scroll-mt-header flex h-[calc(100dvh-var(--spacing-header))] items-center px-6 md:px-20"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <h2 className="text-heading-lg text-center">How it works</h2>

        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <div className="flex flex-row gap-2 md:flex-col md:gap-3">
            {TABS.map((tab, idx) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(idx)}
                className={`text-label-md rounded-xl border px-4 py-2.5 text-left transition-all max-sm:text-center md:w-40 ${
                  activeTab === idx
                    ? 'border-blue text-blue bg-blue/5'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative h-112 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md md:h-135 md:flex-1">
            <ActivePreview />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 via-black/15 to-transparent px-4 pt-16 pb-4">
              <p className="text-label-md text-white/95">{TABS[activeTab].description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
