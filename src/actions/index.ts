import { z } from 'astro/zod'
import { ActionError, defineAction } from 'astro:actions'
import { env } from 'cloudflare:workers'
import { Resend } from 'resend'

import { sendContactEmail } from '@/lib/contact/email'
import { rateLimitKey } from '@/lib/contact/rate-limit'

const PER_ADDRESS_LIMIT = { limit: 3, windowMs: 15 * 60 * 1000 }

const GLOBAL_LIMIT = { limit: 100, windowMs: 60 * 60 * 1000 }

export const server = {
	contact: {
		send: defineAction({
			accept: 'form',
			input: z.object({
				email: z.email('Invalid email address').max(254, 'Email is too long'),
				message: z
					.string('Message is required')
					.trim()
					.min(1, 'Message is required')
					.max(5000, 'Message is too long'),
			}),
			handler: async (input, { clientAddress, locals }) => {
				const { RateLimiter } = locals.cfContext.exports

				// The address check runs first, so one sender cannot spend the global
				// budget after its own limit blocks it.
				const allowed =
					(await RateLimiter.getByName(rateLimitKey(clientAddress)).consume(
						PER_ADDRESS_LIMIT.limit,
						PER_ADDRESS_LIMIT.windowMs,
					)) &&
					(await RateLimiter.getByName('global').consume(
						GLOBAL_LIMIT.limit,
						GLOBAL_LIMIT.windowMs,
					))

				if (!allowed) {
					throw new ActionError({
						code: 'TOO_MANY_REQUESTS',
						message:
							'Too many requests. Please try again later, or email sahandaamini@gmail.com.',
					})
				}

				try {
					const resend = new Resend(env.RESEND_API_KEY)

					await sendContactEmail(
						(options) => resend.emails.send(options),
						input,
					)
				} catch (error) {
					console.error('Contact email failed', error)
					throw new ActionError({
						code: 'BAD_GATEWAY',
						message: 'Resend refused the message.',
					})
				}

				return { sent: true }
			},
		}),
	},
}
