import { type ReactNode } from 'react';

export default function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-12 shrink-0 items-center border-b border-gray-900/10 bg-white px-5">
        <span className="bg-blue flex h-5 w-5 items-center justify-center rounded-md text-[9px] font-bold text-white">
          S
        </span>
        <span className="ml-2 text-xs font-semibold tracking-tight text-gray-900">SeCause</span>
        <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <div className="scrollbar-custom-gray min-h-0 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
