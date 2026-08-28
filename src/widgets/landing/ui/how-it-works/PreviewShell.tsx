import { type ReactNode } from 'react';

import BrowserFrame from './BrowserFrame';

export default function PreviewShell({
  children,
  scaled = false,
  align = 'center',
}: {
  children: ReactNode;
  scaled?: boolean;
  align?: 'center' | 'start';
}) {
  return (
    <BrowserFrame>
      <div
        inert
        className={`flex flex-col px-4 py-4 select-none sm:px-6 sm:py-6 ${scaled ? 'h-[122%] w-[122%] origin-top-left scale-[0.82]' : 'min-h-full w-full'}`}
      >
        <div
          className={`mx-auto flex w-full max-w-3xl grow flex-col gap-4 ${align === 'start' ? 'justify-start' : 'justify-center'}`}
        >
          {children}
        </div>
      </div>
    </BrowserFrame>
  );
}
