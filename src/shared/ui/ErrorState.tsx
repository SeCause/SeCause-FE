import Link from 'next/link';
import { useEffect } from 'react';

import { ROUTES } from '@/shared/config/routes';

interface Props {
  title?: string;
  description?: string;
  onRetry: () => void;
  error?: Error;
}

export default function ErrorState({
  title = '문제가 발생했습니다.',
  description = '일시적인 오류일 수 있습니다. 잠시 후 다시 시도해주세요.',
  onRetry,
  error,
}: Props) {
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <section className="bg-canvas flex min-h-[calc(100dvh-var(--spacing-header))] items-center px-6 py-14 md:px-10">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="bg-blue h-px w-9" />
          <span className="text-blue text-[10px] font-semibold tracking-[0.18em]">
            SOMETHING WENT WRONG
          </span>
        </div>

        <h2 className="text-foreground text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[0.9] font-semibold tracking-[-0.06em]">
          {title}
        </h2>

        <p className="text-foreground-secondary mt-7 max-w-md text-sm leading-6">{description}</p>

        <div className="border-border-subtle mt-9 flex flex-wrap items-center gap-5 border-t pt-7">
          <button
            onClick={onRetry}
            className="text-label-md text-on-inverse hover:bg-blue bg-inverse rounded-full px-6 py-3 transition-all hover:-translate-y-0.5"
          >
            다시 시도
          </button>

          <Link
            href={ROUTES.mypage}
            className="text-label-md hover:border-blue hover:text-blue border-border-strong text-foreground-secondary border-b pb-1 transition-colors"
          >
            마이페이지로 이동
          </Link>
        </div>
      </div>
    </section>
  );
}
