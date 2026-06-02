import Image from 'next/image';
import Link from 'next/link';

import GithubIcon from '@/icons/icon_github.svg';
import { ROUTES, SECTION_IDS } from '@/shared/config/routes';

export default function HeroSection() {
  return (
    <section
      id={SECTION_IDS.overview}
      className="scroll-mt-header flex h-[calc(100dvh-var(--spacing-header))] items-center px-6 md:px-20"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row md:gap-16">
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <h1 className="text-display">
            Turn your code
            <br />
            into <span className="text-blue">secure code</span>
          </h1>
          <p className="text-body-lg max-w-sm text-gray-600">
            취약점을 분석하고, 위험성을 이해하고,
            <br />
            AI 기반 가이드를 통해 빠르게 해결하세요.
          </p>
          <Link
            href={ROUTES.login}
            className="text-label-lg flex h-10 w-full items-center justify-center gap-4 rounded-lg bg-black text-white hover:bg-gray-800 md:h-12"
          >
            <Image src={GithubIcon} alt="" aria-hidden="true" width={20} height={20} />
            Get Started
          </Link>
        </div>

        {/* 임시, 추후 이미지로 교체 */}
        <div className="hidden w-full flex-1 md:block">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-xl">
            <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="text-body-sm ml-2 text-gray-400">server/api/auth/login.php</span>
            </div>
            <div className="space-y-1 p-5 font-mono text-sm">
              {[
                { num: 11, text: "$query = '';" },
                { num: 12, text: '$username = $_GET["username"];' },
                { num: 13, text: '$password = $_GET["password"];' },
                { num: 14, text: '' },
                { num: 15, text: '// ...중략...' },
                { num: 16, text: '' },
                { num: 17, highlighted: true, text: '$result = mysql_query($query);' },
                { num: 18, highlighted: true, text: '' },
                { num: 19, text: 'if (!$result) {' },
                { num: 20, text: '  $result = mysql_query($query, $username, $password);' },
              ].map(({ num, text, highlighted }) => (
                <div
                  key={num}
                  className={`flex gap-4 rounded px-2 py-0.5 ${highlighted ? 'bg-red-50' : ''}`}
                >
                  <span className="w-5 shrink-0 text-right text-gray-400">{num}</span>
                  <span className={highlighted ? 'text-red-600' : 'text-gray-700'}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
