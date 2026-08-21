'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useUpdateUser } from '@/features/auth/hooks/useAuthApi';
import type { GetUserResponse } from '@/features/auth/model/types';
import CameraIcon from '@/icons/icon_camera.svg';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { useToast } from '@/shared/ui/Toast';

export default function ProfileForm({ user }: { user: GetUserResponse }) {
  const [name, setName] = useState(user.name);
  const { showToast } = useToast();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const trimmedName = name.trim();
  const isUnchanged = trimmedName === user.name;

  const handleSave = () => {
    if (!trimmedName || isUnchanged) return;

    updateUser(
      { name: trimmedName },
      {
        onSuccess: () => showToast('프로필이 저장됐습니다.', 'success'),
        onError: (error) =>
          showToast(error instanceof Error ? error.message : '프로필 저장 중 오류가 발생했습니다.'),
      },
    );
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-10">
      <div className="relative h-fit shrink-0 self-start">
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt="프로필 사진"
            width={112}
            height={112}
            className="h-24 w-24 rounded-full object-cover md:h-28 md:w-28"
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-gray-200 md:h-28 md:w-28" />
        )}
        <button
          aria-label="프로필 사진 변경"
          className="absolute right-0 -bottom-2 flex h-9 w-9 items-center justify-center"
        >
          <Image src={CameraIcon} alt="" aria-hidden="true" />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-2">
          <span className="text-body-lg shrink-0 text-gray-700 md:w-12">이메일</span>
          <p className="text-body-lg ml-3 text-gray-900">{user.email}</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-2">
          <span className="text-body-lg shrink-0 text-gray-700 md:w-12">이름</span>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            maxLength={50}
            className="flex-1"
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isPending || isUnchanged || !trimmedName}>
            {isPending ? '저장 중...' : '저장'}
          </Button>
        </div>
      </div>
    </div>
  );
}
