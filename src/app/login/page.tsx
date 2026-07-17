import { Check } from 'lucide-react';
import Image from 'next/image';

import SeCauseIcon from '@/app/icon.svg';
import GithubLoginButton from '@/features/auth/ui/GithubLoginButton';
import BackgroundGrid from '@/shared/ui/BackgroundGrid';

import styles from './page.module.css';

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
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-white px-6 py-14">
      <BackgroundGrid />

      <section className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="border-blue/35 mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl border bg-white">
            <Image src={SeCauseIcon} alt="SeCause" width={28} height={28} priority />{' '}
          </div>

          <h1 className="text-heading-lg text-gray-900">SeCause에 로그인</h1>

          <p className="text-body-md mx-auto mt-3 max-w-sm text-gray-600">
            GitHub 계정으로 로그인하고 프로젝트의 보안 분석을 시작하세요.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)] md:p-8">
          <ul className="mb-4 space-y-2">
            {LOGIN_NOTES.map((note) => (
              <li key={note} className="text-body-sm flex items-start gap-2.5 text-gray-700">
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                  <Check className="size-3" />
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>

          <div className="flex w-full justify-center">
            <GithubLoginButton />
          </div>

          <div className="my-7 h-px bg-gray-100" />

          <p className="text-label-sm mb-4 text-gray-500">로그인 후 이용할 수 있는 기능</p>

          <ul className="space-y-3">
            {BENEFIT_ITEMS.map((item) => (
              <li key={item} className="text-body-sm flex items-center gap-3 text-gray-600">
                <span className="bg-blue/8 text-blue flex size-5 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-center gap-2 font-mono text-xs text-gray-400">
            <span className={`${styles.cursorBlink} bg-blue inline-block h-3.5 w-0.5`} />
            <span>Ready to connect</span>
          </div>
        </div>
      </section>
    </div>
  );
}
