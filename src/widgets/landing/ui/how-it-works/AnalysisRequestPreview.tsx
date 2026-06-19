import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { AnalysisSidebar, RepoIcon } from '@/features/analysis';
import GithubIcon from '@/icons/icon_github.svg';
import { cn } from '@/shared/lib/cn';
import Dropdown from '@/shared/ui/Dropdown';
import SearchBar from '@/shared/ui/SearchBar';
import { ACCOUNT_OPTIONS, REPO_OPTIONS } from '@/widgets/landing/model/mockHowItWorksData';

import PreviewShell from './PreviewShell';

const SELECT_DELAY_MS = 200;
const ENABLE_DELAY_MS = 600;
const PRESS_DELAY_MS = 500;
const PRESS_DURATION_MS = 300;

export default function AnalysisRequestPreview() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const selectTimer = setTimeout(() => setSelectedIndex(0), SELECT_DELAY_MS);
    const enableTimer = setTimeout(() => setIsButtonEnabled(true), ENABLE_DELAY_MS);
    const pressTimer = setTimeout(() => {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), PRESS_DURATION_MS);
    }, ENABLE_DELAY_MS + PRESS_DELAY_MS);

    return () => {
      clearTimeout(selectTimer);
      clearTimeout(enableTimer);
      clearTimeout(pressTimer);
    };
  }, [hasStarted]);

  return (
    <PreviewShell>
      <div ref={headingRef} className="flex flex-col gap-1">
        <h1 className="text-heading-md text-gray-900">New Project</h1>
        <p className="text-body-md text-gray-700">
          보안 분석을 진행할 GitHub 저장소를 선택해주세요.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_180px] lg:items-start lg:gap-8">
        <div className="rounded-2xl border border-gray-300 bg-gray-100/40 p-4 sm:p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-label-md text-gray-900">Select Github Account</p>
              <Dropdown
                options={ACCOUNT_OPTIONS}
                value={ACCOUNT_OPTIONS[0].value}
                onChange={() => {}}
                leadingIcon={
                  <Image
                    src={GithubIcon}
                    width={20}
                    height={20}
                    alt=""
                    aria-hidden="true"
                    className="brightness-0"
                  />
                }
              />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-label-md text-gray-900">Import Git Repository</p>
              <SearchBar onChange={() => {}} placeholder="Search for repositories" />
              <ul className="flex flex-col gap-2">
                {REPO_OPTIONS.map((name, idx) => (
                  <li key={name}>
                    <button
                      className={cn(
                        'text-body-md flex w-full items-center gap-3 rounded-lg border bg-white px-4 py-2 text-left font-medium transition-colors',
                        idx === selectedIndex
                          ? 'border-blue bg-blue/5 text-blue font-semibold'
                          : 'border-gray-300 text-gray-900',
                      )}
                    >
                      <RepoIcon name={name} />
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <AnalysisSidebar
          label="Select Repository"
          disabled={!isButtonEnabled}
          onClick={() => {}}
          buttonClassName={cn(
            'h-9 text-label-md rounded-lg transition-transform duration-150',
            isPressed && 'scale-95',
          )}
        />
      </div>
    </PreviewShell>
  );
}
