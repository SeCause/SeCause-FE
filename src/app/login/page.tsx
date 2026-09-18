import { Check } from 'lucide-react';
import type { Metadata } from 'next';

import { GithubLoginButton } from '@/features/auth';
import PageTransition from '@/shared/ui/PageTransition';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: '로그인',
};

const BENEFIT_ITEMS = [
  '프로젝트 취약점 분석',
  'AI 기반 원인 및 영향 설명',
  '수정 가이드와 분석 결과 관리',
];

const LOGIN_NOTES = [
  '별도의 회원가입 없이 바로 이용할 수 있습니다.',
  '로그인을 계속하면 이용약관 및 개인정보 처리방침에 동의하게 됩니다.',
];

export default function Login() {
  return (
    <PageTransition>
      <div className="bg-canvas flex flex-1 items-center px-6 py-10 md:px-10 md:py-14">
        <section className="mx-auto grid w-full max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-12">
          <div className="lg:col-start-1 lg:row-start-1">
            <div className="mb-8 flex items-center gap-3">
              <span className="bg-blue h-px w-9" />
              <span className="text-blue text-[10px] font-semibold tracking-[0.18em]">
                SIGN IN WITH GITHUB
              </span>
            </div>

            <h1 className="text-foreground text-[clamp(3rem,6vw,5.6rem)] leading-[0.86] font-semibold tracking-[-0.07em]">
              Start
              <br />
              secure.
            </h1>

            <p className="text-foreground-secondary mt-8 max-w-md text-sm leading-6">
              GitHub 계정으로 로그인하고 프로젝트의 보안 분석을 시작하세요.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:ml-auto lg:self-center">
            <div className="bg-surface border-border-subtle rounded-3xl border p-7 shadow-[0_18px_50px_rgba(27,43,75,0.05)] md:p-8">
              <p className="text-label-mono text-foreground-disabled font-mono">GET STARTED</p>
              <h2 className="text-heading-md text-foreground mt-3">SeCause에 로그인</h2>

              <ul className="mt-6 space-y-2.5">
                {LOGIN_NOTES.map((note) => (
                  <li
                    key={note}
                    className="text-foreground-secondary flex items-start gap-2.5 text-xs leading-5"
                  >
                    <span className="text-blue mt-0.5 flex size-4 shrink-0 items-center justify-center">
                      <Check className="size-3.5" />
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex w-full">
                <GithubLoginButton />
              </div>

              <div className="text-label-mono border-border-subtle text-foreground-disabled mt-7 flex items-center gap-2 border-t pt-5 font-mono">
                <span className={`${styles.cursorBlink} bg-blue inline-block h-3 w-0.5`} />
                <span>READY TO CONNECT</span>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="z-below border-border-subtle absolute -right-3 -bottom-3 h-full w-full rounded-3xl border"
            />
          </div>

          <ul className="border-border-subtle border-t lg:col-start-1 lg:row-start-2">
            {BENEFIT_ITEMS.map((item, index) => (
              <li
                key={item}
                className="border-border-default grid grid-cols-[2.5rem_1fr] items-center gap-3 border-b py-4"
              >
                <span className="text-num-mono text-foreground-disabled font-mono">
                  0{index + 1}
                </span>
                <span className="text-foreground text-sm font-medium tracking-tight">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageTransition>
  );
}
