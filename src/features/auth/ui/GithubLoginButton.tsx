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
      className="flex h-10 w-fit items-center justify-center gap-2 rounded-lg bg-black px-14 md:h-12"
    >
      <Image
        src={GithubIcon}
        alt=""
        aria-hidden="true"
        className="h-4 w-4 md:h-6 md:w-6"
        width={24}
        height={24}
      />
      <span className="text-label-md md:text-body-lg whitespace-nowrap text-white md:font-semibold">
        Github 계정으로 계속하기
      </span>
    </button>
  );
}
