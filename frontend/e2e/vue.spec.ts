import { test, expect } from '@playwright/test';

/**
 * @see: https://playwright.dev/docs/intro
 */
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('div.greetings > h1')).toHaveText('You did it!');
})
