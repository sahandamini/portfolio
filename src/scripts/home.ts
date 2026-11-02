const headerActions = document.querySelector<HTMLElement>(
	'[data-header-actions]',
)

const heroActions = document.querySelector<HTMLElement>('[data-hero-actions]')

const scrollDown = document.querySelector<HTMLElement>('[data-scroll-down]')

const scrollUp = document.querySelector<HTMLElement>('[data-scroll-up]')

// The 5px tolerance covers fractional scroll positions on zoomed displays.
const BOTTOM_TOLERANCE_PX = 5

function setFlag(element: HTMLElement | null, name: string, enabled: boolean) {
	element?.toggleAttribute(`data-${name}`, enabled)
}

function updateScrollButtons() {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement

	setFlag(scrollDown, 'hidden', scrollTop > 0)
	setFlag(
		scrollUp,
		'hidden',
		scrollTop + clientHeight < scrollHeight - BOTTOM_TOLERANCE_PX,
	)
}

window.addEventListener('scroll', updateScrollButtons, { passive: true })

window.addEventListener('resize', updateScrollButtons)

updateScrollButtons()

scrollDown?.addEventListener('click', () => {
	document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
})

scrollUp?.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
})

if (heroActions) {
	// The negative margin pins the actions just before they reach the top bar.
	new IntersectionObserver(
		([entry]) => {
			const pinned = !entry?.isIntersecting

			setFlag(heroActions, 'pinned', pinned)
			setFlag(headerActions, 'pinned', pinned)
		},
		{ rootMargin: '-72px 0px 0px 0px' },
	).observe(heroActions)
}
