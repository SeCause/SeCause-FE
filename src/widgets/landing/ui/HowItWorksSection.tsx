'use client';

import { useState } from 'react';

import { SECTION_IDS } from '@/shared/config/routes';

const TABS = ['Analysis Request', 'Repo Overview', 'Issue Detail'] as const;

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="scroll-mt-header flex h-[calc(100dvh-var(--spacing-header))] items-center px-6 md:px-20"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <h2 className="text-heading-lg text-center">How it works</h2>

        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <div className="flex flex-row gap-2 md:flex-col md:gap-3">
            {TABS.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                className={`text-label-md rounded-xl border px-4 py-2.5 text-left transition-all max-sm:text-center md:w-40 ${
                  activeTab === idx
                    ? 'border-blue text-blue bg-blue/5'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="min-h-64 flex-1 rounded-2xl bg-white md:min-h-120" />
        </div>
      </div>
    </section>
  );
}
