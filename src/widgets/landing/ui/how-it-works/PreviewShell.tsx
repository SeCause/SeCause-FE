import { type ReactNode } from 'react';

import BrowserFrame from './BrowserFrame';

export default function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <BrowserFrame>
      <div inert className="w-full px-4 py-4 select-none sm:px-6 sm:py-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">{children}</div>
      </div>
    </BrowserFrame>
  );
}
