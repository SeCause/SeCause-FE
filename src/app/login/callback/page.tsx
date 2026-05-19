import { Suspense } from 'react';

import LoginCallbackClient from './LoginCallbackClient';

export default function LoginCallbackPage() {
  return (
    <Suspense fallback={<div>로그인 처리 중...</div>}>
      <LoginCallbackClient />
    </Suspense>
  );
}
