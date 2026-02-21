"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  
  useEffect(() => {
    // Initialize pure Lenis with your exact Apple-style physics
    const lenis = new Lenis({
      lerp: 0.1, // Increased from 0.05 to 0.1 (Much snappier response)
      duration: 1.5, // The length of the slide
      smoothWheel: true, // Enable smooth scrolling for mouse wheel
      wheelMultiplier: 1, // How far one scroll goes (1 = standard)
      touchMultiplier: 2, // How far one swipe goes (2 = responsive on mobile)
      orientation: 'vertical', 
      gestureOrientation: 'vertical',
      infinite: false,
    });

    // The animation loop that powers the smooth scroll
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup when component unmounts
    return () => {
      lenis.destroy();
    };
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div>{children}</div>
  );
}