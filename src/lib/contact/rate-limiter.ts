import { DurableObject } from 'cloudflare:workers'

import { recordHit } from './rate-limit'

const HITS_KEY = 'hits'

// Isolate memory is not shared between requests on Workers. A Durable Object
// gives each key one consistent counter.
export class RateLimiter extends DurableObject {
	consume(limit: number, windowMs: number): boolean {
		const now = Date.now()
		const { kv } = this.ctx.storage

		const hits = recordHit(
			kv.get<number[]>(HITS_KEY) ?? [],
			now,
			limit,
			windowMs,
		)

		if (!hits) return false

		kv.put(HITS_KEY, hits)
		void this.ctx.storage.setAlarm(now + windowMs)

		return true
	}

	// The last hit has expired, so this key holds nothing worth keeping.
	override async alarm() {
		await this.ctx.storage.deleteAll()
	}
}
