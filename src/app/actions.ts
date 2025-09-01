'use server'

import { env } from '@/lib/env'
import { RateLimiter } from '@/lib/rate-limiter'
import { render } from '@react-email/render'
import { headers } from 'next/headers'
import * as React from 'react'
import { Resend } from 'resend'
import { z } from 'zod'
import { ContactEmail } from '../components/ContactEmail'

const resend = new Resend(env.RESEND_API_KEY)
const rateLimiter = new RateLimiter()

const sendEmailSchema = z.object({
	email: z
		.string()
		.email({ message: 'Invalid email address' })
		.nonempty({ message: 'Email is required' }),
	message: z.string().nonempty({ message: 'Message is required' }),
})

export async function sendEmail(formData: FormData) {
	const headerList = await headers()
	const ipAddress =
		headerList.get('x-forwarded-for') ||
		headerList.get('x-real-ip') ||
		'127.0.0.1'

	const result = rateLimiter.consume(ipAddress)

	if (!result.success) {
		return { error: { message: 'Too many requests. Please try again later.' } }
	}

	const parsed = sendEmailSchema.safeParse({
		email: formData.get('email'),
		message: formData.get('message'),
	})

	if (!parsed.success) {
		const firstErrorMessage =
			parsed.error.issues[0]?.message || 'Invalid form data.'
		return { error: { message: firstErrorMessage } }
	}

	const { email, message } = parsed.data

	const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase()
	const subject = `New Contact Form Submission [${randomCode}]`

	try {
		await resend.emails.send({
			from: 'Contact Form <hello@sahandamini.dev>',
			to: 'Sahand Amini <sahandportfolio@gmail.com>',
			subject: subject,
			replyTo: email,
			html: await render(
				React.createElement(ContactEmail, { email, message, randomCode }),
			),
		})
		return { success: true }
	} catch (error) {
		return {
			error: {
				code: 'INTERNAL_SERVER_ERROR',
				message: error instanceof Error ? error.message : 'Unknown error',
				stack: error instanceof Error ? (error.stack ?? '') : '',
			},
		}
	}
}
