'use client';

import { Lottie, type LottieHandle } from 'lottie-react';
import { useEffect, useRef, useState } from 'react';

import type { AnalysisRequestStatus } from '@/features/analysis/model/types';

import analysisBear from './analysis-bear.json';
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
  const animationRef = useRef<LottieHandle>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean | null>(null);
  const [isFallen, setIsFallen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener('change', syncPreference);
    return () => mediaQuery.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion === null) return;
    if (prefersReducedMotion || status === 'COMPLETED' || isFallen) animationRef.current?.pause();
    else animationRef.current?.play();
  }, [isFallen, prefersReducedMotion, status]);

  useEffect(() => {
    if (prefersReducedMotion || status === 'COMPLETED') return;

    let recoveryTimer: number | undefined;
    const fallBriefly = () => {
      setIsFallen(true);
      recoveryTimer = window.setTimeout(() => setIsFallen(false), 1_800);
    };

    const firstFallTimer = window.setTimeout(fallBriefly, 12_000);
    const fallInterval = window.setInterval(fallBriefly, 24_000);

    return () => {
      window.clearTimeout(firstFallTimer);
      window.clearInterval(fallInterval);
      if (recoveryTimer !== undefined) window.clearTimeout(recoveryTimer);
    };
  }, [prefersReducedMotion, status]);

  return (
    <div className="flex min-h-[calc(100dvh-var(--spacing-header))] flex-1 items-center justify-center px-6">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {stopped && (
          <div className="mb-8 flex size-12 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
            !
          </div>
        )}

        <h1 className="text-heading-md text-foreground">
          {isError ? '분석 상태를 확인할 수 없습니다' : getProgressMessage(status, progress)}
        </h1>
        <p className="text-body-md text-foreground-tertiary mt-3">
          {stopped
            ? getFailureMessage(status, failureReason, isError)
            : '분석이 완료되면 발견된 취약점과 수정 가이드를 확인할 수 있습니다.'}
        </p>

        {!stopped && (
          <div className="mt-8 w-full">
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-label="분석 진행률"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div className={styles.rail} aria-hidden="true">
                <div className={styles.fill} style={{ width: `${progress}%` }} />
              </div>
              <span className={styles.runner} style={{ left: `${progress}%` }} aria-hidden="true">
                <span
                  className={
                    isFallen && status !== 'COMPLETED'
                      ? `${styles.character} ${styles.fallen}`
                      : styles.character
                  }
                >
                  <Lottie
                    lottieRef={animationRef}
                    src={analysisBear}
                    loop={status !== 'COMPLETED'}
                    autoplay={prefersReducedMotion !== true && status !== 'COMPLETED'}
                    className={styles.bear}
                    aria-hidden="true"
                  />
                </span>
              </span>
            </div>
            <div className="text-label-md text-foreground-secondary mt-2 flex justify-between">
              <span>{progress}%</span>
              <span>{status === 'COMPLETED' ? '도착했어요!' : '분석 중'}</span>
            </div>
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
