import { House, RotateCcw } from 'lucide-react';
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
    <section className="flex min-h-[calc(100dvh-var(--spacing-header))] flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      <h2 className="text-heading-md text-gray-900">{title}</h2>
      <p className="text-body-md max-w-md text-gray-600">{description}</p>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button
          onClick={onRetry}
          className="text-label-md inline-flex h-12 items-center gap-2 rounded-lg bg-black px-5 text-white transition-all hover:-translate-y-0.5 hover:bg-gray-800"
        >
          <RotateCcw className="size-4" />
          다시 시도
        </button>

        <Link
          href={ROUTES.mypage}
          className="text-label-md inline-flex h-12 items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 text-gray-700 transition-all hover:-translate-y-0.5 hover:bg-gray-100 hover:text-gray-900"
        >
          <House className="size-4" />
          마이페이지로 이동
        </Link>
      </div>
    </section>
  );
}
