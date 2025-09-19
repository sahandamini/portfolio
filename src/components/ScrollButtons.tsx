'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useScrollPosition } from '@/lib/hooks/use-scroll-position'
import { ArrowDown, ArrowUp } from 'lucide-react'

export default function ScrollButtons() {
	const { isAtTop, hasScrolled, isAtBottom } = useScrollPosition()

	const scrollToHero = () => {
		console.log('Scroll Up button clicked')
		const heroSection = document.getElementById('hero-section')
		console.log('Hero Section element:', heroSection)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const scrollToAbout = () => {
		console.log('Scroll Down button clicked')
		document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<>
			{/* Scroll Down Button (visible only at top, not scrolled) */}
			<AnimatePresence>
				{isAtTop && !hasScrolled && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.8 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.8 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform"
					>
						<motion.div
							animate={{ y: [0, -8, 0] }}
							transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
						>
							<Button
								variant="secondary"
								size="icon"
								className="glass-effect h-16 w-16 cursor-pointer rounded-full shadow-2xl hover:shadow-purple-500/25 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
								onClick={scrollToAbout}
							>
								<ArrowDown className="h-8 w-8 text-purple-400" />
							</Button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Scroll Up Button (visible only at bottom, fixed position) */}
			<AnimatePresence>
				{isAtBottom && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.8 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.8 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform"
					>
						<motion.div
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<Button
								variant="secondary"
								size="icon"
								className="glass-effect h-16 w-16 cursor-pointer rounded-full shadow-2xl hover:shadow-blue-500/25 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
								onClick={scrollToHero}
								disabled={isAtTop}
								aria-label="Scroll to top"
							>
								<ArrowUp className="h-8 w-8 text-blue-400" />
							</Button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}