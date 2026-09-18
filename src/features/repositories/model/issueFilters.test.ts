import { describe, expect, it } from 'vitest';

import { filterIssueFiles } from './issueFilters';
import type { RepositoryIssueFile } from './types';

const files: RepositoryIssueFile[] = [
  { filePath: 'src/auth/Login.tsx', issueCount: 2 },
  { filePath: 'src/api/users.ts', issueCount: 1 },
];

describe('issueFilters', () => {
  it('파일 경로를 대소문자 구분 없이 검색한다', () => {
    expect(filterIssueFiles(files, 'LOGIN')).toEqual([files[0]]);
  });
});
