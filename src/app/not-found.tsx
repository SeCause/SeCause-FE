import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';

export default function NotFound() {
  return (
    <section className="bg-canvas flex min-h-[calc(100dvh-var(--spacing-header))] items-center px-6 py-14 md:px-10">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <span className="bg-blue h-px w-9" />
            <span className="text-blue text-[10px] font-semibold tracking-[0.18em]">
              404 NOT FOUND
            </span>
          </div>

          <h1 className="text-foreground text-[clamp(3.2rem,6.5vw,6.4rem)] leading-[0.86] font-semibold tracking-[-0.07em]">
            Page not
            <br />
            found.
          </h1>

          <p className="text-foreground-secondary mt-8 max-w-md text-sm leading-6">
            주소가 잘못 입력되었거나, 찾으려는 페이지가 이동 또는 삭제되었을 수 있습니다. 아래
            버튼으로 홈이나 저장소 목록으로 이동해주세요.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href={ROUTES.home}
              className="text-label-md text-on-inverse hover:bg-blue bg-inverse rounded-full px-6 py-3 transition-all hover:-translate-y-0.5"
            >
              홈으로 돌아가기
            </Link>
            <Link
              href={ROUTES.mypage}
              className="text-label-md hover:border-blue hover:text-blue border-border-strong text-foreground-secondary border-b pb-1 transition-colors"
            >
              저장소 확인하기
            </Link>
          </div>
        </div>

        <div aria-hidden="true" className="relative mx-auto hidden w-full max-w-145 lg:block">
          <div className="border-border-subtle flex aspect-4/3 items-center justify-center rounded-3xl border">
            <span className="text-foreground font-mono text-[clamp(6rem,12vw,11rem)] leading-none font-bold tracking-[-0.04em]">
              404
            </span>
          </div>
          <div className="z-below border-border-subtle absolute -right-3 -bottom-3 h-full w-full rounded-3xl border" />
        </div>
      </div>
    </section>
  );
}
