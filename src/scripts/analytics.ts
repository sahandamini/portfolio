// Previews and local runs stay out of the production analytics.
if (window.location.hostname === new URL(import.meta.env.SITE).hostname) {
	const { default: posthog } = await import('posthog-js')

	// This key only captures events, so it is safe in client code.
	posthog.init('phc_eqMREwVjHvwUWr4365AAIEP6KGSCpQykVBGYwTpUbNn', {
		api_host: '/ingest',
		ui_host: 'https://us.posthog.com',
		defaults: '2025-05-24',
		capture_exceptions: true,
	})
}
