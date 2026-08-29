import { describe, expect, it } from 'vitest';

import { resolveActiveAccount } from './activeAccount';
import type { GithubAccount } from './types';

const accounts: GithubAccount[] = [
  { name: 'secause', type: 'PERSONAL' },
  { name: 'other-org', type: 'ORGANIZATION' },
];

describe('resolveActiveAccount', () => {
  it('요청한 계정이 목록에 있으면 그대로 쓴다', () => {
    expect(resolveActiveAccount(accounts, 'other-org')).toBe('other-org');
  });

  it('요청한 계정이 목록에 없으면 첫 번째 계정으로 대체한다', () => {
    expect(resolveActiveAccount(accounts, 'unknown')).toBe('secause');
  });

  it('요청한 계정이 없으면 첫 번째 계정을 쓴다', () => {
    expect(resolveActiveAccount(accounts, null)).toBe('secause');
  });

  it('계정이 하나도 없으면 null이다', () => {
    expect(resolveActiveAccount([], 'secause')).toBeNull();
  });
});
