import { ExternalLink } from 'lucide-react';

import type { AnalysisRepository } from '@/features/analysis/model/types';
import { cn } from '@/shared/lib/cn';

const INFO_BULLETS = [
  'Semgrep과 CodeQL을 함께 사용해 통합 분석합니다.',
  '분석이 완료되면 발견된 취약점과 수정 가이드를 확인할 수 있습니다.',
];

interface Props {
  label: string;
  disabled: boolean;
  onClick: () => void;
  repository?: AnalysisRepository | null;
  buttonClassName?: string;
}

export default function AnalysisSidebar({
  label,
  disabled,
  onClick,
  repository,
  buttonClassName,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-surface-subtle rounded-xl p-4">
        <h2 className="text-label-md text-foreground mb-2">분석 정보</h2>
        <ul className="flex flex-col gap-2">
          {INFO_BULLETS.map((bullet) => (
            <li key={bullet} className="text-caption text-foreground-secondary flex gap-2">
              <span aria-hidden="true" className="mt-0.5 shrink-0">
                •
              </span>
              {bullet}
            </li>
          ))}
        </ul>
        <div className="border-border-subtle mt-4 border-t pt-3">
          <h3 className="text-label-sm text-foreground mb-1">CodeQL을 켜고 분석 범위를 넓히세요</h3>
          <p className="text-caption text-foreground-secondary leading-5">
            GitHub에서 CodeQL을 활성화하면 다음 분석부터 Semgrep과 CodeQL 결과를 함께 확인할 수
            있습니다.
            {repository && (
              <>
                {' '}
                설정 방법은{' '}
                <a
                  href="https://docs.github.com/ko/code-security/how-tos/find-and-fix-code-vulnerabilities/configure-code-scanning/configure-code-scanning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue hover:underline"
                >
                  한글 가이드
                </a>
                에서 볼 수 있어요.
              </>
            )}
          </p>
          <a
            href={
              repository
                ? `https://github.com/${encodeURIComponent(repository.owner)}/${encodeURIComponent(repository.name)}/settings/security_analysis`
                : 'https://docs.github.com/ko/code-security/how-tos/find-and-fix-code-vulnerabilities/configure-code-scanning/configure-code-scanning'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue text-caption mt-2 inline-flex items-center gap-1.5 whitespace-nowrap hover:underline"
          >
            {repository ? 'GitHub에서 CodeQL 켜기' : 'CodeQL 설정 방법 보기'}
            <ExternalLink size={12} className="shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="max-md:bg-surface/95 max-md:border-border-subtle max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:z-30 max-md:border-t max-md:px-6 max-md:pt-3 max-md:pb-[calc(0.75rem+env(safe-area-inset-bottom))] max-md:backdrop-blur">
        <button
          disabled={disabled}
          onClick={onClick}
          className={cn(
            'text-label-lg h-12 w-full rounded-xl transition-colors',
            disabled
              ? 'bg-surface-muted text-foreground-tertiary cursor-not-allowed'
              : 'bg-blue cursor-pointer text-white',
            buttonClassName,
          )}
        >
          {label}
        </button>
      </div>
    </div>
  );
}
