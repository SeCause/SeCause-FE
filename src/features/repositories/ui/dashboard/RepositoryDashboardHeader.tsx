import Image from 'next/image';

import FolderIcon from '@/icons/icon_folder.svg';

interface Props {
  owner: string;
  name: string;
  githubUrl: string;
}

export default function RepositoryDashboardHeader({ owner, name, githubUrl }: Props) {
  return (
    <div className="border-b border-gray-900/15 pb-5">
      <p className="text-blue mb-2 font-mono text-[10px] tracking-[0.14em]">REPOSITORY SECURITY</p>
      <a
        href={githubUrl}
        target="_blank"
        rel="noreferrer"
        className="group flex w-fit items-center gap-3"
      >
        <Image src={FolderIcon} alt="" aria-hidden="true" width={24} height={24} />
        <span className="text-heading-md group-hover:text-blue text-gray-900">
          {owner} / {name}
        </span>
        <span className="text-lg text-gray-400">↗</span>
      </a>
    </div>
  );
}
