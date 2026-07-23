import { expect, test } from '@playwright/test';

test('로그인 페이지에 GitHub 로그인 버튼이 노출된다', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByRole('heading', { name: 'SeCause에 로그인' })).toBeVisible();
  await expect(page.getByRole('button', { name: /github/i })).toBeVisible();
});
