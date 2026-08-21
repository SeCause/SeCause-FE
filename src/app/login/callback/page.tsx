import { Suspense } from 'react';

import PageTransition from '@/shared/ui/PageTransition';

import LoginCallbackClient from './LoginCallbackClient';

export default function LoginCallbackPage() {
  return (
    <PageTransition>
      <Suspense fallback={<div>로그인 처리 중...</div>}>
        <LoginCallbackClient />
      </Suspense>
    </PageTransition>
  );
}
