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
        className="flex items-center gap-2 rounded-lg bg-gray-100 px-2 py-1 hover:bg-gray-200"
      >
        <Image src={avatarUrl} alt="프로필" width={28} height={28} className="rounded-full" />
        <span className={`inline-block ${open ? 'rotate-180' : 'rotate-0'}`}>
          <Image src={ArrowIcon} alt="화살표" width={18} height={18} />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg">
          <div className="flex items-center gap-3 px-4 py-3">
            <Image src={avatarUrl} alt="프로필" width={36} height={36} className="rounded-full" />
            <span className="text-body-lg font-semibold">{username}</span>
          </div>
          <div className="border-t border-gray-300" />
          <button
            onClick={onLogout}
            className="text-body-md flex w-full items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Image src={LogoutIcon} alt="로그아웃" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
