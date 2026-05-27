'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';

import AuthButton from '@/features/auth/ui/AuthButton';
import { ROUTES } from '@/shared/config/routes';
import { useClickOutside } from '@/shared/lib/useClickOutside';

import NavLinks, { NAV_ITEMS } from './NavLinks';

export default function Header() {
  const [user, setUser] = useState<{ avatarUrl: string; username: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === ROUTES.home;
  const isLogin = pathname === ROUTES.login;

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRefs = useMemo(() => [hamburgerRef, menuRef], []);
  useClickOutside(
    mobileMenuRefs,
    useCallback(() => setIsMobileMenuOpen(false), []),
  );

  return (
    <>
      <header className="z-header sticky top-0 grid h-14 grid-cols-[1fr_auto_1fr] items-center border-b border-gray-200 bg-white px-4 md:flex md:justify-between md:px-10">
        <div className="flex h-full items-center gap-20">
          {isHome && (
            <button
              ref={hamburgerRef}
              className="flex flex-col justify-center gap-1.5 p-1 md:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="메뉴 열기"
            >
              <span className="block h-0.5 w-6 bg-black" />
              <span className="block h-0.5 w-6 bg-black" />
              <span className="block h-0.5 w-6 bg-black" />
            </button>
          )}
          <Link
            href={ROUTES.home}
            className="text-blue text-heading-md hidden md:block"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            SeCause
          </Link>

          {isHome && <NavLinks />}
        </div>

        <Link
          href={ROUTES.home}
          className="text-blue text-heading-md md:hidden"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMobileMenuOpen(false);
          }}
        >
          SeCause
        </Link>

        <div className="flex justify-end">
          {(!isLogin || user) && <AuthButton user={user} onLogout={() => setUser(null)} />}
        </div>
      </header>

      {isHome && (
        <div
          ref={menuRef}
          className={`z-header fixed top-14 right-0 left-0 overflow-hidden border-gray-200 bg-white transition-[max-height] duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'max-h-60 border-b' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col gap-1 px-6 py-4">
            {NAV_ITEMS.map(({ label, sectionId }) => (
              <a
                key={sectionId}
                href={`${ROUTES.home}#${sectionId}`}
                className="text-body-lg py-3 font-medium text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
