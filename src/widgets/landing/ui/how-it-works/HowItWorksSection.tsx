'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import { SECTION_IDS } from '@/shared/config/routes';

const FEATURES = [
  {
    number: '01',
    label: 'Connect',
    title: '저장소를 연결하세요.',
    description: 'GitHub 계정을 연결하고 분석할 저장소와 브랜치를 선택합니다.',
  },
  {
    number: '02',
    label: 'Analyze',
    title: '위험을 한눈에 보세요.',
    description: '여러 분석 엔진이 코드 전체를 검사하고 위험도와 유형별로 정리합니다.',
  },
  {
    number: '03',
    label: 'Resolve',
    title: '원인을 이해하고 고치세요.',
    description: '문제가 발생한 코드와 원인, AI가 제안하는 수정 방법을 함께 확인합니다.',
  },
] as const;

const PREVIEWS = [
  dynamic(() => import('./AnalysisRequestPreview')),
  dynamic(() => import('./RepoOverviewPreview')),
  dynamic(() => import('./IssueDetailPreview')),
];

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const Preview = PREVIEWS[active];

  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="scroll-mt-header bg-surface-muted flex min-h-[calc(100svh-var(--spacing-header))] items-center px-6 py-20 md:min-h-[calc(100dvh-var(--spacing-header))] md:snap-start md:px-10 lg:py-[clamp(2rem,calc((100dvh-var(--spacing-header)-36.75rem)/2),5rem)]"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <p className="text-blue mb-5 text-xs font-semibold tracking-[0.16em]">HOW IT WORKS</p>
          <h2 className="text-foreground max-w-lg text-[clamp(2.8rem,5vw,5.6rem)] leading-[0.92] font-semibold tracking-[-0.06em]">
            From finding
            <br />
            to fixing.
          </h2>
          <p className="text-foreground-secondary mt-6 max-w-sm text-sm leading-6">
            복잡한 보안 분석을 세 단계의 명확한 흐름으로 만들었습니다.
          </p>

          <div className="border-border-default mt-10 border-t">
            {FEATURES.map((feature, index) => (
              <button
                key={feature.number}
                onClick={() => setActive(index)}
                className="group border-border-default grid w-full grid-cols-[2.5rem_1fr_auto] items-start gap-3 border-b py-5 text-left"
                aria-pressed={active === index}
              >
                <span
                  className={`text-num-mono font-mono ${active === index ? 'text-blue' : 'text-foreground-disabled'}`}
                >
                  {feature.number}
                </span>
                <span>
                  <span
                    className={`block text-lg font-semibold tracking-tight transition-colors ${active === index ? 'text-blue' : 'text-foreground'}`}
                  >
                    {feature.title}
                  </span>
                  {active === index && (
                    <span className="text-foreground-secondary mt-2 block max-w-sm text-xs leading-5">
                      {feature.description}
                    </span>
                  )}
                </span>
                <span
                  className={`text-xl transition-transform ${active === index ? 'text-blue rotate-45' : 'text-foreground-disabled group-hover:translate-x-1'}`}
                >
                  ↗
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="border-border-subtle bg-surface h-155 overflow-hidden rounded-3xl border shadow-[0_30px_80px_rgba(26,42,79,0.12)] lg:h-147">
            <div key={active} className="h-full">
              <Preview />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="z-below border-border-subtle absolute -right-3 -bottom-3 h-full w-full rounded-3xl border"
          />
        </div>
      </div>
    </section>
  );
}
