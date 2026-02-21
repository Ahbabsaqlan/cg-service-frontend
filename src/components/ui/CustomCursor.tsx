"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [isClient, setIsClient] = useState(false);
  
  // State for different cursor modes
  const [isHovering, setIsHovering] = useState(false);
  const [isMagnetizing, setIsMagnetizing] = useState(false);
  const [hoverEmoji, setHoverEmoji] = useState<string | null>(null); // NEW: Stores '🔍', '🔨', etc.
  
  // Rotation logic for Magnet
  const [buttonCenter, setButtonCenter] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const fastSpringConfig = { damping: 40, stiffness: 1000 };
  const fastCursorX = useSpring(mouseX, fastSpringConfig);
  const fastCursorY = useSpring(mouseY, fastSpringConfig);

  // Magnet Rotation Math
  const angle = useTransform(() => {
    if (!isMagnetizing) return 0;
    const deltaX = buttonCenter.x - mouseX.get();
    const deltaY = buttonCenter.y - mouseY.get();
    const radians = Math.atan2(deltaY, deltaX);
    return (radians * (180 / Math.PI)) - 135; 
  });

  useEffect(() => {
    setIsClient(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Standard hover effect for non-custom elements
      if (!hoverEmoji && !isMagnetizing) {
        if (target.tagName.toLowerCase() === "button" || target.tagName.toLowerCase() === "a") {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      }
    };

    // --- EVENT LISTENERS ---

    // 1. Magnet Logic (High Priority)
    const startMagnet = (e: CustomEvent) => {
      setIsMagnetizing(true);
      setButtonCenter(e.detail);
    };
    const updateMagnet = (e: CustomEvent) => setButtonCenter(e.detail);
    const endMagnet = () => setIsMagnetizing(false);

    // 2. Generic Emoji Logic (About, Services, Workflow)
    const setEmoji = (e: CustomEvent) => {
      setHoverEmoji(e.detail); // e.g. "🔍"
      setIsHovering(true);
    };
    const clearEmoji = () => {
      setHoverEmoji(null);
      setIsHovering(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    
    window.addEventListener("magnet-start", startMagnet as EventListener);
    window.addEventListener("magnet-move", updateMagnet as EventListener);
    window.addEventListener("magnet-end", endMagnet);

    window.addEventListener("cursor-emoji-set", setEmoji as EventListener);
    window.addEventListener("cursor-emoji-clear", clearEmoji);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("magnet-start", startMagnet as EventListener);
      window.removeEventListener("magnet-move", updateMagnet as EventListener);
      window.removeEventListener("magnet-end", endMagnet);
      window.removeEventListener("cursor-emoji-set", setEmoji as EventListener);
      window.removeEventListener("cursor-emoji-clear", clearEmoji);
    };
  }, [mouseX, mouseY, hoverEmoji, isMagnetizing]);

  if (!isClient) return null;

  // Determine what to show
  const showMagnet = isMagnetizing;
  const showEmoji = !isMagnetizing && hoverEmoji !== null;
  const showDefault = !isMagnetizing && !hoverEmoji;

  return (
    <>
      {/* 1. MAGNET CURSOR (Physics Rotation) */}
      <motion.div
        className="fixed top-0 left-0 text-4xl pointer-events-none z-[9999] flex items-center justify-center will-change-transform"
        style={{
          x: fastCursorX, y: fastCursorY, translateX: "-50%", translateY: "-50%",
          rotate: angle,
          scale: showMagnet ? 1 : 0,
          opacity: showMagnet ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">🧲</span>
      </motion.div>

      {/* 2. GENERIC EMOJI CURSOR (No rotation, just icon) */}
      <motion.div
        className="fixed top-0 left-0 text-3xl pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: fastCursorX, y: fastCursorY, translateX: "-50%", translateY: "-50%",
        }}
        animate={{
          scale: showEmoji ? 1 : 0,
          opacity: showEmoji ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* We render the specific emoji passed from the link */}
        <span className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{hoverEmoji}</span>
      </motion.div>

      {/* 3. DEFAULT DOT/RING CURSOR */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{ opacity: showDefault ? 1 : 0 }}
      >
        <motion.div
          className="fixed w-2 h-2 bg-cyan-400 rounded-full hidden md:block"
          style={{ x: fastCursorX, y: fastCursorY, translateX: -4, translateY: -4 }}
        />
        <motion.div
          className="fixed w-8 h-8 border border-cyan-500 rounded-full hidden md:flex items-center justify-center"
          style={{ x: cursorX, y: cursorY, translateX: -16, translateY: -16 }}
          animate={{
            scale: isHovering ? 2.5 : 1,
            backgroundColor: isHovering ? "rgba(6, 182, 212, 0.1)" : "rgba(0,0,0,0)",
            borderColor: isHovering ? "rgba(6, 182, 212, 0)" : "rgba(6, 182, 212, 0.5)",
          }}
        />
      </motion.div>
    </>
  );
}