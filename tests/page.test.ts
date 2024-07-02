import { expect, test } from '@playwright/test';

test('third menu item must not have class activ', async ({ page }) => {
	await page.goto('/');
	const a = page.locator('nav li:nth-child(3) a');
	await expect(a).not.toHaveClass(/activ/);
});

test('if go to third menu item, it must have class activ', async ({ page }) => {
	await page.goto('/');
	const a = page.locator('nav li:nth-child(3) a');
	await a.click();
	await expect(a).toHaveClass(/activ/);
});

test('if not scrolled, button must not have class scrolled', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('button.scroll')).not.toHaveClass(/scrolled/);
});

test('if scrolled, button must have class scrolled', async ({ page }) => {
	await page.goto('/');
	await page.mouse.wheel(0, 10);
	await expect(page.locator('button.scroll')).toHaveClass(/scrolled/);
});

test('if window top and button scroll clicked, window must scroll down', async ({ page }) => {
	await page.goto('/');
	await page.locator('button.scroll').click();
	await expect(page.locator('button.scroll')).toHaveClass(/scrolled/);
});

test('if window scrolled and button scroll clicked, window must scroll top', async ({ page }) => {
	await page.goto('/');
	await page.mouse.wheel(0, 10);
	await page.locator('button.scroll').click();
	await expect(page.locator('button.scroll')).not.toHaveClass(/scrolled/);
});

test('if to-be-contacted clicked, modal must be visible', async ({ page }) => {
	await page.goto('/');
	await page.locator('button.to-be-contacted').click();
	await expect(page.locator('#comp-contact')).toBeVisible();
});

test('if modal visible and esc key pressed, modal must be hidden', async ({ page }) => {
	await page.goto('/');
	await page.locator('button.to-be-contacted').click();
	await page.keyboard.press('Escape');
	await expect(page.locator('#comp-contact')).not.toBeVisible();
});
