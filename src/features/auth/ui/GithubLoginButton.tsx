'use client';

import Image from 'next/image';

import { GITHUB_OAUTH_URL } from '@/features/auth/config/oauthUrl';
import GithubIcon from '@/icons/icon_github.svg';

export default function GithubLoginButton() {
  const handleLogin = () => {
    window.location.href = GITHUB_OAUTH_URL;
  };

  return (
    <button
      onClick={handleLogin}
      className="hover:bg-blue flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-gray-900 px-6 transition-all hover:-translate-y-0.5"
    >
      <Image
        src={GithubIcon}
        alt=""
        aria-hidden="true"
        className="h-5 w-5"
        width={24}
        height={24}
      />
      <span className="text-label-md whitespace-nowrap text-white">Github 계정으로 계속하기</span>
    </button>
  );
}
