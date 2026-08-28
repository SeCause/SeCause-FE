import { Check } from 'lucide-react';
import type { Metadata } from 'next';

import GithubLoginButton from '@/features/auth/ui/GithubLoginButton';
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
      <div className="flex flex-1 items-center bg-white px-6 py-10 md:px-10 md:py-14">
        <section className="mx-auto grid w-full max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-12">
          <div className="lg:col-start-1 lg:row-start-1">
            <div className="mb-8 flex items-center gap-3">
              <span className="bg-blue h-px w-9" />
              <span className="text-blue text-[10px] font-semibold tracking-[0.18em]">
                SIGN IN WITH GITHUB
              </span>
            </div>

            <h1 className="text-[clamp(3rem,6vw,5.6rem)] leading-[0.86] font-semibold tracking-[-0.07em] text-gray-900">
              Start
              <br />
              secure.
            </h1>

            <p className="mt-8 max-w-md text-sm leading-6 text-gray-600">
              GitHub 계정으로 로그인하고 프로젝트의 보안 분석을 시작하세요.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:ml-auto lg:self-center">
            <div className="rounded-3xl border border-gray-900/10 bg-white p-7 shadow-[0_18px_50px_rgba(27,43,75,0.05)] md:p-8">
              <p className="font-mono text-[10px] tracking-[0.14em] text-gray-400">GET STARTED</p>
              <h2 className="text-heading-md mt-3 text-gray-900">SeCause에 로그인</h2>

              <ul className="mt-6 space-y-2.5">
                {LOGIN_NOTES.map((note) => (
                  <li
                    key={note}
                    className="flex items-start gap-2.5 text-xs leading-5 text-gray-600"
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

              <div className="mt-7 flex items-center gap-2 border-t border-gray-900/10 pt-5 font-mono text-[10px] tracking-[0.12em] text-gray-400">
                <span className={`${styles.cursorBlink} bg-blue inline-block h-3 w-0.5`} />
                <span>READY TO CONNECT</span>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="z-below absolute -right-3 -bottom-3 h-full w-full rounded-3xl border border-gray-900/15"
            />
          </div>

          <ul className="border-t border-gray-900/15 lg:col-start-1 lg:row-start-2">
            {BENEFIT_ITEMS.map((item, index) => (
              <li
                key={item}
                className="grid grid-cols-[2.5rem_1fr] items-center gap-3 border-b border-gray-900/20 py-4"
              >
                <span className="font-mono text-[10px] text-gray-400">0{index + 1}</span>
                <span className="text-sm font-medium tracking-tight text-gray-900">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageTransition>
  );
}
