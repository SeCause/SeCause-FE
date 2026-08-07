import { describe, expect, it } from 'vitest';

import {
  getMockRepositoryIssueDetail,
  getMockRepositoryIssueFiles,
  getMockRepositoryIssues,
} from './mockRepositoryData';

describe('저장소 보안 이슈 fixture', () => {
  it('Given 전체 이슈가 있을 때 When 심각도와 파일로 필터링하면 Then 조건에 맞는 결과만 반환한다', () => {
    // Given
    const criticalFiles = getMockRepositoryIssueFiles('CRITICAL');
    const targetFile = criticalFiles[0];

    // When
    const result = getMockRepositoryIssues({
      severity: 'CRITICAL',
      filePath: targetFile.filePath,
      page: 1,
      size: 5,
    });

    // Then
    expect(result.content).not.toHaveLength(0);
    expect(result.content).toHaveLength(Math.min(result.totalElements, 5));
    expect(result.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ severity: 'CRITICAL', filePath: targetFile.filePath }),
      ]),
    );
    expect(result.content.every((issue) => issue.severity === 'CRITICAL')).toBe(true);
    expect(result.content.every((issue) => issue.filePath === targetFile.filePath)).toBe(true);
  });

  it('Given 페이지 크기가 5일 때 When 두 번째 페이지를 요청하면 Then 페이지 메타데이터와 항목이 일치한다', () => {
    // Given
    const firstPage = getMockRepositoryIssues({ page: 1, size: 5 });

    // When
    const secondPage = getMockRepositoryIssues({ page: 2, size: 5 });

    // Then
    expect(secondPage.page).toBe(2);
    expect(secondPage.size).toBe(5);
    expect(secondPage.hasNext).toBe(true);
    expect(secondPage.content[0].analysisResultId).toBe(firstPage.content[4].analysisResultId + 1);
  });

  it('Given 존재하지 않는 상세 ID일 때 When 상세를 조회하면 Then 안전한 기본 상세를 반환한다', () => {
    // When
    const detail = getMockRepositoryIssueDetail(9999);

    // Then
    expect(detail.analysisResultId).toBe(1);
    expect(detail.codeSnippet).not.toBe('');
    expect(detail.fixCode).not.toBe('');
    expect(detail.references).toHaveLength(2);
  });
});
