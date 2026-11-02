import type { CreateEmailOptions, ErrorResponse } from 'resend'

const FROM = 'Contact Form <hello@sahandamini.dev>'

const TO = 'Sahand Amini <sahandportfolio@gmail.com>'

const BCC = 'sahandaamini@gmail.com'

interface ContactMessage {
	email: string
	message: string
}

type SendEmail = (
	options: CreateEmailOptions,
) => Promise<{ error: ErrorResponse | null }>

export class ContactEmailError extends Error {
	override name = 'ContactEmailError'
}

function escapeHtml(text: string) {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;')
}

export function renderContactEmail(
	{ email, message }: ContactMessage,
	code: string,
) {
	return `<div style="font-family: sans-serif; line-height: 1.6; color: #333">
	<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #f9f9f9">
		<h1 style="font-size: 24px; color: #007bff; margin-bottom: 20px">New Contact Form Submission [${code}]</h1>
		<div style="margin-bottom: 20px">
			<p><strong>From:</strong> ${escapeHtml(email)}</p>
			<p><strong>Message:</strong></p>
			<p style="white-space: pre-wrap">${escapeHtml(message)}</p>
		</div>
		<div style="font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px; margin-top: 20px">
			<p>This email was sent from your portfolio contact form.</p>
		</div>
	</div>
</div>`
}

/**
 * `emails.send()` reports API and network failures in its returned `error` and
 * does not throw. A form that ignores this value reports success for lost mail.
 */
export async function sendContactEmail(
	send: SendEmail,
	contact: ContactMessage,
) {
	const code = crypto.randomUUID().slice(0, 6).toUpperCase()

	const { error } = await send({
		from: FROM,
		to: TO,
		bcc: BCC,
		subject: `New Contact Form Submission [${code}]`,
		replyTo: contact.email,
		html: renderContactEmail(contact, code),
		text: `From: ${contact.email}\n\n${contact.message}`,
	})

	if (error) throw new ContactEmailError(`${error.name}: ${error.message}`)
}
