'use client';

import { useEffect, useState } from 'react';

import { ROUTES, SECTION_IDS, type SectionId } from '@/shared/config/routes';

export const NAV_ITEMS: { label: string; sectionId: SectionId }[] = [
  { label: 'Product', sectionId: SECTION_IDS.overview },
  { label: 'How it works', sectionId: SECTION_IDS.howItWorks },
  { label: 'FAQ', sectionId: SECTION_IDS.faq },
];

export default function NavLinks() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(SECTION_IDS.overview);

  useEffect(() => {
    const targets = NAV_ITEMS.map(({ sectionId }) => document.getElementById(sectionId)).filter(
      Boolean,
    ) as HTMLElement[];

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id as SectionId);
      },
      { threshold: 0.35 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="데스크톱 네비게이션"
      className="hidden h-full items-center justify-center gap-8 md:flex"
    >
      {NAV_ITEMS.map(({ label, sectionId }) => (
        <a
          key={sectionId}
          href={`${ROUTES.home}#${sectionId}`}
          aria-current={activeSection === sectionId ? 'true' : undefined}
          className={`text-body-md flex h-full items-center transition-colors ${
            activeSection === sectionId
              ? 'text-foreground font-semibold'
              : 'text-foreground-secondary hover:text-foreground font-medium'
          }`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
