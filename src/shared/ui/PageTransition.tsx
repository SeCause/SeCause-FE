'use client';

import { ViewTransition } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function PageTransition({ children }: Props) {
  return (
    <ViewTransition enter="page-fade-in" exit="page-fade-out" default="none">
      {children}
    </ViewTransition>
  );
}
