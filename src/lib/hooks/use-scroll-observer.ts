'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollObserver<T extends HTMLElement>(
	targetRef: React.RefObject<T | null>,
	options?: IntersectionObserverInit,
) {
	const [isIntersecting, setIsIntersecting] = useState(false) // Ensure initial state is false
	const observerRef = useRef<IntersectionObserver | null>(null)

	useEffect(() => {
		const currentRef = targetRef.current

		if (currentRef) {
			observerRef.current = new IntersectionObserver(([entry]) => {
				setIsIntersecting(entry.isIntersecting)
			}, options)

			observerRef.current.observe(currentRef)
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect()
			}
		}
	}, [targetRef, options])

	return isIntersecting
}
