'use client';

import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';

import ProfileDropdown from './ProfileDropdown';

interface User {
  avatarUrl: string;
  username: string;
}

interface Props {
  user: User | null;
  onLogout: () => void;
}

export default function AuthButton({ user, onLogout }: Props) {
  if (user) {
    return (
      <ProfileDropdown avatarUrl={user.avatarUrl} username={user.username} onLogout={onLogout} />
    );
  }

  return (
    <Link
      href={ROUTES.login}
      className="rounded-xl bg-black px-4 py-1.5 text-sm font-semibold text-white md:px-8 md:py-2"
    >
      <span className="md:hidden">Login</span>
      <span className="hidden md:inline">Get Started</span>
    </Link>
  );
}
