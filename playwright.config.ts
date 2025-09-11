import { loadEnvConfig } from '@next/env'
import { defineConfig, devices } from '@playwright/test'

loadEnvConfig(process.cwd(), true)

const devUrl = `http://localhost:3000`
const useDevServer =
	(!process.env.CI && !process.env.BASE_URL) || process.env.BASE_URL == devUrl
const baseUrl = useDevServer ? devUrl : process.env.BASE_URL

const testDir = './e2e'

/** See https://playwright.dev/docs/test-configuration. */
export default defineConfig({
	testDir: testDir,
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 3 : 0,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [['html', { open: 'on-failure' }]],

	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: baseUrl,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},

	/* Run your local dev server when running tests locally */
	...(useDevServer
		? {
				webServer: {
					command: 'pnpm dev',
					url: devUrl,
					reuseExistingServer: true,
				},
			}
		: {}),

	expect: {
		toHaveScreenshot: {
			stylePath: `${testDir}/screenshot.css`,
		},
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
		/* Test against mobile viewports. */
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] },
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] },
		},
	],
})
