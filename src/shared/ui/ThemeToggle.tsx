'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

import { cn } from '@/shared/lib/cn';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'secause-theme';
const THEME_CHANGE_EVENT = 'secause-theme-change';

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
};

const getThemeSnapshot = () => document.documentElement.classList.contains('dark');
const getServerSnapshot = () => false;

export default function ThemeToggle({ showLabel = false }: { showLabel?: boolean }) {
  const isDark = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const nextTheme: Theme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem(STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={isDark ? '라이트 모드' : '다크 모드'}
      className={cn(
        'focus-visible:outline-blue border-border-default text-foreground-secondary hover:bg-surface-muted hover:text-foreground flex items-center justify-center gap-2 rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
        showLabel ? 'px-4 py-2.5' : 'size-9',
      )}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      {showLabel && <span className="text-label-md">{isDark ? '라이트 모드' : '다크 모드'}</span>}
    </button>
  );
}
