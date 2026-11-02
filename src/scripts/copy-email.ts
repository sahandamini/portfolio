const COPIED_RESET_MS = 2000

for (const button of document.querySelectorAll<HTMLButtonElement>(
	'[data-copy-email]',
)) {
	button.addEventListener('click', async () => {
		try {
			await navigator.clipboard.writeText(button.dataset.copyEmail ?? '')
		} catch {
			// The address stays on screen, so a denied copy needs no message.
			return
		}

		button.toggleAttribute('data-copied', true)
		setTimeout(() => button.removeAttribute('data-copied'), COPIED_RESET_MS)
	})
}
