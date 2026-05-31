'use client';

import { useUser } from '@/features/auth/hooks/useAuthApi';
import Button from '@/shared/ui/Button';
import GithubBadge from '@/shared/ui/GithubBadge';

import ProfileForm from './ProfileForm';

export default function AccountTab() {
  const { data: user } = useUser();

  return (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="text-heading-lg mb-6 text-gray-900">My Account</h1>

      <div className="rounded-2xl border border-gray-200">
        <div className="p-6 md:p-8">
          <h2 className="text-heading-md mb-6 text-gray-900 md:mb-8">프로필</h2>
          {user && <ProfileForm user={user} />}
        </div>

        <div className="border-t border-gray-200" />

        <div className="p-6 md:p-8">
          <h2 className="text-heading-md mb-4 text-gray-900 md:mb-5">계정 삭제</h2>
          <p className="text-body-lg mb-5 text-gray-600 md:mb-4">
            계정을 삭제하면 모든 분석 기록과 계정 데이터가 영구적으로 삭제됩니다.
          </p>
          <div className="mb-6 flex flex-wrap items-center gap-3 md:mb-8">
            <GithubBadge username={user?.username ?? ''} />
          </div>
          <div className="flex justify-end">
            <Button variant="danger">계정 삭제</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
