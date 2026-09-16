'use client';

import { useUser } from '@/features/auth/hooks/useAuthApi';
import type { GetUserResponse } from '@/features/auth/model/types';
import Button from '@/shared/ui/Button';
import GithubBadge from '@/shared/ui/GithubBadge';
import ThemeToggle from '@/shared/ui/ThemeToggle';

import ProfileForm from './ProfileForm';

interface Props {
  initialUser: GetUserResponse | null;
  isHydrated: boolean;
}

export default function AccountTab({ initialUser, isHydrated }: Props) {
  const { data: clientUser } = useUser();
  const user = isHydrated ? clientUser : initialUser;

  if (!user) return null;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="border-border-subtle mb-5 border-b pb-5">
        <p className="text-blue text-label-mono mb-2 font-mono">PROFILE SETTINGS</p>
        <h1 className="text-heading-lg text-foreground">Account</h1>
      </div>

      <div className="bg-surface border-border-subtle overflow-hidden rounded-3xl border shadow-[0_18px_50px_rgba(27,43,75,0.05)]">
        <div className="p-5 md:p-6">
          <h2 className="text-heading-md text-foreground mb-5">프로필</h2>
          <ProfileForm user={user} />
        </div>

        <div className="border-border-subtle flex flex-col items-start gap-4 border-t p-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <div>
            <h2 className="text-heading-md text-foreground">화면 테마</h2>
            <p className="text-body-md text-foreground-secondary mt-1">
              라이트 또는 다크 모드를 선택하세요.
            </p>
          </div>
          <ThemeToggle showLabel />
        </div>

        <div className="border-border-subtle border-t p-5 md:p-6">
          <h2 className="text-heading-md text-foreground mb-4">계정 삭제</h2>
          <p className="text-body-lg text-foreground-secondary mb-4">
            계정을 삭제하면 모든 분석 기록과 계정 데이터가 영구적으로 삭제됩니다.
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <GithubBadge username={user.githubLoginId || user.name} />
            <Button variant="danger">계정 삭제</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
