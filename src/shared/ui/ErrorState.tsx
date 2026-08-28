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
    <section className="flex min-h-[calc(100dvh-var(--spacing-header))] items-center bg-white px-6 py-14 md:px-10">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="bg-blue h-px w-9" />
          <span className="text-blue text-[10px] font-semibold tracking-[0.18em]">
            SOMETHING WENT WRONG
          </span>
        </div>

        <h2 className="text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[0.9] font-semibold tracking-[-0.06em] text-gray-900">
          {title}
        </h2>

        <p className="mt-7 max-w-md text-sm leading-6 text-gray-600">{description}</p>

        <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-gray-900/15 pt-7">
          <button
            onClick={onRetry}
            className="text-label-md hover:bg-blue rounded-full bg-gray-900 px-6 py-3 text-white transition-all hover:-translate-y-0.5"
          >
            다시 시도
          </button>

          <Link
            href={ROUTES.mypage}
            className="text-label-md hover:border-blue hover:text-blue border-b border-gray-400 pb-1 text-gray-700 transition-colors"
          >
            마이페이지로 이동
          </Link>
        </div>
      </div>
    </section>
  );
}
