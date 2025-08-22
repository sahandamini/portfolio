"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn, Compass, ChevronDown, FileText, Mail } from "lucide-react";
import { useRef } from "react";
import ContactCard from "@/components/ContactCard";
import MyTimeline from "@/components/Timeline";
import ClientThemeToggle from "@/components/client-theme-toggle";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToHome = () => {
    if (heroSectionRef.current) {
      heroSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col">
<div className="fixed top-4 left-4 z-50">
        <ClientThemeToggle />
      </div>
      {/* Hero Section */}
      <section id="hero-section" ref={heroSectionRef} className="min-h-screen flex flex-col relative p-8">
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold text-center mt-16">
            Sahand Amini
          </h1>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <FloatingButtons />
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Button
            onClick={scrollToAbout}
            variant="secondary"
            className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
            aria-label="Scroll down to About Me section"
          >
            <ChevronDown className="h-8 w-8" />
          </Button>
        </div>
      </section>

      {/* About Me Section */}
      <section ref={aboutSectionRef} id="about" className="min-h-screen p-8 flex flex-col items-center justify-center space-y-8 relative">
        <h2 className="text-5xl font-bold text-center">About Me</h2>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-center space-y-8 md:space-y-0 md:space-x-8 w-full">
          <div className="flex flex-col space-y-8 md:w-1/2">
            <ContactCard />
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-center">
            <MyTimeline />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Button
            onClick={scrollToHome}
            variant="secondary"
            className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
            aria-label="Scroll up to Hero section"
          >
            <ChevronDown className="h-8 w-8 rotate-180" />
          </Button>
        </div>
      </section>
    </div>
  );
}
