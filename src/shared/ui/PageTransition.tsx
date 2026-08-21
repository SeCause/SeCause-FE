'use client';

import './PageTransition.module.css';

import { ViewTransition } from '@/shared/lib/viewTransition';

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
