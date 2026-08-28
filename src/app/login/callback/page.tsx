import { Suspense } from 'react';

import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import PageTransition from '@/shared/ui/PageTransition';

import LoginCallbackClient from './LoginCallbackClient';

export default function LoginCallbackPage() {
  return (
    <PageTransition>
      <Suspense fallback={<LoadingSpinner />}>
        <LoginCallbackClient />
      </Suspense>
    </PageTransition>
  );
}
