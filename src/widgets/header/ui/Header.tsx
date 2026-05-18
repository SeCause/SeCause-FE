'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import AuthButton from '@/features/auth/ui/AuthButton';
import { ROUTES } from '@/shared/config/routes';

import NavLinks from './NavLinks';

// TODO: 실제 auth 구현 시 쿠키에서 user 읽어오기
export default function Header() {
  const [user, setUser] = useState<{ avatarUrl: string; username: string } | null>(null);
  const pathname = usePathname();

  return (
    <header className="z-header sticky top-0 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-10">
      <div className="flex h-full items-center gap-20">
        <Link
          href={ROUTES.home}
          className="text-primary text-xl font-bold"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          SeCause
        </Link>
        {pathname === ROUTES.home && <NavLinks />}
      </div>
      <AuthButton user={user} onLogout={() => setUser(null)} />
    </header>
  );
}
