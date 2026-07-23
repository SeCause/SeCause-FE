'use client';

import Image from 'next/image';
import { useState } from 'react';

import ArrowIcon from '@/icons/icon_arrow.svg';
import { SECTION_IDS } from '@/shared/config/routes';

const FAQ_ITEMS = [
  {
    question: '코드는 서버에 계속 저장되나요?',
    answer: '분석 완료 후 원본 코드는 서버에 보관되지 않습니다. 분석 결과 데이터만 저장됩니다.',
  },
  {
    question: '어떤 프로그래밍 언어를 지원하나요?',
    answer:
      'JavaScript, TypeScript, Python, Java, PHP, Go 등 주요 언어를 지원하며, 지속적으로 확장하고 있습니다.',
  },
  {
    question: '분석 결과의 정확도는 어느 정도인가요?',
    answer: 'OWASP Top 10 기반의 정적 분석과 AI 모델을 결합하여 높은 정확도를 제공합니다.',
  },
  {
    question: 'Private Repository도 분석할 수 있나요?',
    answer:
      'GitHub OAuth 인증을 통해 Private Repository에 대한 접근 권한을 부여하면 분석이 가능합니다.',
  },
  {
    question: 'AI 설명 기능은 어떻게 동작하나요?',
    answer:
      '탐지된 취약점의 코드 컨텍스트를 AI가 분석하여 원인, 위험도, 수정 방법을 자연어로 설명해드립니다.',
  },
] as const;

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id={SECTION_IDS.faq}
      className="scroll-mt-header flex h-[calc(100dvh-var(--spacing-header))] snap-start items-center px-6 md:px-20"
    >
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="text-heading-lg mb-10 text-center">Frequently asked questions</h2>

        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={item.question}
              className="w-full overflow-hidden rounded-2xl bg-white/60 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between px-6 py-4"
                aria-expanded={openIdx === idx}
              >
                <span className="text-label-lg max-sm:text-body-sm text-left text-gray-900">
                  {item.question}
                </span>
                <span
                  className={`icon-gray ml-4 shrink-0 ${openIdx === idx ? 'rotate-0' : 'rotate-180'}`}
                >
                  <Image src={ArrowIcon} alt="" aria-hidden="true" width={18} height={18} />
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openIdx === idx ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-gray-100 px-6 py-4 text-left">
                    <p className="text-body-md max-sm:text-body-sm text-gray-600">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
