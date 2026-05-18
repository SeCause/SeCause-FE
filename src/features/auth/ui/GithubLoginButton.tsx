import Image from 'next/image';

import GithubIcon from '@/icons/icon_github.svg';

export default function GithubLoginButton() {
  return (
    <button className="flex h-12 w-84 items-center justify-center gap-2 rounded-lg bg-black">
      <Image src={GithubIcon} alt="깃허브 아이콘" width={24} height={24} />
      <span className="font-semibold text-white">Github 계정으로 계속하기</span>
    </button>
  );
}
