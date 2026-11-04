import { describe, expect, it } from 'vite-plus/test'

import { rateLimitKey, recordHit } from './rate-limit'

describe('recordHit', () => {
	it('allows hits up to the limit', () => {
		expect(recordHit([1, 2], 3, 3, 100)).toEqual([1, 2, 3])
	})

	it('blocks a hit over the limit', () => {
		expect(recordHit([1, 2, 3], 4, 3, 100)).toBeNull()
	})

	it('forgets hits outside the window', () => {
		expect(recordHit([1, 2, 3], 101, 3, 100)).toEqual([2, 3, 101])
	})
})

describe('rateLimitKey', () => {
	it('keeps a full IPv4 address', () => {
		expect(rateLimitKey('203.0.113.9')).toBe('address:203.0.113.9')
	})

	it('groups IPv6 addresses in one /64', () => {
		const first = rateLimitKey('2001:DB8:1:2:aaaa:bbbb:cccc:dddd')
		const second = rateLimitKey('2001:db8:1:2::1')

		expect(first).toBe('network:2001:db8:1:2')
		expect(second).toBe(first)
	})

	it('keeps IPv6 addresses in different /64 networks apart', () => {
		expect(rateLimitKey('2001:db8::1')).toBe('network:2001:db8:0:0')
		expect(rateLimitKey('2001:db8:0:1::1')).not.toBe(
			rateLimitKey('2001:db8::1'),
		)
	})
})
