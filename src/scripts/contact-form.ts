import { type ActionError, actions, isInputError } from 'astro:actions'

const form = document.querySelector<HTMLFormElement>('[data-contact-form]')

const status = document.querySelector<HTMLElement>('[data-contact-status]')

const submit = form?.querySelector<HTMLButtonElement>('[type="submit"]')

const submitLabel = form?.querySelector<HTMLElement>(
	'[data-contact-submit-label]',
)

const FALLBACK_ERROR =
	'Your message did not send. Please email sahandaamini@gmail.com instead.'

function showStatus(state: 'success' | 'error', message: string) {
	if (!status) return

	status.dataset.state = state
	status.textContent = message
}

function errorMessage(error: ActionError) {
	if (isInputError(error)) {
		return Object.values(error.fields).flat()[0] ?? FALLBACK_ERROR
	}

	// A 5xx message comes from the platform, not from the action.
	return error.status < 500 && error.message ? error.message : FALLBACK_ERROR
}

form?.addEventListener('submit', async (event) => {
	event.preventDefault()

	if (submit) submit.disabled = true

	if (submitLabel) submitLabel.textContent = 'Sending...'

	try {
		const { error } = await actions.contact.send(new FormData(form))

		if (error) {
			showStatus('error', errorMessage(error))
		} else {
			showStatus('success', 'Message sent successfully!')
			form.reset()
		}
	} catch {
		showStatus('error', FALLBACK_ERROR)
	} finally {
		if (submit) submit.disabled = false

		if (submitLabel) submitLabel.textContent = 'Send'
	}
})
