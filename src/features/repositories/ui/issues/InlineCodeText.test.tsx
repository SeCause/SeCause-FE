import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import InlineCodeText from './InlineCodeText';

describe('InlineCodeText', () => {
  it('formats escaped inline-code delimiters without styling surrounding prose', () => {
    const text = String.raw`"\`NOTIFICATION_TYPES\` 배열에서 순회된 \`type\` 값이 템플릿 리터럴(\`\\\\\`${'${type}'} 파싱 오류:\\\\\`\`)을 통해 \`console.error\`의 첫 번째 인자에 직접 삽입됩니다. \`type\`이 외부 입력(예: 서버에서 수신한 SSE 이벤트 타입 또는 런타임에 조작 가능한 값)으로부터 유래하거나 제어될 경우, 공격자가 포맷 지시자(\`%s\`, \`%d\`, \`%o\` 등) 또는 개행 문자를 포함한 값을 주입하여 로그 메시지를 위조할 수 있습니다(CWE-134, CWE-117)."`;

    const { container } = render(
      <p>
        <InlineCodeText text={text} />
      </p>,
    );
    const code = [...container.querySelectorAll('code')].map((element) => element.textContent);
    const tick = String.fromCharCode(96);

    expect(code).toEqual([
      'NOTIFICATION_TYPES',
      'type',
      `${tick}${'${type} 파싱 오류:'}${tick}`,
      'console.error',
      'type',
      '%s',
      '%d',
      '%o',
    ]);
    expect(screen.getByText(/배열에서 순회된/).closest('code')).toBeNull();
    expect(screen.getByText(/값이 템플릿 리터럴/).closest('code')).toBeNull();
  });

  it('handles the issue description with an escaped closing delimiter', () => {
    const tick = '`';
    const slash = '\\';
    const text = [
      '"',
      '`NOTIFICATION_TYPES` 배열에서 순회된 `type` 값이 템플릿 리터럴(',
      tick,
      `${slash}${tick}`,
      '${type} 파싱 오류:',
      `${slash.repeat(3)}${tick}`,
      tick,
      ')을 통해 `console.error`의 첫 번째 인자에 직접 삽입됩니다. ',
      '`type`이 외부 입력(예: 서버에서 수신한 SSE 이벤트 타입 또는 런타임에 조작 가능한 값)으로부터 유래하거나 제어될 경우, ',
      '공격자가 포맷 지시자(`%s`, `%d`, `%o',
      `${slash}${tick}`,
      ' 등) 또는 개행 문자를 포함한 값을 주입하여 로그 메시지를 위조할 수 있습니다(CWE-134, CWE-117).',
      '"',
    ].join('');

    const { container } = render(
      <p>
        <InlineCodeText text={text} />
      </p>,
    );
    const code = [...container.querySelectorAll('code')].map((element) => element.textContent);

    expect(code).toEqual([
      'NOTIFICATION_TYPES',
      'type',
      `${tick}${'${type} 파싱 오류:'}${tick}`,
      'console.error',
      'type',
      '%s',
      '%d',
      '%o',
    ]);
    expect(screen.getByText(/템플릿 리터럴/).closest('code')).toBeNull();
    expect(screen.getByText(/등\) 또는 개행/).closest('code')).toBeNull();
  });

  it('still formats ordinary Markdown inline-code delimiters', () => {
    const { container } = render(
      <p>
        <InlineCodeText text="Use `console.error` with a constant format string." />
      </p>,
    );

    expect(container.querySelector('code')?.textContent).toBe('console.error');
    expect(screen.getByText(/with a constant format string/).closest('code')).toBeNull();
  });
});
