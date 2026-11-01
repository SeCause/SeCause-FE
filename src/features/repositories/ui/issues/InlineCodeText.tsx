interface Props {
  text: string;
}

export default function InlineCodeText({ text }: Props) {
  const parts: { value: string; isCode: boolean }[] = [];
  const slashCounts = new Map<number, number>();

  for (let index = 0; index < text.length; index += 1) {
    if (text[index] !== '`') continue;

    let precedingSlashes = 0;
    for (let previous = index - 1; previous >= 0 && text[previous] === '\\'; previous -= 1) {
      precedingSlashes += 1;
    }
    slashCounts.set(precedingSlashes, (slashCounts.get(precedingSlashes) ?? 0) + 1);
  }

  const delimiterSlashCount =
    slashCounts.get(0)! >= 2
      ? 0
      : [...slashCounts.entries()]
          .filter(([count, occurrences]) => count > 0 && occurrences >= 2)
          .sort(([left], [right]) => left - right)[0]?.[0];

  if (delimiterSlashCount === undefined) return text;

  let plainStart = 0;
  let codeStart = -1;
  let codeDelimiterStart = -1;

  for (let index = 0; index < text.length; index += 1) {
    if (text[index] !== '`') continue;

    let precedingSlashes = 0;
    for (let previous = index - 1; previous >= 0 && text[previous] === '\\'; previous -= 1) {
      precedingSlashes += 1;
    }
    // Use the delimiter style found in this string. Other escaped backticks belong
    // to code samples such as JavaScript template literals. Some API text escapes
    // only a closing delimiter, so recognize that at a word boundary as well.
    const nextCharacter = text[index + 1] ?? '';
    const isPrimaryDelimiter = precedingSlashes === delimiterSlashCount;
    const isEscapedBoundary =
      precedingSlashes === 1 &&
      (codeStart === -1
        ? Boolean(nextCharacter) && !/\s/.test(nextCharacter)
        : !nextCharacter || /[\s),.;:!?]/.test(nextCharacter));
    if (!isPrimaryDelimiter && !isEscapedBoundary) continue;
    const delimiterStart = index - precedingSlashes;

    if (codeStart === -1) {
      codeStart = index;
      codeDelimiterStart = delimiterStart;
      continue;
    }

    if (codeDelimiterStart > plainStart) {
      parts.push({ value: text.slice(plainStart, codeDelimiterStart), isCode: false });
    }
    parts.push({
      value: text.slice(codeStart + 1, delimiterStart).replace(/\\+`/g, '`'),
      isCode: true,
    });
    plainStart = index + 1;
    codeStart = -1;
    codeDelimiterStart = -1;
  }

  if (codeStart === -1) {
    if (plainStart < text.length || parts.length === 0) {
      parts.push({ value: text.slice(plainStart), isCode: false });
    }
  } else {
    parts.push({ value: text.slice(plainStart), isCode: false });
  }

  return parts.map((part, index) =>
    part.isCode ? (
      <code
        key={`${index}-${part.value}`}
        className="bg-surface-subtle rounded px-1 py-0.5 font-mono text-[0.9em] wrap-anywhere"
      >
        {part.value}
      </code>
    ) : (
      <span key={`${index}-${part.value}`}>{part.value}</span>
    ),
  );
}
