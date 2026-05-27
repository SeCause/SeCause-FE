import Image from 'next/image';

interface Props {
  name: string;
  imageUrl?: string;
}

export default function RepoIcon({ name, imageUrl }: Props) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={`${name} 리포지토리 아이콘`}
        width={28}
        height={28}
        className="h-7 w-7 shrink-0 rounded"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="bg-blue/10 text-blue text-label-sm flex h-7 w-7 shrink-0 items-center justify-center rounded uppercase"
    >
      {name[0]}
    </span>
  );
}
