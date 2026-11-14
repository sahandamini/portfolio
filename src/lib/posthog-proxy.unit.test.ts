import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { proxyToPostHog } from './posthog-proxy'

const SITE = 'https://sahandamini.com'

const cache = { match: vi.fn(), put: vi.fn() }

const fetchMock = vi.fn<typeof fetch>()

const waitUntil = vi.fn()

const ctx = { waitUntil }

beforeEach(() => {
	cache.match.mockResolvedValue(undefined)
	cache.put.mockResolvedValue(undefined)
	fetchMock.mockImplementation(async () => new Response('ok'))
	vi.stubGlobal('caches', { open: vi.fn().mockResolvedValue(cache) })
	vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
	vi.unstubAllGlobals()
	vi.clearAllMocks()
})

function upstreamRequest() {
	const call = fetchMock.mock.lastCall

	if (!call) throw new Error('The proxy did not call fetch')

	return new Request(...call)
}

describe('proxyToPostHog API requests', () => {
	it('keeps the trailing slash and query string', async () => {
		await proxyToPostHog(new Request(`${SITE}/ingest/e/?ver=1`), ctx)

		expect(upstreamRequest().url).toBe('https://us.i.posthog.com/e/?ver=1')
	})

	it('forwards the method and body', async () => {
		const body = '{"event":"$pageview"}'
		await proxyToPostHog(
			new Request(`${SITE}/ingest/e/`, { method: 'POST', body }),
			ctx,
		)

		const upstream = upstreamRequest()
		expect(upstream.method).toBe('POST')
		expect(await upstream.text()).toBe(body)
	})

	it('removes cookies and sets the visitor address', async () => {
		const headers = { cookie: 'session=1', 'cf-connecting-ip': '203.0.113.9' }
		await proxyToPostHog(new Request(`${SITE}/ingest/e/`, { headers }), ctx)

		const upstream = upstreamRequest()
		expect(upstream.headers.has('cookie')).toBe(false)
		expect(upstream.headers.get('x-forwarded-for')).toBe('203.0.113.9')
	})

	it('keeps a PostHog token in the authorization header', async () => {
		const headers = { authorization: 'Bearer phc_token' }
		await proxyToPostHog(
			new Request(`${SITE}/ingest/i/v0/e/`, { headers }),
			ctx,
		)

		expect(upstreamRequest().headers.get('authorization')).toBe(
			'Bearer phc_token',
		)
	})

	it('removes other credentials from the authorization header', async () => {
		const headers = { authorization: 'Basic dXNlcjpwYXNz' }
		await proxyToPostHog(new Request(`${SITE}/ingest/e/`, { headers }), ctx)

		expect(upstreamRequest().headers.has('authorization')).toBe(false)
	})

	it('does not use the cache', async () => {
		await proxyToPostHog(new Request(`${SITE}/ingest/flags/?v=2`), ctx)

		expect(cache.match).not.toHaveBeenCalled()
	})
})

describe('proxyToPostHog asset requests', () => {
	it.each(['/static/array.js', '/array/phc_token/config.js'])(
		'sends %s to the asset host',
		async (path) => {
			await proxyToPostHog(new Request(`${SITE}/ingest${path}`), ctx)

			expect(upstreamRequest().url).toBe(
				`https://us-assets.i.posthog.com${path}`,
			)
		},
	)

	it('returns a cached asset without a fetch', async () => {
		cache.match.mockResolvedValue(new Response('cached'))

		const response = await proxyToPostHog(
			new Request(`${SITE}/ingest/static/array.js`),
			ctx,
		)

		expect(await response.text()).toBe('cached')
		expect(fetchMock).not.toHaveBeenCalled()
	})

	it('caches a successful asset response', async () => {
		const request = new Request(`${SITE}/ingest/static/array.js`)
		const response = await proxyToPostHog(request, ctx)

		expect(await response.text()).toBe('ok')
		expect(cache.put).toHaveBeenCalledWith(request, expect.any(Response))
		expect(waitUntil).toHaveBeenCalledOnce()
	})

	it('does not cache a failed asset response', async () => {
		fetchMock.mockResolvedValue(new Response('missing', { status: 404 }))

		await proxyToPostHog(new Request(`${SITE}/ingest/static/none.js`), ctx)

		expect(cache.put).not.toHaveBeenCalled()
	})
})
