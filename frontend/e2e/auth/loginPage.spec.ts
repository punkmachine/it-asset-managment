import { test, expect } from '@playwright/test';

test('Отрисовка страницы /login', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  await expect(page).toHaveTitle(/Vite App/);
});

test('Ввод валидных данных и переход на главную', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  await page.getByTestId('login').getByLabel("Логин").fill('login');
  await page.getByTestId('password').getByLabel("Пароль").fill('1234');

  await page.getByTestId('btn-auth').click();

  await page.waitForTimeout(100);

  expect(page.url()).toBe('http://localhost:5173/');
});
