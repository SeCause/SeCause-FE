import Image from 'next/image';

import FolderIcon from '@/icons/icon_folder.svg';

interface Props {
  owner: string;
  name: string;
  githubUrl: string;
}

function getSafeGithubUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ['github.com', 'www.github.com'].includes(url.hostname)
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export default function RepositoryDashboardHeader({ owner, name, githubUrl }: Props) {
  const safeGithubUrl = getSafeGithubUrl(githubUrl);
  const repositoryName = (
    <>
      <Image src={FolderIcon} alt="" aria-hidden="true" width={24} height={24} />
      <span className="text-heading-md group-hover:text-blue text-foreground">
        {owner} / {name}
      </span>
      {safeGithubUrl ? <span className="text-foreground-disabled text-lg">↗</span> : null}
    </>
  );

  return (
    <div className="border-border-subtle border-b pb-5">
      <p className="text-blue text-label-mono mb-2 font-mono">REPOSITORY SECURITY</p>
      {safeGithubUrl ? (
        <a
          href={safeGithubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-fit items-center gap-3"
        >
          {repositoryName}
        </a>
      ) : (
        <div className="flex w-fit items-center gap-3">{repositoryName}</div>
      )}
    </div>
  );
}
