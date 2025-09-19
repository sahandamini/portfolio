'use client'

import { motion } from 'framer-motion'
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
	const timeoutRef = useRef<number | null>(null)
	useEffect(() => {
		const id1 = requestAnimationFrame(() => {
			const id2 = requestAnimationFrame(() => {
				// Small post-style-recalc delay helps mobile Safari smoothness
				timeoutRef.current = window.setTimeout(
					() => setVisualIndex(activeIndex),
					16,
				)
			})
			raf2Ref.current = id2
		})
		raf1Ref.current = id1
		return () => {
			if (raf1Ref.current !== null) cancelAnimationFrame(raf1Ref.current)
			if (raf2Ref.current !== null) cancelAnimationFrame(raf2Ref.current)
			if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
			raf1Ref.current = null
			raf2Ref.current = null
			timeoutRef.current = null
		}
	}, [activeIndex])

	const translateX = visualIndex * pillSize // distance from first position

	return (
		<motion.div 
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="glass-effect relative inline-flex h-fit w-fit flex-shrink-0 items-center overflow-hidden rounded-2xl border p-2 shadow-lg"
		>
			<motion.div
				ref={pillRef}
				className="absolute top-2 left-2 h-10 w-10 transform-gpu rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg"
				style={{
					transform: `translate3d(${translateX}px, 0, 0)`,
					transition:
						mounted && !reducedMotion
							? 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)'
							: 'none',
					willChange: 'transform',
					backfaceVisibility: 'hidden',
					contain: 'layout paint',
				}}
			/>
			<Button
				variant="ghost"
				size="icon"
				className="relative z-10 h-10 w-10 rounded-xl hover:bg-transparent dark:hover:bg-transparent transition-all duration-200"
				onClick={() => setTheme('system')}
			>
				<motion.div
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<Monitor
						className={cn(
							'h-5 w-5 transition-colors duration-200',
							// Make selected icon white (independent of resolved theme)
							theme === 'system' ? 'text-white' : 'text-muted-foreground hover:text-foreground',
						)}
					/>
				</motion.div>
				<span className="sr-only">System theme</span>
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className="relative z-10 h-10 w-10 rounded-xl hover:bg-transparent dark:hover:bg-transparent transition-all duration-200"
				onClick={() => setTheme('dark')}
			>
				<motion.div
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<Moon
						className={cn(
							'h-5 w-5 transition-colors duration-200',
							theme === 'dark' ? 'text-white' : 'text-muted-foreground hover:text-foreground',
						)}
					/>
				</motion.div>
				<span className="sr-only">Dark theme</span>
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className="relative z-10 h-10 w-10 rounded-xl hover:bg-transparent dark:hover:bg-transparent transition-all duration-200"
				onClick={() => setTheme('light')}
			>
				<motion.div
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<Sun
						className={cn(
							'h-5 w-5 transition-colors duration-200',
							theme === 'light' ? 'text-white' : 'text-muted-foreground hover:text-foreground',
						)}
					/>
				</motion.div>
				<span className="sr-only">Light theme</span>
			</Button>
		</motion.div>
	)
}
