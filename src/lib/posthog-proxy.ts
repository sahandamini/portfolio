// Follows the PostHog Cloudflare Workers proxy.
// https://posthog.com/docs/advanced/proxy/cloudflare
const API_HOST = 'us.i.posthog.com'

const ASSET_HOST = 'us-assets.i.posthog.com'

const ASSET_PATHS = ['/static/', '/array/']

const ASSET_CACHE = 'posthog-assets'

// Capture v1 SDKs send the project token as `Authorization: Bearer phc_...`.
const POSTHOG_AUTHORIZATION = /^Bearer ph[csx]_/

export const POSTHOG_PREFIX = '/ingest/'

/** Same-origin ingestion keeps ad blockers from dropping analytics events. */
export function proxyToPostHog(
	request: Request,
	ctx: Pick<ExecutionContext, 'waitUntil'>,
) {
	const url = new URL(request.url)
	const path = url.pathname.slice(POSTHOG_PREFIX.length - 1)
	const isAsset = ASSET_PATHS.some((prefix) => path.startsWith(prefix))

	url.protocol = 'https:'
	url.port = ''
	url.hostname = isAsset ? ASSET_HOST : API_HOST
	url.pathname = path

	return isAsset && request.method === 'GET'
		? fetchAsset(request, url, ctx)
		: forwardToApi(request, url)
}

async function fetchAsset(
	request: Request,
	url: URL,
	ctx: Pick<ExecutionContext, 'waitUntil'>,
) {
	const cache = await caches.open(ASSET_CACHE)
	const cached = await cache.match(request)

	if (cached) return cached

	const response = await fetch(url)

	if (response.ok) ctx.waitUntil(cache.put(request, response.clone()))

	return response
}

function forwardToApi(request: Request, url: URL) {
	const headers = new Headers(request.headers)

	headers.delete('cookie')

	if (!POSTHOG_AUTHORIZATION.test(headers.get('authorization') ?? '')) {
		headers.delete('authorization')
	}

	// PostHog reads the visitor location from this header. Without it, events
	// show the Cloudflare data center location.
	const clientAddress = request.headers.get('cf-connecting-ip')

	if (clientAddress) headers.set('x-forwarded-for', clientAddress)

	return fetch(new Request(url, new Request(request, { headers })))
}
