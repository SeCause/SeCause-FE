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

function parseUTCDate(isoString: string): Date | null {
  const utcString = HAS_TIMEZONE.test(isoString) ? isoString : `${isoString}Z`;
  const date = new Date(utcString);

  return isNaN(date.getTime()) ? null : date;
}

function formatKSTDate(date: Date): string {
  const parts = KST_FORMATTER.formatToParts(date).reduce<Record<string, string>>(
    (acc, part) => ({ ...acc, [part.type]: part.value }),
    {},
  );

  return `${parts.year}.${parts.month}.${parts.day}, ${parts.hour}:${parts.minute}`;
}

export function formatAnalysisDate(isoString: string): string {
  const date = parseUTCDate(isoString);
  return date ? formatKSTDate(date) : '-';
}

export function formatRelativeTime(isoString: string): string {
  const date = parseUTCDate(isoString);
  if (!date) return '-';

  const diffSeconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (diffSeconds < 60) return '방금 전';

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}분 전`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}일 전`;

  return formatKSTDate(date);
}
