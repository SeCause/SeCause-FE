import { expect, test } from '@playwright/test';

test('로그인 페이지에 GitHub 로그인 버튼이 노출된다', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByRole('heading', { name: 'SeCause에 로그인' })).toBeVisible();
  await expect(page.getByRole('button', { name: /github/i })).toBeVisible();
});

test('Given 인증 쿠키가 없을 때 When 보호된 마이페이지에 접근하면 Then 로그인으로 이동한다', async ({
  page,
}) => {
  // Given
  await page.context().clearCookies();

  // When
  await page.goto('/mypage');

  // Then
  await expect(page).toHaveURL('/login');
  await expect(page.getByRole('heading', { name: 'SeCause에 로그인' })).toBeVisible();
});
