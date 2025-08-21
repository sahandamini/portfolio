"use client";

import { Button } from "@/components/ui/button";
import { UserPlus, LogIn, Compass, ChevronDown } from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black text-white flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col relative p-8">
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold text-center">
            Sahand Amini
          </h1>
        </div>
        <div className="flex justify-center space-x-4 mb-32">
          <Button className="inline-flex items-center px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
            <UserPlus className="mr-2 h-5 w-5" />
            <span>Sign Up</span>
          </Button>
          <Button className="inline-flex items-center px-6 py-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors">
            <LogIn className="mr-2 h-5 w-5" />
            <span>Log In</span>
          </Button>
          <Button className="inline-flex items-center px-6 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors">
            <Compass className="mr-2 h-5 w-5" />
            <span>Explore</span>
          </Button>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Button
            onClick={scrollToAbout}
            className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            aria-label="Scroll down to About Me section"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* About Me Section */}
      <section ref={aboutSectionRef} id="about" className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <h2 className="text-5xl font-bold">About Me</h2>
      </section>
    </div>
  );
}
