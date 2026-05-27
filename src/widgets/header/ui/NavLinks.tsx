'use client';

import { useEffect, useRef, useState } from 'react';

import { ROUTES, SECTION_IDS, type SectionId } from '@/shared/config/routes';

export const NAV_ITEMS: { label: string; sectionId: SectionId }[] = [
  { label: 'Overview', sectionId: SECTION_IDS.overview },
  { label: 'How it Works', sectionId: SECTION_IDS.howItWorks },
  { label: 'FAQ', sectionId: SECTION_IDS.faq },
];

export default function NavLinks() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | null>(
    null,
  );
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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
      { threshold: 0.5 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeSection || !navRef.current) return;

    const idx = NAV_ITEMS.findIndex(({ sectionId }) => sectionId === activeSection);
    const el = itemRefs.current[idx];
    if (!el) return;

    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicatorStyle({ left: elRect.left - navRect.left, width: elRect.width });
  }, [activeSection]);

  return (
    <nav ref={navRef} className="relative hidden h-full gap-4 self-stretch md:flex">
      {NAV_ITEMS.map(({ label, sectionId }, idx) => (
        <a
          key={sectionId}
          ref={(el) => {
            itemRefs.current[idx] = el;
          }}
          href={`${ROUTES.home}#${sectionId}`}
          className={`text-body-lg flex w-26 items-center justify-center transition-colors ${
            activeSection === sectionId
              ? 'font-semibold text-black'
              : 'font-medium text-gray-600 hover:text-gray-900'
          }`}
        >
          {label}
        </a>
      ))}

      {indicatorStyle && (
        <span
          className="absolute bottom-[-1.5px] h-0.5 bg-black transition-all duration-300 ease-in-out"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />
      )}
    </nav>
  );
}
