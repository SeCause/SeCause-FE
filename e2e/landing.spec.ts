import { expect, test } from '@playwright/test';

test('랜딩 페이지가 정상적으로 렌더링된다', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'SeCause' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Turn your code into secure/i })).toBeVisible();
});

test('데스크톱 네비게이션으로 섹션 이동이 가능하다', async ({ page }) => {
  await page.goto('/');

  const nav = page.getByRole('navigation', { name: '데스크톱 네비게이션' });
  await nav.getByRole('link', { name: 'FAQ' }).click();

  await expect(page).toHaveURL(/#faq$/);
});
