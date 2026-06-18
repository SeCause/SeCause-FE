const HAS_TIMEZONE = /(Z|[+-]\d{2}:\d{2})$/;

const KST_FORMATTER = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export function formatAnalysisDate(isoString: string): string {
  // 백엔드가 타임존 정보 없이 UTC 기준 시각을 내려주므로, UTC로 명시한 뒤 KST로 변환한다.
  const utcString = HAS_TIMEZONE.test(isoString) ? isoString : `${isoString}Z`;
  const date = new Date(utcString);
  if (isNaN(date.getTime())) {
    return '-';
  }

  const parts = KST_FORMATTER.formatToParts(date).reduce<Record<string, string>>(
    (acc, part) => ({ ...acc, [part.type]: part.value }),
    {},
  );

  return `${parts.year}.${parts.month}.${parts.day}, ${parts.hour}:${parts.minute}`;
}
