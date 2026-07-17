import { Compass, FolderGit2, House } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';
import BackgroundGrid from '@/shared/ui/BackgroundGrid';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100dvh-var(--spacing-header))] items-center justify-center overflow-hidden px-6 py-14">
      <BackgroundGrid />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <div className="text-label-md border-blue/15 bg-blue/5 text-blue mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2">
          <Compass className="size-4" />
          404 Not Found
        </div>

        <h1 className="mb-8 font-mono text-[112px] leading-none font-bold tracking-normal text-gray-900 sm:text-[168px]">
          404
        </h1>

        <h2 className="text-heading-md mb-4 text-gray-900">페이지를 찾을 수 없습니다.</h2>

        <p className="text-body-md max-w-xl text-gray-600">
          주소가 잘못 입력되었거나, 찾으려는 페이지가 이동 또는 삭제되었을 수 있습니다. <br />
          아래 버튼을 통해 홈이나 저장소 목록으로 이동해주세요.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={ROUTES.home}
            className="text-label-md inline-flex h-12 items-center gap-2 rounded-lg bg-black px-5 text-white transition-all hover:-translate-y-0.5 hover:bg-gray-800"
          >
            <House className="size-4" />
            홈으로 돌아가기
          </Link>

          <Link
            href={ROUTES.mypage}
            className="text-label-md inline-flex h-12 items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 text-gray-700 transition-all hover:-translate-y-0.5 hover:bg-gray-100 hover:text-gray-900"
          >
            <FolderGit2 className="size-4" />
            저장소 확인하기
          </Link>
        </div>
      </div>
    </section>
  );
}
