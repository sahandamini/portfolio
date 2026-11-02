import { handle } from '@astrojs/cloudflare/handler'

import { POSTHOG_PREFIX, proxyToPostHog } from '@/lib/posthog-proxy'

export default {
	fetch(request, env, ctx) {
		// PostHog needs trailing slashes, and Astro removes them. This path must
		// stay outside the Astro handler.
		if (new URL(request.url).pathname.startsWith(POSTHOG_PREFIX)) {
			return proxyToPostHog(request)
		}

		return handle(request, env, ctx)
	},
} satisfies ExportedHandler<Env>
