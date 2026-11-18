const FIX_METHOD_TITLE_PATTERN = /^\s*#{1,6}\s*수정 방법\s*/i;
const NO_FIX_CODE_NOTICE_PATTERN = /\*{0,2}수정 코드를 제공하지 않는 항목입니다\.?\*{0,2}[\s\S]*$/i;
const NUMBERED_LIST_START_PATTERN = /(?:^|\s)(1[.)])\s/;
const SENTENCE_SEPARATOR_PATTERN = /(?<=[.!?])\s+(?=\S)/u;
const BOLD_MARKDOWN_PATTERN = /\*\*(.*?)\*\*/g;

export interface ParsedFixSummary {
  introduction: string;
  steps: string[] | null;
}

export function parseFixSummary(summary: string): ParsedFixSummary {
  const instructions = summary
    .replace(FIX_METHOD_TITLE_PATTERN, '')
    .replace(NO_FIX_CODE_NOTICE_PATTERN, '')
    .trim();

  const listStart = NUMBERED_LIST_START_PATTERN.exec(instructions);

  if (listStart) {
    const marker = listStart[1][1];
    const startIndex = listStart.index + (/^\s/.test(listStart[0]) ? 1 : 0);
    const introduction = instructions.slice(0, startIndex).trim();
    const listText = instructions.slice(startIndex);
    const numberedSteps = listText
      .split(new RegExp(`(?=\\d+\\${marker}\\s)`))
      .map((step) => step.trim())
      .filter(Boolean);
    const expectedPrefix = new RegExp(`^(\\d+)\\${marker}\\s`);
    const stepNumbers = numberedSteps.map((step) => step.match(expectedPrefix)?.[1]);

    if (
      numberedSteps.length >= 2 &&
      stepNumbers.every((number, index) => number === String(index + 1))
    ) {
      const steps = numberedSteps.map((step) =>
        step
          .replace(expectedPrefix, '')
          .replace(/^(\d+)[.)]\s+(?:\*\*\1\*\*\s*)?/, '')
          .replace(BOLD_MARKDOWN_PATTERN, '$1')
          .trim(),
      );

      return { introduction, steps };
    }
  }

  const sentences = instructions
    .split(SENTENCE_SEPARATOR_PATTERN)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  return sentences.length >= 2
    ? { introduction: '', steps: sentences }
    : { introduction: instructions, steps: null };
}
