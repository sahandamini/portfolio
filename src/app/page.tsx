"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn, Compass, ChevronDown, FileText, Mail } from "lucide-react";
import { useRef } from "react";
import ContactCard from "@/components/ContactCard";
import MyTimeline from "@/components/Timeline";

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
        <div className="flex-grow flex items-center justify-center">
          <div className="inline-flex p-4 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 mt-auto mb-48">
          <Link href="/" passHref>
            <Button className="inline-flex items-center px-8 py-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors mx-2 cursor-pointer">
              <FileText className="mr-2 h-7 w-7" />
              <span>Resume</span>
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button className="inline-flex items-center px-8 py-4 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors mx-2 cursor-pointer">
              <Mail className="mr-2 h-7 w-7" />
              <span>Contact</span>
            </Button>
          </Link>
        </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Button
            onClick={scrollToAbout}
            className="w-16 h-16 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Scroll down to About Me section"
          >
            <ChevronDown className="h-8 w-8" />
          </Button>
        </div>
      </section>

      {/* About Me Section */}
      <section ref={aboutSectionRef} id="about" className="min-h-screen bg-gray-900 text-white p-8 flex flex-col md:flex-row items-center justify-center md:justify-center space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex flex-col space-y-8 md:w-1/2">
          <h2 className="text-5xl font-bold">About Me</h2>
          <ContactCard />
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-center">
          <MyTimeline />
        </div>
      </section>
    </div>
  );
}
