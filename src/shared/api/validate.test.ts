import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { parseApiResult } from './validate';

const userSchema = z.object({
  userId: z.number(),
  name: z.string(),
});

describe('parseApiResult', () => {
  it('Given 스키마와 일치하는 응답이 주어졌을 때 When 파싱하면 Then 그대로 반환한다', () => {
    // Given
    const data = { userId: 1, name: '홍길동' };

    // When
    const result = parseApiResult(userSchema, data);

    // Then
    expect(result).toEqual(data);
  });

  it('Given 필드가 누락된 응답이 주어졌을 때 When 파싱하면 Then 에러를 던지고 콘솔에 상세를 남긴다', () => {
    // Given
    const data = { userId: 1 };
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // When & Then
    expect(() => parseApiResult(userSchema, data)).toThrow('서버 응답 형식이 올바르지 않습니다.');
    expect(consoleErrorSpy).toHaveBeenCalledOnce();

    consoleErrorSpy.mockRestore();
  });

  it('Given 타입이 다른 필드가 주어졌을 때 When 파싱하면 Then 에러를 던진다', () => {
    // Given
    const data = { userId: '1', name: '홍길동' };
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // When & Then
    expect(() => parseApiResult(userSchema, data)).toThrow();
  });
});
