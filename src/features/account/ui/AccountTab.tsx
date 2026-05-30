'use client';

import Image from 'next/image';
import { useState } from 'react';

import GithubBadge from '@/features/auth/ui/GithubBadge';
import CameraIcon from '@/icons/icon_camera.svg';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';

export default function AccountTab() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="text-heading-lg mb-6 text-gray-900">My Account</h1>

      <div className="rounded-2xl border border-gray-200">
        {/* 프로필 */}
        <div className="p-6 md:p-8">
          <h2 className="text-heading-md mb-6 text-gray-900 md:mb-8">프로필</h2>
          <div className="flex flex-col gap-6 md:flex-row md:gap-10">
            <div className="relative h-fit shrink-0 self-start">
              <div className="h-24 w-24 rounded-full bg-gray-200 md:h-28 md:w-28" />
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
                <Input
                  type="email"
                  defaultValue="epopcy@naver.com"
                  readOnly
                  className="md:flex-1"
                />
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-2">
                <span className="text-body-lg shrink-0 text-gray-700 max-lg:self-start md:w-12">
                  이름
                </span>
                <div className="flex min-w-0 flex-1 flex-row gap-3 max-lg:flex-col">
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="flex-1"
                  />
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>저장</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200" />

        {/* 계정 삭제 */}
        <div className="p-6 md:p-8">
          <h2 className="text-heading-md mb-4 text-gray-900 md:mb-5">계정 삭제</h2>
          <p className="text-body-lg mb-5 text-gray-600 md:mb-4">
            계정을 삭제하면 모든 분석 기록과 계정 데이터가 영구적으로 삭제됩니다.
          </p>
          <div className="mb-6 flex flex-wrap items-center gap-3 md:mb-8">
            <span className="text-label-lg text-gray-900">Login: chaeyoungwon~~~~~@github</span>
            <GithubBadge username="chaeyoungwon" />
          </div>
          <div className="flex justify-end">
            <Button variant="danger">계정 삭제</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
