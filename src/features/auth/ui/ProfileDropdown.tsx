'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId, useState } from 'react';

import ArrowIcon from '@/icons/icon_arrow.svg';
import LogoutIcon from '@/icons/icon_logout.svg';

interface Props {
  avatarUrl: string | null;
  username: string;
  onLogout: () => void;
}

function Avatar({
  avatarUrl,
  username,
  size,
}: {
  avatarUrl: string | null;
  username: string;
  size: number;
}) {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={`${username}의 프로필 사진`}
        width={size}
        height={size}
        className="rounded-full"
      />
    );
  }

  return (
    <span
      className="bg-blue flex items-center justify-center rounded-full font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.45 }}
      aria-hidden="true"
    >
      {username[0]?.toUpperCase()}
    </span>
  );
}

export default function ProfileDropdown({ avatarUrl, username, onLogout }: Props) {
  const id = useId();
  const menuId = `${id}-menu`;

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${username} 프로필 메뉴`}
        className="flex items-center gap-2 rounded-lg bg-gray-100 px-2 py-1 hover:bg-gray-200"
      >
        <Avatar avatarUrl={avatarUrl} username={username} size={28} />
        <span className={`inline-block ${open ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true">
          <Image src={ArrowIcon} alt="" width={18} height={18} />
        </span>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={`${username} 메뉴`}
          className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg"
        >
          <Link
            href="/mypage"
            role="menuitem"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            <Avatar avatarUrl={avatarUrl} username={username} size={36} />
            <span className="text-body-lg font-semibold">{username}</span>
          </Link>

          <div className="border-t border-gray-300" />
          <button
            role="menuitem"
            onClick={onLogout}
            className="text-body-md flex w-full items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Image src={LogoutIcon} alt="" aria-hidden="true" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
