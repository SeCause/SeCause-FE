import Link from 'next/link';

import { ROUTES, SECTION_IDS } from '@/shared/config/routes';

import LogoAssembly from './LogoAssembly';

export default function HeroSection() {
  return (
    <section
      id={SECTION_IDS.overview}
      className="scroll-mt-header bg-canvas relative flex min-h-[calc(100svh-var(--spacing-header))] items-center overflow-hidden px-6 py-14 md:min-h-[calc(100dvh-var(--spacing-header))] md:snap-start md:px-10 lg:py-16"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="bg-blue h-px w-9" />
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
          <div className="mt-9 flex flex-wrap items-center gap-5">
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
          <div className="text-label-mono border-border-subtle text-foreground-tertiary mt-12 flex gap-8 border-t pt-5 font-mono sm:gap-12">
            <span>NO INSTALL</span>
            <span>PRIVATE REPO</span>
            <span>CODE NOT STORED</span>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-88 w-full max-w-145 items-center justify-center px-3 py-5 sm:min-h-100 lg:min-h-120">
          <div className="w-full max-w-110">
            <LogoAssembly />
          </div>
        </div>
      </div>
    </section>
  );
}
