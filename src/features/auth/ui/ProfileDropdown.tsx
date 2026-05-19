'use client';

import Image from 'next/image';
import { useState } from 'react';

import ArrowIcon from '@/icons/icon_arrow.svg';
import LogoutIcon from '@/icons/icon_logout.svg';

interface Props {
  avatarUrl: string;
  username: string;
  onLogout: () => void;
}

export default function ProfileDropdown({ avatarUrl, username, onLogout }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-surface hover:bg-surface-hover flex items-center gap-2 rounded-lg px-2 py-1"
      >
        <Image src={avatarUrl} alt="프로필" width={28} height={28} className="rounded-full" />
        <span className={`inline-block ${open ? 'rotate-180' : 'rotate-0'}`}>
          <Image src={ArrowIcon} alt="화살표" width={18} height={18} />
        </span>
      </button>

      {open && (
        <div className="border-border absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border bg-white shadow-lg">
          <div className="flex items-center gap-3 px-4 py-3">
            <Image src={avatarUrl} alt="프로필" width={36} height={36} className="rounded-full" />
            <span className="text-base font-semibold">{username}</span>
          </div>
          <div className="border-border border-t" />
          <button
            onClick={onLogout}
            className="text-text-secondary hover:bg-surface flex w-full items-center gap-2 px-4 py-3 text-sm"
          >
            <Image src={LogoutIcon} alt="로그아웃" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
