import type { ZodType } from 'zod';

/**
 * 백엔드 응답을 zod 스키마로 런타임 검증한다.
 * 모든 API 응답에 붙이지는 않는다 — 적용 기준은 docs/validation.md 참고.
 */
export function parseApiResult<T>(schema: ZodType<T>, data: unknown): T {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    console.error('[api] response validation failed', parsed.error.flatten());
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  return parsed.data;
}
