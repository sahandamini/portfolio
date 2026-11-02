const IPV6_NETWORK_GROUPS = 4

/**
 * One IPv6 customer usually holds a whole /64, so a full address would let a
 * sender rotate past the limit.
 */
export function rateLimitKey(address: string) {
	if (!address.includes(':')) return `address:${address}`

	const [head = '', tail] = address.split('::')
	const headGroups = head.split(':').filter(Boolean)
	const tailGroups = tail?.split(':').filter(Boolean) ?? []

	const zeroGroups = Array.from(
		{ length: Math.max(0, 8 - headGroups.length - tailGroups.length) },
		() => '0',
	)

	const groups = [...headGroups, ...zeroGroups, ...tailGroups]

	return `network:${groups.slice(0, IPV6_NETWORK_GROUPS).join(':').toLowerCase()}`
}

/** Records a hit unless the window is full. Returns null when the limit blocks it. */
export function recordHit(
	hits: readonly number[],
	now: number,
	limit: number,
	windowMs: number,
): number[] | null {
	const recentHits = hits.filter((hit) => now - hit < windowMs)

	return recentHits.length < limit ? [...recentHits, now] : null
}
