import Link from 'next/link';

import { ROUTES, SECTION_IDS } from '@/shared/config/routes';

import SecurityAnalysisVisual from './SecurityAnalysisVisual';

export default function HeroSection() {
  return (
    <section
      id={SECTION_IDS.overview}
      className="scroll-mt-header bg-canvas relative flex min-h-[calc(100svh-var(--spacing-header))] items-center overflow-hidden px-6 py-16 md:min-h-[calc(100dvh-var(--spacing-header))] md:snap-start md:px-10 lg:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 text-left lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 xl:gap-16">
        <div className="relative z-10 flex w-full max-w-2xl flex-col items-start lg:pl-6 xl:pl-10">
          <div className="mb-8 flex items-center justify-start gap-3">
            <span className="bg-blue h-px w-9" aria-hidden="true" />
            <span className="text-blue text-[10px] font-semibold tracking-[0.18em]">
              AI CODE SECURITY
            </span>
          </div>
          <h1 className="text-foreground text-[clamp(3.8rem,7.5vw,7.8rem)] leading-[0.84] font-semibold tracking-[-0.075em]">
            See why.
            <br />
            <span className="text-blue">Fix right.</span>
          </h1>
          <p className="text-foreground-secondary mt-8 max-w-md text-base leading-7 md:text-lg md:leading-8">
            취약점을 찾는 데서 끝내지 않고, 코드가 위험한 이유와 안전하게 고치는 방법까지
            연결합니다.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-start gap-5">
            <Link
              href={ROUTES.login}
              className="text-label-md text-on-inverse hover:bg-blue bg-inverse rounded-full px-6 py-3 transition-all hover:-translate-y-0.5"
            >
              GitHub로 시작하기
            </Link>
            <a
              href={`#${SECTION_IDS.howItWorks}`}
              className="text-label-md hover:border-blue hover:text-blue border-border-strong text-foreground-secondary border-b pb-1 transition-colors"
            >
              분석 과정 보기
            </a>
          </div>
          <div className="text-label-mono border-border-subtle text-foreground-tertiary mt-12 flex w-full flex-wrap justify-start gap-x-8 gap-y-3 border-t pt-5 font-mono sm:gap-x-12">
            <span>NO INSTALL</span>
            <span>PRIVATE REPO</span>
            <span>CODE NOT STORED</span>
          </div>
        </div>
        <div className="relative -mx-3 flex w-full items-center justify-center px-3 py-5 md:mx-0 md:min-h-100 lg:min-h-120 lg:justify-end lg:px-0">
          <SecurityAnalysisVisual />
        </div>
      </div>
    </section>
  );
}
