/**
 * Next.js App Router의 loading.tsx 전용 화면.
 * 라우트 세그먼트가 서스펜드된 동안(서버 컴포넌트의 비동기 데이터 패칭 등) 보여준다.
 */
export default function LoadingSpinner() {
  return (
    <section
      role="status"
      aria-label="로딩 중"
      className="flex min-h-[calc(100dvh-var(--spacing-header))] flex-col items-center justify-center gap-5"
    >
      <div className="border-t-blue size-8 animate-spin rounded-full border-2 border-gray-900/15" />
      <span className="text-label-mono font-mono text-gray-400">LOADING</span>
    </section>
  );
}
