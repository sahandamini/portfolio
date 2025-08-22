"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingButtons() {
  const [buttonPosition, setButtonPosition] = useState("initial"); // "initial", "scrolling", "top-right"

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const heroSectionElement = document.getElementById("hero-section");
      const heroSectionHeight = heroSectionElement ? heroSectionElement.offsetHeight : windowHeight;

      // Thresholds for state changes
      const scrollThresholdForFixed = 100; // When to make it fixed
      const scrollThresholdForTopRight = heroSectionHeight - 150; // When to move to top-right (adjusted for better transition)

      if (scrollY > scrollThresholdForTopRight) {
        setButtonPosition("top-right");
      } else if (scrollY > scrollThresholdForFixed) {
        setButtonPosition("scrolling");
      } else {
        setButtonPosition("initial");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {buttonPosition === "initial" && (
        <div className="inline-flex p-4 rounded-full bg-secondary/50 backdrop-blur-sm border border-border mt-auto mb-48">
          <Link href="https://drive.google.com/file/d/1BT1yYVTMimJOUFHBXF3dzm9Jf02hMGSV/view?usp=sharing" passHref>
            <Button variant="default" className="inline-flex items-center px-8 py-4 rounded-full bg-white text-black hover:bg-gray-100 transition-colors mx-2 cursor-pointer">
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
      )}

      {buttonPosition === "scrolling" && (
        <div className="fixed top-[50vh] left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex p-4 rounded-full bg-secondary/50 backdrop-blur-sm border border-border z-40 transition-all duration-300 ease-out">
          <Link href="https://drive.google.com/file/d/1BT1yYVTMimJOUFHBXF3dzm9Jf02hMGSV/view?usp=sharing" passHref>
            <Button variant="default" className="inline-flex items-center px-8 py-4 rounded-full bg-white text-black hover:bg-gray-100 transition-colors mx-2 cursor-pointer">
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
      )}

      {buttonPosition === "top-right" && (
        <div className="fixed top-6 right-6 z-50 flex space-x-3 transition-all duration-300 ease-out">
          <Link href="https://drive.google.com/file/d/1BT1yYVTMimJOUFHBXF3dzm9Jf02hMGSV/view?usp=sharing" passHref>
            <Button variant="default" className="inline-flex items-center px-4 py-2 rounded-full bg-white text-black hover:bg-gray-100 transition-colors cursor-pointer">
              <FileText className="mr-2 h-5 w-5" />
              <span>Resume</span>
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button className="inline-flex items-center px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors cursor-pointer">
              <Mail className="mr-2 h-5 w-5" />
              <span>Contact</span>
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
