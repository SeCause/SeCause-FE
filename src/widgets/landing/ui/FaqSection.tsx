'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { SECTION_IDS } from '@/shared/config/routes';

const FAQ_ITEMS = [
  {
    question: '분석한 코드는 계속 저장되나요?',
    answer:
      '아니요. 분석이 끝나면 원본 코드는 서버에 보관하지 않으며 분석 결과 데이터만 저장합니다.',
  },
  {
    question: '어떤 언어를 분석할 수 있나요?',
    answer:
      'JavaScript, TypeScript, Python, Java, PHP, Go 등 주요 언어를 지원하며 계속 확장하고 있습니다.',
  },
  {
    question: 'Private Repository도 분석할 수 있나요?',
    answer: '가능합니다. GitHub OAuth로 접근 권한을 받은 저장소만 안전하게 분석합니다.',
  },
  {
    question: '취약점 수정 방법도 알려주나요?',
    answer:
      '발견된 취약점의 코드 맥락을 읽고 원인과 위험도, 실제로 적용할 수 있는 수정 방법을 설명합니다.',
  },
  {
    question: '분석이 완료되기까지 얼마나 걸리나요?',
    answer:
      '저장소의 크기와 사용 언어에 따라 달라질 수 있습니다. 분석 중에는 현재 진행률을 실시간으로 확인할 수 있습니다.',
  },
] as const;

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id={SECTION_IDS.faq}
      className="scroll-mt-header flex min-h-[calc(100svh-var(--spacing-header))] items-center bg-white px-6 py-12 md:h-[calc(100dvh-var(--spacing-header))] md:min-h-160 md:snap-start md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <p className="text-blue mb-5 text-xs font-semibold tracking-[0.16em]">QUESTIONS</p>
          <h2 className="text-[clamp(3rem,6vw,6.8rem)] leading-[0.86] font-semibold tracking-[-0.07em] text-gray-900">
            Good to
            <br />
            know.
          </h2>
          <p className="mt-7 max-w-xs text-sm leading-6 text-gray-600">
            시작하기 전 자주 궁금해하는 내용을 모았습니다.
          </p>
        </div>

        <div className="min-h-118 border-t border-gray-900">
          {FAQ_ITEMS.map((item, index) => (
            <div key={item.question} className="border-b border-gray-900/20">
              <button
                onClick={() => setOpen(open === index ? null : index)}
                aria-expanded={open === index}
                className="flex w-full items-center gap-5 py-6 text-left"
              >
                <span className="text-num-mono font-mono text-gray-400">0{index + 1}</span>
                <span className="flex-1 text-base font-semibold tracking-tight text-gray-900 md:text-lg">
                  {item.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={`h-5 w-5 shrink-0 ${open === index ? 'text-blue rotate-180' : 'text-gray-500'}`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ${open === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-3xl pr-12 pb-7 pl-10 text-sm leading-7 text-gray-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
