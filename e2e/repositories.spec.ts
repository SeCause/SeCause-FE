import { expect, type Page, test } from '@playwright/test';

const apiSuccess = (result: unknown) => ({
  isSuccess: true,
  code: 'SUCCESS',
  message: 'success',
  result,
});

const repositories = [
  {
    repositoryId: 101,
    owner: 'SeCause',
    name: 'frontend',
    fullName: 'SeCause/frontend',
    branch: 'main',
    fileCount: 128,
    lineCount: 18420,
    languages: ['TypeScript'],
    issueCounts: { critical: 2, high: 3, medium: 1, low: 0 },
    analysisStatus: 'COMPLETED',
    progressPercent: 100,
    analysisRequestedAt: '2026-08-01T10:00:00Z',
    completedAt: '2026-08-01T10:03:00Z',
  },
  {
    repositoryId: 102,
    owner: 'SeCause',
    name: 'backend',
    fullName: 'SeCause/backend',
    branch: 'develop',
    fileCount: 64,
    lineCount: 9200,
    languages: ['Java'],
    issueCounts: { critical: 0, high: 1, medium: 2, low: 3 },
    analysisStatus: 'COMPLETED',
    progressPercent: 100,
    analysisRequestedAt: '2026-08-02T10:00:00Z',
    completedAt: '2026-08-02T10:02:00Z',
  },
];

async function authenticate(page: Page) {
  await page
    .context()
    .addCookies([
      { name: 'access_token', value: 'e2e-access-token', url: 'http://localhost:3000' },
    ]);
}

test.describe('저장소 분석 결과 사용자 흐름', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
    await page.route('**/api/repositories', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({ json: apiSuccess({ repositories }) });
        return;
      }
      await route.continue();
    });
  });

  test('Given 분석된 저장소가 있을 때 When 검색 후 카드를 선택하면 Then 상세 Overview로 이동한다', async ({
    page,
  }) => {
    // Given
    await page.goto('/mypage');
    await expect(page.getByRole('heading', { name: 'My Repositories' })).toBeVisible();

    // When
    const search = page.getByRole('textbox', { name: '레포지토리 검색' });
    await search.fill('frontend');
    await search.press('Enter');

    // Then
    await expect(page.getByText('SeCause / frontend')).toBeVisible();
    await expect(page.getByText('SeCause / backend')).toBeHidden();

    // When
    await page.getByRole('link', { name: 'SeCause / frontend 분석 결과 보기' }).click();

    // Then
    await expect(page).toHaveURL('/mypage/repositories/101');
    await expect(page.getByRole('button', { name: 'Overview', exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(page.getByRole('heading', { name: 'Project Dashboard' })).toBeVisible();
  });

  test('Given 저장소 상세 화면에서 When Issues 탭을 선택하면 Then 파일별 이슈를 확인할 수 있다', async ({
    page,
  }) => {
    // Given
    await page.goto('/mypage/repositories/101');
    await expect(page.getByRole('button', { name: 'Overview', exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );

    // When
    await page.getByRole('button', { name: 'Issues', exact: true }).click();

    // Then
    await expect(page.getByRole('heading', { name: 'Issues' })).toBeVisible();
    await expect(page.getByRole('button', { name: /src\/utils\/database\.ts/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'View Issue' }).first()).toBeVisible();
  });

  test('Given 잘못된 저장소 ID일 때 When 상세 페이지에 접근하면 Then 404를 표시한다', async ({
    page,
  }) => {
    // When
    const response = await page.goto('/mypage/repositories/not-a-number');

    // Then
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: '페이지를 찾을 수 없습니다.' })).toBeVisible();
  });
});
