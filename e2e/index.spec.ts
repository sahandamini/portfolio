import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
	await page.goto('/')
})

test('Basic Navigation', async ({ page }) => {
	await expect(page.locator('h1')).toHaveText('Sahand Amini')

	// Home page
	await expect(page).toHaveScreenshot('home.png', {
		maxDiffPixelRatio: 0.1,
	})

	// Scroll to main details
	await page.getByRole('button').filter({ hasText: /^$/ }).first().click()
	await expect(page).toHaveScreenshot('about-me.png', {
		maxDiffPixelRatio: 0.1,
	})

	// Scroll to bottom
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
	await expect(page).toHaveScreenshot('bottom.png', {
		maxDiffPixelRatio: 0.1,
	})

	// Scroll back to top
	await page.getByRole('button', { name: 'Scroll to top' }).click()
	await expect(page).toHaveScreenshot('home.png', {
		maxDiffPixelRatio: 0.1,
	})
})
