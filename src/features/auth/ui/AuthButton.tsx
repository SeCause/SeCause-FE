'use client';

import Link from 'next/link';

import type { UserProfile } from '@/features/auth/model/types';
import { ROUTES } from '@/shared/config/routes';

import ProfileDropdown from './ProfileDropdown';

interface Props {
  user: UserProfile | null;
  isLoading?: boolean;
  onLogout: () => void;
}

export default function AuthButton({ user, isLoading = false, onLogout }: Props) {
  return (
    <div className="flex min-w-16 justify-end md:min-w-28">
      {isLoading ? (
        <span className="h-8 w-16 md:h-9 md:w-28" aria-hidden="true" />
      ) : user ? (
        <ProfileDropdown avatarUrl={user.avatarUrl} username={user.name} onLogout={onLogout} />
      ) : (
        <Link
          href={ROUTES.login}
          aria-label="Get Started"
          className="text-label-md text-surface bg-inverse rounded-[10px] px-4 py-1.5 transition-colors md:px-8 md:py-2"
        >
          <span aria-hidden="true" className="md:hidden">
            Login
          </span>
          <span aria-hidden="true" className="hidden md:inline">
            Get Started
          </span>
        </Link>
      )}
    </div>
  );
}
