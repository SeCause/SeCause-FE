'use client';

import Image from 'next/image';
import { useState } from 'react';

import AccountIcon from '@/icons/icon_account.svg';
import RepositoryIcon from '@/icons/icon_repository.svg';
import SidebarIcon from '@/icons/icon_sidebar.svg';
import SwitchIcon from '@/icons/icon_switch.svg';
import { cn } from '@/shared/lib/cn';
import Dropdown from '@/shared/ui/Dropdown';

export type MyPageTab = 'repositories' | 'account';

const ACCOUNT_OPTIONS = [
  { value: 'personal', label: '내 계정' },
  { value: 'org', label: '조직' },
];

const NAV_ITEMS: { id: MyPageTab; label: string; icon: string }[] = [
  { id: 'repositories', label: 'Repositories', icon: RepositoryIcon },
  { id: 'account', label: 'Account', icon: AccountIcon },
];

interface Props {
  activeTab: MyPageTab;
  onTabChange: (tab: MyPageTab) => void;
}

export default function MyPageSidebar({ activeTab, onTabChange }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(ACCOUNT_OPTIONS[0].value);

  return (
    <aside
      className={cn(
        'flex shrink-0 flex-col overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-200 ease-in-out',
        isOpen ? 'w-64' : 'w-14 items-center',
      )}
    >
      <div className="flex shrink-0 items-center justify-end border-b border-gray-200 px-3 py-3">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
          className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-gray-100"
        >
          <Image
            src={SidebarIcon}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
            className="icon-gray"
          />
        </button>
      </div>

      <div
        className={cn(
          'flex w-64 flex-col gap-4 px-3 py-4 transition-opacity duration-200 ease-in-out',
          isOpen ? 'opacity-100' : 'pointer-events-none invisible opacity-0',
        )}
      >
        <Dropdown
          options={ACCOUNT_OPTIONS}
          value={selectedAccount}
          onChange={setSelectedAccount}
          trailingIcon={<Image src={SwitchIcon} alt="" aria-hidden="true" width={12} height={22} />}
          fullWidth
        />

        <nav className="flex flex-col gap-1" aria-label="마이페이지 메뉴">
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              aria-current={activeTab === id ? 'page' : undefined}
              className={cn(
                'text-label-lg flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors',
                activeTab === id ? 'bg-blue/10 text-blue' : 'text-gray-700 hover:bg-gray-100',
              )}
            >
              <Image
                src={icon}
                alt=""
                aria-hidden="true"
                width={18}
                height={18}
                className={activeTab === id ? 'icon-blue' : 'icon-gray'}
              />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
