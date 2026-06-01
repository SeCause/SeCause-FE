'use client';

interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

const NAV_BTN =
  'text-label-md flex h-8 w-8 items-center justify-center rounded-md transition-colors';

export default function Pagination({ current, total, onChange }: Props) {
  if (total <= 1) return null;

  const hasPrev = current > 1;
  const hasNext = current < total;

  return (
    <div className="flex items-center justify-center gap-1 pt-2">
      <button
        type="button"
        onClick={() => hasPrev && onChange(current - 1)}
        disabled={!hasPrev}
        aria-label="이전 페이지"
        className={`${NAV_BTN} ${hasPrev ? 'text-gray-600 hover:bg-gray-100' : 'cursor-default text-gray-300'}`}
      >
        &lt;
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map((pageNum) => {
        const isActive = pageNum === current;
        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onChange(pageNum)}
            className={
              isActive
                ? `${NAV_BTN} bg-blue text-white`
                : `${NAV_BTN} text-gray-600 hover:bg-gray-100`
            }
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => hasNext && onChange(current + 1)}
        disabled={!hasNext}
        aria-label="다음 페이지"
        className={`${NAV_BTN} ${hasNext ? 'text-gray-600 hover:bg-gray-100' : 'cursor-default text-gray-300'}`}
      >
        &gt;
      </button>
    </div>
  );
}
