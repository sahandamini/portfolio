import { describe, expect, it, vi } from 'vite-plus/test'

import {
	ContactEmailError,
	renderContactEmail,
	sendContactEmail,
} from './email'

const contact = { email: 'visitor@example.com', message: 'Hello' }

describe('sendContactEmail', () => {
	it('sends to the inbox with the visitor as the reply address', async () => {
		const send = vi.fn().mockResolvedValue({ error: null })

		await sendContactEmail(send, contact)

		expect(send).toHaveBeenCalledWith(
			expect.objectContaining({
				from: 'Contact Form <hello@sahandamini.dev>',
				to: 'Sahand Amini <sahandportfolio@gmail.com>',
				replyTo: contact.email,
			}),
		)
	})

	it('rejects when Resend returns an error value', async () => {
		const send = vi.fn().mockResolvedValue({
			error: { name: 'validation_error', message: 'Domain not verified' },
		})

		await expect(sendContactEmail(send, contact)).rejects.toThrow(
			ContactEmailError,
		)
	})
})

describe('renderContactEmail', () => {
	it('escapes visitor input', () => {
		const html = renderContactEmail(
			{ email: 'a@b.co', message: '<img src=x onerror="alert(1)">' },
			'ABC123',
		)

		expect(html).not.toContain('<img')
		expect(html).toContain('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;')
	})
})
