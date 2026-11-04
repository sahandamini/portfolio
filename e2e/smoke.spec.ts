import { expect, type Page, test } from '@playwright/test'

const ACTION_PATH = '**/_actions/contact.send*'

test('home page renders its primary content', async ({ page }) => {
	await page.goto('/')
	await expect(
		page.getByRole('heading', { level: 1, name: 'Sahand Amini' }),
	).toBeVisible()
	await expect(page.getByText('Full Stack Engineer')).toBeVisible()
	await expect(page.getByRole('heading', { name: 'About Me' })).toBeAttached()
	await expect(page.getByText('JPMorgan Chase')).toBeAttached()
})

test('scroll buttons move between the hero and the bottom', async ({
	page,
}) => {
	await page.goto('/')
	await page.getByRole('button', { name: 'Scroll to about' }).click()
	await expect(page.getByRole('heading', { name: 'About Me' })).toBeInViewport()

	await page.evaluate(() => {
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })
	})
	await page.getByRole('button', { name: 'Scroll to top' }).click()
	await expect(
		page.getByRole('heading', { level: 1, name: 'Sahand Amini' }),
	).toBeInViewport()
})

test('theme choice survives a reload', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'light' })
	await page.goto('/')
	const darkTheme = page.getByRole('button', { name: 'Dark theme' })

	await darkTheme.click()
	await expect(page.locator('html')).toHaveClass(/dark/)
	await expect(darkTheme).toHaveAttribute('aria-pressed', 'true')

	await page.reload()
	await expect(page.locator('html')).toHaveClass(/dark/)
	await expect(darkTheme).toHaveAttribute('aria-pressed', 'true')
})

test('resume downloads as a PDF', async ({ request }) => {
	const response = await request.get('/resume.pdf')

	expect(response.status()).toBe(200)
	expect(response.headers()['content-type']).toContain('application/pdf')
})

test('a missing page returns the site 404 page', async ({ page }) => {
	const response = await page.goto('/this-page-does-not-exist')

	expect(response?.status()).toBe(404)
})

async function fillContactForm(page: Page) {
	await page.goto('/contact')
	await page.getByRole('textbox', { name: 'Email' }).fill('visitor@example.com')
	await page
		.getByRole('textbox', { name: 'Message' })
		.fill('Hello from Playwright')
	await page.getByRole('button', { name: 'Send' }).click()
}

// These tests stub the action, so they send no real email.
test('contact form confirms a sent message', async ({ page }) => {
	await page.route(ACTION_PATH, (route) =>
		route.fulfill({
			status: 200,
			contentType: 'application/json+devalue',
			body: '[{"sent":1},true]',
		}),
	)
	await fillContactForm(page)

	await expect(page.getByRole('status')).toHaveText(
		'Message sent successfully!',
	)
	await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('')
})

test('contact form reports a failed send and keeps the message', async ({
	page,
}) => {
	await page.route(ACTION_PATH, (route) =>
		route.fulfill({
			status: 502,
			contentType: 'application/json',
			body: JSON.stringify({
				type: 'AstroActionError',
				code: 'BAD_GATEWAY',
				status: 502,
				message: 'Resend refused the message.',
			}),
		}),
	)
	await fillContactForm(page)

	await expect(page.getByRole('status')).toHaveText(
		'Your message did not send. Please email sahandaamini@gmail.com instead.',
	)
	await expect(page.getByRole('textbox', { name: 'Message' })).toHaveValue(
		'Hello from Playwright',
	)
})
