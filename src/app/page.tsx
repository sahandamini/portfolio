'use client'

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
            <div
                className="fixed inset-x-0 z-50"
                style={{ top: 'calc(env(safe-area-inset-top) + 14px)' }}
            >
                <div className="flex items-center justify-between px-4">
                    <div className="pointer-events-auto">
                        <ClientThemeToggle />
                    </div>
                    <div
                        className={`transition-all duration-300 ease-out ${
                            shouldShowHeaderButtons
                                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                                : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
                        }`}
                    >
                        <FloatingButtons isAboutVisible={true} mode="header" />
                    </div>
                </div>
            </div>

			{/* Hero Section */}
			<section
				id="hero-section"
				className="bg-background flex min-h-screen flex-col items-center justify-center space-y-8 p-8"
			>
				<HeroAnimation />
                {/* Floating Buttons: in normal flow here; observe wrapper for pin trigger */}
                <div
                    ref={heroButtonsRef}
                    className={`transition-all duration-300 ease-out ${
                        shouldShowHeaderButtons
                            ? 'opacity-0 scale-95 pointer-events-none'
                            : 'opacity-100 scale-100'
                    }`}
                >
                    <FloatingButtons isAboutVisible={false} />
                </div>
			</section>

			{/* About Me Section */}
			<section
				ref={aboutSectionRef}
				id="about"
				className="bg-background relative z-20 flex min-h-screen scroll-mt-16 flex-col items-center space-y-4 px-4 md:scroll-mt-0"
			>
				<h2 className="bg-background w-full py-4 text-center text-5xl font-bold">
					About Me
				</h2>
				<div className="flex w-full flex-grow flex-col items-center justify-center space-y-12 md:flex-row md:space-y-0 md:space-x-8">
					<div className="flex flex-col space-y-8 md:w-1/2">
						<ContactCard />
					</div>
					<div className="flex justify-center md:w-1/2">
						<MyTimeline />
					</div>
				</div>
			</section>

			{/* Scroll Buttons */}
			<ScrollButtons />
		</div>
	)
}
