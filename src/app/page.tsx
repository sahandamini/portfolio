'use client'

import ClientThemeToggle from '@/components/client-theme-toggle'
import ContactCard from '@/components/ContactCard'
import FloatingButtons from '@/components/FloatingButtons'
import MyTimeline from '@/components/Timeline'
import { useScrollObserver } from '@/lib/hooks/use-scroll-observer';
import { useRef } from 'react';
import ScrollButtons from '@/components/ScrollButtons';

export default function Home() {
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const isAboutSectionVisible = useScrollObserver<HTMLDivElement>(
    aboutSectionRef,
    {
      threshold: 0.2, // Corner buttons appear when 20% of about section is visible
    },
  );

  return (
    <div className="relative">
      <div className="fixed top-4 left-4 z-50">
        <ClientThemeToggle />
      </div>

      {/* Floating Buttons (always fixed, conditionally visible) */}
      <FloatingButtons isAboutVisible={isAboutSectionVisible} />

      {/* Hero Section */}
      <section
        id="hero-section"
        className="bg-background flex min-h-screen flex-col items-center justify-center space-y-8 p-8"
      >
        <h1 className="text-center text-6xl font-bold md:text-8xl">
          Sahand Amini
        </h1>
      </section>

      {/* About Me Section */}
      <section
        ref={aboutSectionRef}
        id="about"
        className="bg-background relative z-20 flex min-h-screen flex-col items-center space-y-4 px-4"
      >
        <h2 className="sticky top-0 z-10 w-full bg-background py-4 text-center text-5xl font-bold">
          About Me
        </h2>
        <div className="flex w-full flex-grow flex-col items-center justify-center space-y-8 md:flex-row md:space-y-0 md:space-x-8">
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
  );
}
