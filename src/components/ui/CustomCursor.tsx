"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isClient, setIsClient] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse position values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 1. Smooth spring physics for the "Antigravity" trailing ring
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // 2. Faster spring for the tiny center dot (MOVED UP HERE!)
  const fastSpringConfig = { damping: 40, stiffness: 1000 };
  const fastCursorX = useSpring(mouseX, fastSpringConfig);
  const fastCursorY = useSpring(mouseY, fastSpringConfig);

  useEffect(() => {
    setIsClient(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center the 32px cursor
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Expand cursor if hovering over an interactive element
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // Early return MUST happen after all hooks are declared!
  if (!isClient) return null;

  return (
    <>
      {/* The tiny exact dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-screen"
        style={{
          x: fastCursorX, // Uses the pre-declared hook
          y: fastCursorY, // Uses the pre-declared hook
          translateX: 12, // Offset to center inside the larger ring
          translateY: 12,
        }}
      />

      {/* The Antigravity trailing ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-500 rounded-full pointer-events-none z-[9998] hidden md:flex items-center justify-center backdrop-blur-[2px]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "rgba(6, 182, 212, 0.1)" : "rgba(0,0,0,0)",
          borderColor: isHovering ? "rgba(6, 182, 212, 0)" : "rgba(6, 182, 212, 0.5)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}