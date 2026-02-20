"use client";
import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  
  // Apple-style "Instant Start, Smooth Stop" physics
  const lenisOptions = {
    lerp: 0.1, // Increased from 0.05 to 0.1 (Much snappier response)
    duration: 1.5, // The length of the slide
    smoothWheel: true, // Enable smooth scrolling for mouse wheel
    wheelMultiplier: 1, // How far one scroll goes (1 = standard)
    touchMultiplier: 2, // How far one swipe goes (2 = responsive on mobile)
    orientation: 'vertical', 
    gestureOrientation: 'vertical',
    infinite: false,
  };

  return (
    // @ts-expect-error - React 19 types compatibility
    <ReactLenis root options={lenisOptions}>
      <div>{children}</div>
    </ReactLenis>
  );
}