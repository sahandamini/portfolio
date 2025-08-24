'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useScrollPosition } from '@/lib/hooks/use-scroll-position';

export default function ScrollButtons() {
  const { isAtTop, isAtBottom, hasScrolled } = useScrollPosition();
  console.log('ScrollButtons state:', { isAtTop, isAtBottom, hasScrolled });

  const scrollToHero = () => {
    console.log('Scroll Up button clicked');
    const heroSection = document.getElementById('hero-section');
    console.log('Hero Section element:', heroSection);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    console.log('Scroll Down button clicked');
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Down Button (visible only at top, not scrolled) */}
      {isAtTop && !hasScrolled && (
        <div
          className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform transition-opacity duration-300 opacity-100`}
        >
          <Button
            variant="secondary"
            size="icon"
            className="h-16 w-16 rounded-full shadow-lg cursor-pointer hover:bg-secondary/80"
            onClick={scrollToAbout}
          >
            <ArrowDown className="h-8 w-8" />
          </Button>
        </div>
      )}

      {/* Scroll Up Button (visible only at bottom, after scrolling) */}
      {isAtBottom && hasScrolled && (
        <div
          className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform transition-opacity duration-300 opacity-100`}
        >
          <Button
            variant="secondary"
            size="icon"
            className="h-16 w-16 rounded-full shadow-lg cursor-pointer hover:bg-secondary/80"
            onClick={scrollToHero}
          >
            <ArrowUp className="h-8 w-8" />
          </Button>
        </div>
      )}
    </>
  );
}
