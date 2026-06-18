import Image from 'next/image';

import FolderIcon from '@/icons/icon_folder.svg';

interface Props {
  owner: string;
  name: string;
  githubUrl: string;
}

export default function RepositoryDashboardHeader({ owner, name, githubUrl }: Props) {
  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noreferrer"
      className="text-label-lg text-blue flex w-fit items-center gap-2 font-bold hover:underline"
    >
      <Image src={FolderIcon} alt="" aria-hidden="true" width={18} height={18} />
      {owner} / {name}
    </a>
  );
}
