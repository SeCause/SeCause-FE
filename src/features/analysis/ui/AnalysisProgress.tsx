import type { AnalysisRequestStatus } from '@/features/analysis/model/types';

import styles from './AnalysisProgress.module.css';

interface Props {
  status: AnalysisRequestStatus;
  progressPercent: number;
  failureReason: string | null;
  isError: boolean;
  onBack: () => void;
}

function getProgressMessage(status: AnalysisRequestStatus, progressPercent: number) {
  if (status === 'FAILED') return '분석에 실패했습니다';
  if (status === 'CANCELLED') return '분석이 취소되었습니다';
  if (status === 'COMPLETED') return '분석이 완료되었습니다';
  if (status === 'PENDING') return '분석을 준비하고 있습니다';
  if (progressPercent < 34) return '프로젝트를 검사하고 있습니다';
  if (progressPercent < 67) return '보안 문제를 분석하고 있습니다';
  return '분석 결과를 생성하고 있습니다';
}

function getFailureMessage(
  status: AnalysisRequestStatus,
  failureReason: string | null,
  isError: boolean,
) {
  if (isError) return '분석 상태를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.';
  if (status === 'CANCELLED') return '분석이 취소되었습니다.';
  return failureReason ?? '분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
}

export default function AnalysisProgress({
  status,
  progressPercent,
  failureReason,
  isError,
  onBack,
}: Props) {
  const progress = Math.min(100, Math.max(0, progressPercent));
  const stopped = status === 'FAILED' || status === 'CANCELLED' || isError;

  return (
    <div className="flex min-h-[calc(100dvh-var(--spacing-header))] flex-1 items-center justify-center px-6">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {stopped && (
          <div className="mb-8 flex size-12 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
            !
          </div>
        )}

        <h1 className="text-heading-md text-gray-900">
          {isError ? '분석 상태를 확인할 수 없습니다' : getProgressMessage(status, progress)}
        </h1>
        <p className="text-body-md mt-3 text-gray-500">
          {stopped
            ? getFailureMessage(status, failureReason, isError)
            : '분석이 완료될 때까지 이 페이지를 유지해주세요.'}
        </p>

        {!stopped && (
          <div className="mt-8 w-full">
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="bg-blue relative h-full overflow-hidden rounded-full transition-[width] duration-700 ease-out"
                style={{ width: `${progress}%` }}
              >
                <span className={styles.shimmer} aria-hidden="true" />
              </div>
            </div>
            <p className="text-label-md mt-2 text-gray-600">{progress}%</p>
          </div>
        )}

        {stopped && (
          <button
            type="button"
            onClick={onBack}
            className="bg-blue text-label-lg mt-8 h-11 rounded-xl px-6 text-white"
          >
            분석 설정으로 돌아가기
          </button>
        )}
      </div>
    </div>
  );
}
