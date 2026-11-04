// Previews and local runs stay out of the production analytics.
if (window.location.hostname === new URL(import.meta.env.SITE).hostname) {
	const { default: posthog } = await import('posthog-js')

	// This key only captures events, so it is safe in client code.
	posthog.init('phc_eqMREwVjHvwUWr4365AAIEP6KGSCpQykVBGYwTpUbNn', {
		api_host: '/ingest',
		ui_host: 'https://us.posthog.com',
		defaults: '2026-08-30',
		capture_exceptions: true,
		// The project test account filter drops events from these browsers.
		loaded: (instance) => {
			if (new URLSearchParams(window.location.search).has('internal')) {
				instance.setInternalOrTestUser()
			}
		},
	})
}
