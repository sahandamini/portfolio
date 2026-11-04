const API_HOST = 'us.i.posthog.com'

const ASSET_HOST = 'us-assets.i.posthog.com'

export const POSTHOG_PREFIX = '/ingest/'

/** Same-origin ingestion keeps ad blockers from dropping analytics events. */
export function proxyToPostHog(request: Request) {
	const url = new URL(request.url)
	const path = url.pathname.slice(POSTHOG_PREFIX.length - 1)

	url.protocol = 'https:'
	url.port = ''
	url.hostname = path.startsWith('/static/') ? ASSET_HOST : API_HOST
	url.pathname = path

	const headers = new Headers(request.headers)
	const clientAddress = request.headers.get('cf-connecting-ip')

	headers.delete('cookie')

	if (clientAddress) headers.set('x-forwarded-for', clientAddress)

	return fetch(new Request(url, new Request(request, { headers })))
}
