import Image from 'next/image';

import FolderIcon from '@/icons/icon_folder.svg';
import { ViewTransition } from '@/shared/lib/viewTransition';

interface Props {
  repositoryId: number;
  owner: string;
  name: string;
  githubUrl: string;
}

export default function RepositoryDashboardHeader({ repositoryId, owner, name, githubUrl }: Props) {
  return (
    <ViewTransition name={`repo-${repositoryId}`}>
      <a
        href={githubUrl}
        target="_blank"
        rel="noreferrer"
        className="text-heading-base text-blue flex w-fit items-center gap-2 hover:underline"
      >
        <Image src={FolderIcon} alt="" aria-hidden="true" width={24} height={24} />
        {owner} / {name}
      </a>
    </ViewTransition>
  );
}
