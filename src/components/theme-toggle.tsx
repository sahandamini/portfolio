'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	const pillRef = useRef<HTMLDivElement | null>(null)
	const [pillSize, setPillSize] = useState<number>(36) // fallback to size-9
	const [reducedMotion, setReducedMotion] = useState(false)

	// Ensure we enable transitions only after first paint and measure pill size
	useLayoutEffect(() => {
		setMounted(true)
		if (pillRef.current) {
			setPillSize(pillRef.current.offsetWidth)
		}
	}, [])
	useEffect(() => {
		const onResize = () => {
			if (pillRef.current) setPillSize(pillRef.current.offsetWidth)
		}
		window.addEventListener('resize', onResize)
		// reduced motion preference
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
		const onRM = () => setReducedMotion(mq.matches)
		onRM()
		mq.addEventListener('change', onRM)
		return () => {
			window.removeEventListener('resize', onResize)
			mq.removeEventListener('change', onRM)
		}
	}, [])

	// Map theme to an index for stable positioning
	const activeIndex = useMemo(() => {
		switch (theme) {
			case 'system':
				return 0
			case 'dark':
				return 1
			case 'light':
				return 2
			default:
				return 0
		}
	}, [theme])

	// Visual index lags the active index slightly to avoid next-themes
	// disabling transitions on change (disableTransitionOnChange), which would
	// otherwise cancel our slide and cause a teleport. We update on the next
	// animation frame after the theme class flips.
	const [visualIndex, setVisualIndex] = useState(activeIndex)
	const raf1Ref = useRef<number | null>(null)
	const raf2Ref = useRef<number | null>(null)
	useEffect(() => {
		const id1 = requestAnimationFrame(() => {
			const id2 = requestAnimationFrame(() => setVisualIndex(activeIndex))
			raf2Ref.current = id2
		})
		raf1Ref.current = id1
		return () => {
			if (raf1Ref.current !== null) cancelAnimationFrame(raf1Ref.current)
			if (raf2Ref.current !== null) cancelAnimationFrame(raf2Ref.current)
			raf1Ref.current = null
			raf2Ref.current = null
		}
	}, [activeIndex])

	const translateX = visualIndex * pillSize // distance from first position

	return (
		<div className="relative inline-flex h-fit w-fit flex-shrink-0 items-center overflow-hidden rounded-full bg-neutral-100 p-1 dark:bg-gray-800">
			<div
				ref={pillRef}
				className="absolute top-1 left-1 h-9 w-9 transform-gpu rounded-full bg-purple-700 dark:bg-purple-700"
				style={{
					transform: `translate3d(${translateX}px, 0, 0)`,
					transition:
						mounted && !reducedMotion
							? 'transform 180ms cubic-bezier(0.22, 1, 0.36, 1)'
							: 'none',
					willChange: 'transform',
				}}
			/>
			<Button
				variant="ghost"
				size="icon"
				className="relative z-10 rounded-full hover:bg-transparent dark:hover:bg-transparent"
				onClick={() => setTheme('system')}
			>
				<Monitor
					className={cn(
						'h-[1.2rem] w-[1.2rem]',
						// Make selected icon white (independent of resolved theme)
						theme === 'system' && 'text-white',
					)}
				/>
				<span className="sr-only">System theme</span>
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className="relative z-10 rounded-full hover:bg-transparent dark:hover:bg-transparent"
				onClick={() => setTheme('dark')}
			>
				<Moon
					className={cn(
						'h-[1.2rem] w-[1.2rem]',
						theme === 'dark' && 'text-white',
					)}
				/>
				<span className="sr-only">Dark theme</span>
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className="relative z-10 rounded-full hover:bg-transparent dark:hover:bg-transparent"
				onClick={() => setTheme('light')}
			>
				<Sun
					className={cn(
						'h-[1.2rem] w-[1.2rem]',
						theme === 'light' && 'text-white',
					)}
				/>
				<span className="sr-only">Light theme</span>
			</Button>
		</div>
	)
}
