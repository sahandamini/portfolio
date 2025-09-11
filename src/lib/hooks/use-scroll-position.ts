import { useEffect, useState } from 'react'

export function useScrollPosition() {
	const [scrollPosition, setScrollPosition] = useState({
		isAtTop: true,
		isAtBottom: false,
		hasScrolled: false,
	})

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement
			const atTop = scrollTop === 0
			const atBottom = scrollTop + clientHeight >= scrollHeight - 5 // Added tolerance
			const scrolled = scrollTop > 0

			setScrollPosition({
				isAtTop: atTop,
				isAtBottom: atBottom,
				hasScrolled: scrolled,
			})
		}

		window.addEventListener('scroll', handleScroll)
		window.addEventListener('resize', handleScroll) // Added resize listener
		handleScroll() // Initial check

		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', handleScroll) // Cleanup resize listener
		}
	}, [])

	return scrollPosition
}
