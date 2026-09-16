import Image from 'next/image';

import GithubIcon from '@/icons/icon_github.svg';

interface Props {
  username: string;
}

export default function GithubBadge({ username }: Props) {
  return (
    <span className="text-label-md text-on-inverse bg-inverse inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
      <Image
        src={GithubIcon}
        alt=""
        aria-hidden="true"
        width={15}
        height={15}
        className="icon-on-inverse"
      />
      {username}
    </span>
  );
}
