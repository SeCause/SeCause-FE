'use client';

import { useUser } from '@/features/auth/hooks/useAuthApi';
import Button from '@/shared/ui/Button';
import GithubBadge from '@/shared/ui/GithubBadge';

import ProfileForm from './ProfileForm';

export default function AccountTab() {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-5 border-b border-gray-900/15 pb-5">
        <p className="text-blue mb-2 font-mono text-[10px] tracking-[0.14em]">PROFILE SETTINGS</p>
        <h1 className="text-heading-lg text-gray-900">Account</h1>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-gray-900/10 bg-white shadow-[0_18px_50px_rgba(27,43,75,0.05)]">
        <div className="p-5 md:p-6">
          <h2 className="text-heading-md mb-5 text-gray-900">프로필</h2>
          {user && <ProfileForm user={user} />}
        </div>

        <div className="border-t border-gray-200" />

        <div className="p-5 md:p-6">
          <h2 className="text-heading-md mb-4 text-gray-900 md:mb-5">계정 삭제</h2>
          <p className="text-body-lg mb-5 text-gray-600 md:mb-4">
            계정을 삭제하면 모든 분석 기록과 계정 데이터가 영구적으로 삭제됩니다.
          </p>
          <div className="mb-6 flex flex-wrap items-center gap-3 md:mb-8">
            <GithubBadge username={user.githubLoginId || user.name} />
          </div>
          <div className="flex justify-end">
            <Button variant="danger">계정 삭제</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
