'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollObserver<T extends HTMLElement>(
	targetRef: React.RefObject<T | null>,
	options?: IntersectionObserverInit,
	initialIntersecting: boolean = true,
) {
	// Default to true so header actions don't flash visible on first paint
	const [isIntersecting, setIsIntersecting] = useState(initialIntersecting)
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
