'use client'

import { motion } from 'framer-motion'
import ClientThemeToggle from '@/components/client-theme-toggle'
import ContactCard from '@/components/ContactCard'
import FloatingButtons from '@/components/FloatingButtons'
import HeroAnimation from '@/components/HeroAnimation'
import ScrollButtons from '@/components/ScrollButtons'
import MyTimeline from '@/components/Timeline'
import { useScrollObserver } from '@/lib/hooks/use-scroll-observer'
import { useRef } from 'react'

export default function Home() {
	const aboutSectionRef = useRef<HTMLDivElement>(null)
	const heroButtonsRef = useRef<HTMLDivElement>(null)

	// Observe the in-flow buttons. When they are about to leave the top
	// (shrunken root via negative top margin), promote header buttons.
	const areHeroButtonsWithinTopArea = useScrollObserver<HTMLDivElement>(
		heroButtonsRef,
		{
			rootMargin: '-72px 0px 0px 0px',
			threshold: 0,
		},
	)
	const shouldShowHeaderButtons = !areHeroButtonsWithinTopArea

	return (
		<div className="relative">
			{/* Top bar aligns theme + header actions by center */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="fixed inset-x-0 z-50"
				style={{ top: 'calc(env(safe-area-inset-top) + 14px)' }}
			>
				<div className="flex items-center justify-between px-6">
					<div className="pointer-events-auto">
						<ClientThemeToggle />
					</div>
					<div
						className={`transition-all duration-500 ease-out ${
							shouldShowHeaderButtons
								? 'pointer-events-auto translate-y-0 scale-100 opacity-100 blur-0'
								: 'pointer-events-none -translate-y-4 scale-90 opacity-0 blur-sm'
						}`}
					>
						<FloatingButtons isAboutVisible={true} mode="header" />
					</div>
				</div>
			</motion.div>

			{/* Hero Section */}
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, ease: "easeOut" }}
				id="hero-section"
				className="relative flex min-h-screen flex-col items-center justify-center space-y-12 p-8 overflow-hidden"
			>
				{/* Animated background elements */}
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
					<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
				</div>
				
				<HeroAnimation />
				{/* Floating Buttons: in normal flow here; observe wrapper for pin trigger */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
					ref={heroButtonsRef}
					className={`transition-all duration-500 ease-out ${
						shouldShowHeaderButtons
							? 'pointer-events-none scale-90 opacity-0 blur-sm'
							: 'scale-100 opacity-100'
					}`}
				>
					<FloatingButtons isAboutVisible={false} />
				</motion.div>
			</motion.section>

			{/* About Me Section */}
			<motion.section
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				viewport={{ once: true, margin: "-100px" }}
				ref={aboutSectionRef}
				id="about"
				className="relative z-20 flex min-h-screen scroll-mt-16 flex-col items-center space-y-8 px-6 pb-24 md:scroll-mt-0"
			>
				<motion.h2 
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					viewport={{ once: true }}
					className="w-full py-8 text-center text-6xl font-bold gradient-text"
				>
					About Me
				</motion.h2>
				<div className="flex w-full max-w-7xl flex-grow flex-col items-center justify-center space-y-16 md:flex-row md:space-y-0 md:space-x-12">
					<motion.div 
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
						viewport={{ once: true }}
						className="flex flex-col space-y-8 md:w-1/2"
					>
						<ContactCard />
					</motion.div>
					<motion.div 
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
						className="flex justify-center md:w-1/2"
					>
						<MyTimeline />
					</motion.div>
				</div>
			</motion.section>

			{/* Scroll Buttons */}
			<ScrollButtons />
		</div>
	)
}
